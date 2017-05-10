package com.tydic.web.sys.service;

import java.util.Arrays;

import org.springframework.stereotype.Service;

import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.ObjectUtil;
import com.tydic.base.util.ResultUtil;

/**
 * 
 * @author wujian
 *
 */
@Service("roleService")
public class RoleServiceImpl extends ServiceBase implements RoleService {

	public IMapEntry<String, Object> selectRoleList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.qryPage("sys.role.selectRoleList", paramMap));
	}

	public IMapEntry<String, Object> selectRoleDetail(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectOne("sys.role.selectRoleDetail", paramMap));
	}

	public IMapEntry<String, Object> insertRole(IMapEntry<String, Object> paramMap) {
		// 检查服务请求者是否具被新增该记录的权限,预留功能，暂不实现
		this.insert("sys.role.insertRole", paramMap);

		return ResultUtil.resultSuccess("新增角色信息成功!");
	}

	public IMapEntry<String, Object> updateRole(IMapEntry<String, Object> paramMap) {
		// 检查服务请求者是否具更新该记录的权限,预留功能，暂不实现
		this.update("sys.role.updateRole", paramMap);

		return ResultUtil.resultSuccess("编辑更新角色信息成功!");
	}

	public IMapEntry<String, Object> delRole(IMapEntry<String, Object> paramMap) {
		// 检查该记录是否允许删除, 暂定1个业务场景约束：角色下有任职用户的不允许删除
		IMapEntry<String, Object> data = this.selectOne("sys.role.selectRoleUserCount", paramMap);
		int role_user_count = data.getInteger("role_user_count");

		if (role_user_count > 0) {
			return ResultUtil.resultFailure("该角色下存在用户信息，请先解除关系后再删除该角色信息!");
		} else {
			this.update("sys.role.delRole", paramMap);
			return ResultUtil.resultSuccess("删除角色信息成功!");
		}
	}

	public IMapEntry<String, Object> selectRoleLimitList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.selectList("sys.role.selectRoleLimitList", paramMap));
	}

	public IMapEntry<String, Object> updateRoleLimit(IMapEntry<String, Object> paramMap) {
		if (ObjectUtil.isNotEmpty(paramMap.getString("limit_ids"))) {
			paramMap.put("limit_id_list", Arrays.asList(paramMap.getString("limit_ids").split(",")));
		}

		this.update("sys.role.updateRoleLimit", paramMap);

		return ResultUtil.resultSuccess("编辑角色权限信息成功!");
	}
}
