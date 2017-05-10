package com.tydic.web.sys.service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.tydic.base.constant.CommonConstant;
import com.tydic.base.constant.LimitType;
import com.tydic.base.exception.BusinessException;
import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.Maps;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResultUtil;
import com.tydic.base.util.UuidUtil;
import com.tydic.web.sso.service.SsoService;
import com.tydic.web.util.SsoCacheUtil;

/**
 * 
 * @author wujian
 *
 */
@Service("ssoService")
public class SsoServiceImpl extends ServiceBase implements SsoService {

	@Override
	public IMapEntry<String, Object> login(HttpServletRequest request, IMapEntry<String, Object> paramMap) {
		IMapEntry<String, Object> data = this.selectOne("sys.sso.selectUserLogin", paramMap);

		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("账号不存在，请核实!");
		}
		if (!"1".equals(data.getString("passwd_flag"))) {
			throw new BusinessException("密码错误，请核实!");
		}
		if ("10D".equals(data.getString("state"))) {
			throw new BusinessException("此账号已被冻结!");
		}

		String user_id = data.getString("user_id");
		paramMap.put("user_id", user_id);
		String ticket = UuidUtil.getUUID();
		paramMap.put(CommonConstant.TICKET, ticket);

		// 0、记录登录日志
		this.insert("sys.sso.insertUserTicket", paramMap);
		// 1、强制更新缓存信息
		this.refresh(ticket);

		// 登录成功，反馈结果+ticket
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> busi_data = Maps.newMapEntry();
		busi_data.put(CommonConstant.TICKET, ticket);
		busi_data.put("ticket_detail", SsoCacheUtil.getTicket(ticket));

		return ResultUtil.resultSuccess(busi_data, "登录认证成功！");
	}

	@Override
	public IMapEntry<String, Object> loginout(IMapEntry<String, Object> paramMap) {
		SsoCacheUtil.delTicket(paramMap.getString(CommonConstant.TICKET));
		// 暂时不做数据库中ticket超期处理，后续可以改进为更新数据库中票据失效日期

		return ResultUtil.resultSuccess("退出登录成功！");
	}

	@Override
	public IMapEntry<String, Object> validTicket(IMapEntry<String, Object> paramMap) {
		paramMap.put("valid_ticket", "true");

		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> data_ticket = this.selectUserTicketDetail(paramMap)
				.getMapEntry(CommonConstant.RESULT_BUSI_DATA);
		if (ObjectUtil.isEmpty(data_ticket)) {
			throw new BusinessException("票据无效，请核实！");
		}

		String ticket = paramMap.getString(CommonConstant.TICKET);
		if (ObjectUtil.isEmpty(SsoCacheUtil.getTicket(ticket))) {
			this.refresh(paramMap.getString(CommonConstant.TICKET));
		}

		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> result = Maps.newMapEntry();

		String ret_flag = paramMap.getString(CommonConstant.RET_FLAG);
		if (ObjectUtil.isNotEmpty(ret_flag)) {
			String user_id = data_ticket.getString("user_id");

			String[] ret_flag_arr = ret_flag.split(",");
			for (String item : ret_flag_arr) {
				if (CommonConstant.RET_FLAG_TICKET_INFO.equalsIgnoreCase(item)) {
					result.put("ticket_detail", data_ticket);
				}
				if (CommonConstant.RET_FLAG_USER_INFO.equalsIgnoreCase(item)) {
					result.put("user_detail", SsoCacheUtil.getUserInfo(user_id));
				}
				if (CommonConstant.RET_FLAG_USER_ROLE.equalsIgnoreCase(item)) {
					result.put("user_role_list", SsoCacheUtil.getUserRoleList(user_id));
				}
				if (CommonConstant.RET_FLAG_USER_JOB.equalsIgnoreCase(item)) {
					result.put("user_job_list", SsoCacheUtil.getUserJobList(user_id));
				}
				if (CommonConstant.RET_FLAG_USER_LIMIT.equalsIgnoreCase(item)) {
					List<IMapEntry<String, Object>> data_list = new ArrayList<IMapEntry<String, Object>>();
					List<IMapEntry<String, Object>> data_user_limit_list = SsoCacheUtil.getUserLimitList(user_id);

					String limit_type = paramMap.getString(LimitType.LIMIT_TYPE);
					if (ObjectUtil.isNotEmpty(limit_type)) {
						List<String> limit_type_list = Arrays.asList(limit_type.split(","));
						for (IMapEntry<String, Object> item_limit : data_user_limit_list) {
							if (limit_type_list.contains(item_limit.getString(LimitType.LIMIT_TYPE))) {
								data_list.add(item_limit);
							}
						}
					} else {
						data_list = data_user_limit_list;
					}

					result.put("user_limit_list", data_list);
				}
			}
		}

		return ResultUtil.resultSuccess(result, "校验通过，有效票据！");
	}

	@Override
	public IMapEntry<String, Object> updatePassword(IMapEntry<String, Object> paramMap) {
		IMapEntry<String, Object> data = this.selectOne("sys.sso.selectUpdatePasswordValid", paramMap);
		int cnt = data.getInteger("cnt");
		if (cnt == 0) {
			throw new BusinessException("当前登录密码校验失败，请核实！");
		}

		this.update("sys.sso.updatePassword", paramMap);

		return ResultUtil.resultSuccess("修改登录密码成功！");
	}

	@SuppressWarnings("unchecked")
	private void refresh(String ticket) {
		IMapEntry<String, Object> paramMap = Maps.newMapEntry();

		// 更新ticket缓存
		paramMap.put(CommonConstant.TICKET, ticket);
		IMapEntry<String, Object> data_ticket = this.selectUserTicketDetail(paramMap)
				.getMapEntry(CommonConstant.RESULT_BUSI_DATA);
		SsoCacheUtil.setTicket(ticket, data_ticket);

		// 更新用户基本信息缓存
		String user_id = data_ticket.getString("user_id");
		paramMap.clear();
		paramMap.put("user_id", user_id);
		IMapEntry<String, Object> data_user = this.selectUser(paramMap);
		SsoCacheUtil.setUserInfo(user_id, data_user.getMapEntry(CommonConstant.RESULT_BUSI_DATA));

		// 更新用户角色信息缓存
		paramMap.clear();
		paramMap.put("user_id", user_id);
		IMapEntry<String, Object> data_user_role = this.selectUserRoleList(paramMap);
		SsoCacheUtil.setUserRoleList(user_id, data_user_role.getMapEntry(CommonConstant.RESULT_BUSI_DATA)
				.getList(CommonConstant.RESULT_BUSI_DATA_LIST));

		// 更新用户任职信息缓存
		paramMap.clear();
		paramMap.put("user_id", user_id);
		IMapEntry<String, Object> data_user_job = this.selectUserJobList(paramMap);
		SsoCacheUtil.setUserJobList(user_id, data_user_job.getMapEntry(CommonConstant.RESULT_BUSI_DATA)
				.getList(CommonConstant.RESULT_BUSI_DATA_LIST));

		// 更新用户权限信息缓存
		paramMap.clear();
		paramMap.put("user_id", user_id);
		IMapEntry<String, Object> data_user_limit = this.selectUserLimitList(paramMap);
		SsoCacheUtil.setUserLimitList(user_id, data_user_limit.getMapEntry(CommonConstant.RESULT_BUSI_DATA)
				.getList(CommonConstant.RESULT_BUSI_DATA_LIST));
	}

	@Override
	public IMapEntry<String, Object> selectUserTicketDetail(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectOne("sys.sso.selectUserTicketDetail", paramMap));
	}

	public IMapEntry<String, Object> selectUser(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectOne("sys.sso.selectUserBasicInfo", paramMap));
	}

	public IMapEntry<String, Object> selectUserRoleList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.sso.selectUserRoleList", paramMap));
	}

	public IMapEntry<String, Object> selectUserJobList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.sso.selectUserJobList", paramMap));
	}

	public IMapEntry<String, Object> selectUserLimitList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.sso.selectUserLimitList", paramMap));
	}

	@Override
	public IMapEntry<String, Object> insertMenuFunctioncLog(IMapEntry<String, Object> paramMap) {
		this.insert("sys.sso.insertMenuFunctioncLog", paramMap);

		return ResultUtil.resultSuccess();
	}

	@Override
	public IMapEntry<String, Object> getTicket4A(HttpServletRequest request, IMapEntry<String, Object> paramMap) {
		IMapEntry<String, Object> data = this.selectOne("sys.sso.selectUserFor4A", paramMap);

		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("账号无效，请核实!");
		}

		String user_id = data.getString("user_id");
		paramMap.put("user_id", user_id);
		String ticket = UuidUtil.getUUID();
		paramMap.put(CommonConstant.TICKET, ticket);

		// 0、记录登录日志
		this.insert("sys.sso.insertUserTicket", paramMap);
		// 1、强制更新缓存信息
		this.refresh(ticket);
		// 2、添加4a日志

		this.insert("sys.sso.insertLog4A", paramMap);

		// 登录成功，反馈结果+ticket
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> busi_data = Maps.newMapEntry();
		busi_data.put(CommonConstant.TICKET, ticket);
		busi_data.put("ticket_detail", SsoCacheUtil.getTicket(ticket));

		return ResultUtil.resultSuccess(busi_data, "4A票据ticket生成成功！");
	}
}
