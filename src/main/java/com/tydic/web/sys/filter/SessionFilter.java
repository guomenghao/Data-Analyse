package com.tydic.web.sys.filter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.codec.binary.Base64;
import org.apache.log4j.Logger;

import com.tydic.base.constant.AppConfigConstant;
import com.tydic.base.constant.CommonConstant;
import com.tydic.base.exception.BusinessException;
import com.tydic.base.util.CookieUtils;
import com.tydic.base.util.Des3Utils;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.JSONUtil;
import com.tydic.base.util.Maps;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResponseUtil;
import com.tydic.base.util.ResultUtil;
import com.tydic.base.util.SpringBeanUtil;
import com.tydic.web.sso.service.SsoService;

/**
 * 
 * @author wujian
 *
 */
public class SessionFilter implements Filter {
	private static final String EXCEPT_ACTION = "except.action";

	private Logger logger = Logger.getLogger(this.getClass());

	private SsoService ssoService;

	public void destroy() {
		this.logger.debug("destroy...");
	}

	public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain)
			throws IOException, ServletException {
		this.logger.debug("doFilter...start...");
		HttpServletRequest request = (HttpServletRequest) servletRequest;
		HttpServletResponse response = (HttpServletResponse) servletResponse;
		String servletPath = request.getServletPath();
		this.logger.info("servletPath:" + servletPath);

		String except_actions = AppConfigConstant.getValue(EXCEPT_ACTION);
		List<String> except_action_list = Arrays.asList(except_actions.split(","));
		boolean except_flag = false;
		for (String item : except_action_list) {
			if (servletPath.indexOf(item) != -1) {
				// 可以跳过ticket校验
				except_flag = true;
				break;
			}
		}
		if (!except_flag && !this.validTicket(request, response)) {
			response.sendRedirect(request.getContextPath() + "/login.jsp");
			return;
		}

		filterChain.doFilter(request, response);
	}

	private boolean validTicket(HttpServletRequest request, HttpServletResponse response) {
		boolean result = false;

		String ticket_str = this.getRequestTicket(request);
		if (ObjectUtil.isNotEmpty(ticket_str)) {
			if (ObjectUtil.isEmpty(this.ssoService)) {
				this.ssoService = (SsoService) SpringBeanUtil.getInstance().getBean("ssoService");
			}
			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> qry_map = Maps.newMapEntry();
			qry_map.put(CommonConstant.TICKET, ticket_str);

			try {
				IMapEntry<String, Object> result_data = this.ssoService.validTicket(qry_map);
				if (CommonConstant.RESULT_CODE_SUCCESS
						.equalsIgnoreCase(result_data.getString(CommonConstant.RESULT_CODE))) {
					result = true;
					// 给session 和cookie 分别添加一下
					request.getSession().setAttribute(CommonConstant.TICKET, ticket_str);
					// CookieUtils.setCookie(request, response,
					// CommonConstant.TICKET, ticket_str);
					CookieUtils.setCookie(request, response, CommonConstant.TICKET, ticket_str, 60 * 60 * 24);
				}
			} catch (BusinessException e) {
				e.printStackTrace();
				try {
					ResponseUtil.JsonWriter(response,
							ResultUtil.resultFailure(e.getExceptionCode(), e.getExceptionMsg()));
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}

		return result;
	}

	@SuppressWarnings("unchecked")
	private String getRequestTicket(HttpServletRequest request) {
		String ticket = request.getParameter(CommonConstant.TICKET);
		this.logger.info("ticket from request:" + ticket);
		if (ObjectUtil.isEmpty(ticket)) {
			String sign = request.getParameter(CommonConstant.SIGN);

			// 如果存在sign，则需要解密参数，才能获取到ticket
			if (ObjectUtil.isNotEmpty(sign)) {
				try {

					String encrypt_method = AppConfigConstant.getValue(CommonConstant.ENCRYPT_METHOD);
					String encrypt_key = AppConfigConstant.getValue(CommonConstant.ENCRYPT_KEY);

					if (CommonConstant.ENCRYPT_KEY_BASE64.equalsIgnoreCase(encrypt_method)) {
						sign = new String(Base64.decodeBase64(sign), "UTF-8");
					} else if (CommonConstant.ENCRYPT_KEY_3DES.equalsIgnoreCase(encrypt_method)) {
						sign = Des3Utils.decryptThreeDESECB(sign, encrypt_key);
					} else {
						// 默认按ENCRYPT_KEY_BASE64 解密
						sign = new String(Base64.decodeBase64(sign), "UTF-8");
					}

					ticket = JSONUtil.parseObject(sign).getString(CommonConstant.TICKET);
				} catch (Exception e) {
					e.printStackTrace();
				}
				this.logger.info("ticket from sign:" + ticket);
			}
			// 还取不到ticket，再考虑从session 里获取一下看看，比如PC端的session里有
			if (ObjectUtil.isEmpty(ticket)) {
				Object obj = request.getSession().getAttribute(CommonConstant.TICKET);
				if (ObjectUtil.isNotEmpty(obj)) {
					ticket = String.valueOf(obj);
				}
				this.logger.info("ticket from session:" + ticket);
			}
			// 还取不到ticket，再考虑从cookie 里获取一下看看，比如PC端的cookie里有
			if (ObjectUtil.isEmpty(ticket)) {
				ticket = CookieUtils.getCookieValue(request, CommonConstant.TICKET);
				this.logger.info("ticket from cookie:" + ticket);
			}
		}
		return ticket;
	}

	public void init(FilterConfig filterConfig) throws ServletException {
		this.logger.debug("init...");
	}
}
