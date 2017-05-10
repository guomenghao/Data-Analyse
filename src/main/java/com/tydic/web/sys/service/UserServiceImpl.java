package com.tydic.web.sys.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import com.tydic.base.exception.BusinessException;
import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.MD5Util;
import com.tydic.base.util.Maps;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResultUtil;

@Service("userService")
public class UserServiceImpl extends ServiceBase implements UserService {
	public IMapEntry<String, Object> selectUserRoleList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.user.selectUserRoleList", paramMap));
	}

	public IMapEntry<String, Object> selectUserJobList(IMapEntry<String, Object> paramMap) {
		List<IMapEntry<String, Object>> data_list = this.selectList("sys.user.selectUserJobList", paramMap);

		// 加工bss_org_path_link，基于bss_org_path(-1-11-1101-110102-)
		for (IMapEntry<String, Object> item : data_list) {
			String bss_org_path = item.getString("bss_org_path");
			bss_org_path = bss_org_path.substring(1, bss_org_path.length() - 1);
			List<String> bss_org_id_list = Arrays.asList(bss_org_path.split("-"));

			@SuppressWarnings("unchecked")
			IMapEntry<String, Object> param = Maps.newMapEntry();
			param.put("bss_org_id_list", bss_org_id_list);
			List<IMapEntry<String, Object>> data_list_bss_org = this.selectList("sys.bssorg.selectBssOrgList", param);

			StringBuffer bss_org_path_link = new StringBuffer();
			for (String bss_org_id : bss_org_id_list) {
				for (IMapEntry<String, Object> bss_org : data_list_bss_org) {
					if (bss_org_id.equalsIgnoreCase(bss_org.getString("bss_org_id"))) {
						bss_org_path_link.append("/" + bss_org.getString("bss_org_name"));
						break;
					}
				}
			}
			item.put("bss_org_path_link", bss_org_path_link.toString());
		}

		return ResultUtil.resultSuccess(data_list);
	}

	public IMapEntry<String, Object> selectUserList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.qryPage("sys.user.selectUserList", paramMap));
	}

	public IMapEntry<String, Object> selectUserDetail(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectOne("sys.user.selectUserList", paramMap));
	}

	public IMapEntry<String, Object> insertUser(IMapEntry<String, Object> paramMap) {
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();

		// 登录账号不能重复
		param.clear();
		param.put("login_acct", paramMap.get("login_acct"));
		if (ObjectUtil.isNotEmpty(this.selectOne("sys.user.selectUserList", param))) {
			throw new BusinessException("登录账号已经存在，请核实!");
		}

		// 手机号码不能重复
		param.clear();
		param.put("acc_nbr", paramMap.get("acc_nbr"));
		if (ObjectUtil.isNotEmpty(this.selectOne("sys.user.selectUserList", param))) {
			throw new BusinessException("手机号码已经存在，请核实!");
		}

		if (ObjectUtil.isNotEmpty(paramMap.get("user_email"))) {
			// 电子邮件不能重复
			param.clear();
			param.put("user_email", paramMap.get("user_email"));
			if (ObjectUtil.isNotEmpty(this.selectOne("sys.user.selectUserList", param))) {
				throw new BusinessException("电子邮件已经存在，请核实!");
			}
		}

		paramMap.put("role_id_list", Arrays.asList(paramMap.getString("role_ids").split(",")));
		paramMap.put("login_passwd", MD5Util.encode(paramMap.getString("acc_nbr").substring(5)));
		this.insert("sys.user.insertUser", paramMap);

		return ResultUtil.resultSuccess("新增用户信息成功，默认密码为手机号码后6位！");
	}

	public IMapEntry<String, Object> updateUser(IMapEntry<String, Object> paramMap) {
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();

		param.put("user_id", paramMap.get("user_id"));
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", param))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}

		String user_id = paramMap.getString("user_id");

		if (ObjectUtil.isNotEmpty(paramMap.get("login_acct"))) {
			// 登录账号不能重复
			param.clear();
			param.put("login_acct", paramMap.get("login_acct"));
			IMapEntry<String, Object> data = this.selectOne("sys.user.selectUserList", param);
			if (ObjectUtil.isNotEmpty(data) && !user_id.equalsIgnoreCase(data.getString("user_id"))) {
				throw new BusinessException("登录账号已经存在，请核实!");
			}
		}

		if (ObjectUtil.isNotEmpty(paramMap.get("acc_nbr"))) {
			// 手机号码不能重复
			param.clear();
			param.put("acc_nbr", paramMap.get("acc_nbr"));
			IMapEntry<String, Object> data = this.selectOne("sys.user.selectUserList", param);
			if (ObjectUtil.isNotEmpty(data) && !user_id.equalsIgnoreCase(data.getString("user_id"))) {
				throw new BusinessException("手机号码已经存在，请核实!");
			}
		}

		if (ObjectUtil.isNotEmpty(paramMap.get("user_email"))) {
			// 电子邮件不能重复
			param.clear();
			param.put("user_email", paramMap.get("user_email"));
			IMapEntry<String, Object> data = this.selectOne("sys.user.selectUserList", param);
			if (ObjectUtil.isNotEmpty(data) && !user_id.equalsIgnoreCase(data.getString("user_id"))) {
				throw new BusinessException("电子邮件已经存在，请核实!");
			}
		}

		if (ObjectUtil.isNotEmpty(paramMap.getString("role_ids"))) {
			paramMap.put("role_id_list", Arrays.asList(paramMap.getString("role_ids").split(",")));
		}

		this.update("sys.user.updateUser", paramMap);

		return ResultUtil.resultSuccess("更新用户信息成功！");
	}

	public IMapEntry<String, Object> loginPasswdReset(IMapEntry<String, Object> paramMap) {
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();

		param.put("user_id", paramMap.get("user_id"));
		IMapEntry<String, Object> data = this.selectOne("sys.user.selectUserList", param);
		if (ObjectUtil.isEmpty(data)) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}

		param.clear();
		param.put("user_id", paramMap.get("user_id"));
		param.put("login_passwd", MD5Util.encode(data.getString("acc_nbr").substring(5)));
		this.update("sys.user.updateUser", param);

		return ResultUtil.resultSuccess("重置登录密码成功，重置后登录密码为手机号码后6位！");
	}

	public IMapEntry<String, Object> delUser(IMapEntry<String, Object> paramMap) {
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", paramMap))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}

		this.update("sys.user.delUser", paramMap);

		return ResultUtil.resultSuccess("删除用户信息成功!");
	}

	@Override
	public IMapEntry<String, Object> frozenUser(IMapEntry<String, Object> paramMap) {
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", paramMap))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}
		this.update("sys.user.frozenUser", paramMap);

		return ResultUtil.resultSuccess("冻结用户成功!");
	}

	@Override
	public IMapEntry<String, Object> unFrozenUser(IMapEntry<String, Object> paramMap) {
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", paramMap))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}
		this.update("sys.user.unFrozenUser", paramMap);

		return ResultUtil.resultSuccess("解冻用户成功!");
	}

	public IMapEntry<String, Object> insertUserJob(IMapEntry<String, Object> paramMap) {
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("user_id", paramMap.get("user_id"));
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", param))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}

		param.clear();
		param.put("bss_org_id", paramMap.get("bss_org_id"));
		if (ObjectUtil.isEmpty(this.selectOne("sys.bssorg.selectBssOrgList", param))) {
			throw new BusinessException("指定机构标识不存在，请核实!");
		}

		param.clear();
		param.put("bss_org_id", paramMap.get("bss_org_id"));
		if (ObjectUtil.isEmpty(this.selectOne("sys.bssorg.selectBssOrgList", param))) {
			throw new BusinessException("指定机构标识不存在，请核实!");
		}

		param.clear();
		param.put("user_id", paramMap.get("user_id"));

		List<IMapEntry<String, Object>> data_list = this.selectList("sys.sso.selectUserRoleList", param);
		if (ObjectUtil.isEmpty(data_list)) {
			throw new BusinessException("用户不存在角色授权信息，请核实!");
		} else {
			boolean exists = false;
			String role_id = paramMap.getString("role_id");
			for (IMapEntry<String, Object> item : data_list) {
				if (role_id.equalsIgnoreCase(item.getString("role_id"))) {
					exists = true;
					break;
				}
			}
			if (!exists) {
				throw new BusinessException("用户不存在该角色授权信息，请核实!");
			}
		}

		// 检查是否已经存在该任职信息
		param.clear();
		param.put("user_id", paramMap.get("user_id"));
		param.put("bss_org_id", paramMap.get("bss_org_id"));
		param.put("role_id", paramMap.get("role_id"));
		data_list = this.selectList("sys.user.selectUserJobList", param);
		if (ObjectUtil.isNotEmpty(data_list)) {
			throw new BusinessException("该任职信息已经存在，请核实!");
		}

		this.insert("sys.user.insertUserJob", paramMap);

		return ResultUtil.resultSuccess("新增用户任职信息成功！");
	}

	public IMapEntry<String, Object> delUserJob(IMapEntry<String, Object> paramMap) {
		this.update("sys.user.delUserJob", paramMap);

		return ResultUtil.resultSuccess("删除用户任职信息成功！");
	}

	public IMapEntry<String, Object> selectUserRoleLimitList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.user.selectUserRoleLimitList", paramMap));
	}

	public IMapEntry<String, Object> selectUserLimitList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.user.selectUserLimitList", paramMap));
	}

	public IMapEntry<String, Object> insertUserLimit(IMapEntry<String, Object> paramMap) {
		@SuppressWarnings("unchecked")
		IMapEntry<String, Object> param = Maps.newMapEntry();
		param.put("user_id", paramMap.get("user_id"));
		if (ObjectUtil.isEmpty(this.selectOne("sys.user.selectUserList", param))) {
			throw new BusinessException("指定用户标识不存在，请核实!");
		}

		if (ObjectUtil.isNotEmpty(paramMap.getString("limit_ids"))) {
			paramMap.put("limit_id_list", Arrays.asList(paramMap.getString("limit_ids").split(",")));
		}

		this.insert("sys.user.insertUserLimit", paramMap);

		return ResultUtil.resultSuccess("变更用户额外授权信息成功！");
	}
}
