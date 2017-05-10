package com.tydic.web.sys.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.tydic.base.exception.BusinessException;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.ResponseUtil;
import com.tydic.base.util.ResultUtil;

/**
 * 
 * @author wujian
 *
 */
public class SysBusiExceptionHandlerInterceptor implements HandlerInterceptor {
	private Logger logger = Logger.getLogger(this.getClass());

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object arg2,
			Exception exception) throws Exception {
		this.logger.debug("SysBusiExceptionHandlerInterceptor.afterCompletion......");

		if (exception != null) {
			this.logger.info("exception.message:" + exception.getMessage());

			IMapEntry<String, Object> result;
			if (exception instanceof BusinessException) {
				BusinessException busi_exp = (BusinessException) exception;
				result = ResultUtil.resultFailure(busi_exp.getExceptionCode(), busi_exp.getExceptionMsg());
			} else {
				// 屏蔽真实异常信息，避免安全泄露
				result = ResultUtil.resultFailure("服务未知异常，请联系系统维护人员!");
			}

			this.logger.info("exception.result:" + result);

			ResponseUtil.JsonWriter(response, result);
		}
	}

	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		this.logger.debug("SysBusiExceptionHandlerInterceptor.postHandle......");
	}

	public boolean preHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2) throws Exception {
		this.logger.debug("SysBusiExceptionHandlerInterceptor.preHandle......");

		return true;
	}

}
