package com.tydic.web.sys.service;

import com.tydic.base.util.IMapEntry;

/**
 * 
 * @author wujian
 *
 */
public interface RoleService {
	public IMapEntry<String, Object> selectRoleList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectRoleDetail(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertRole(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> updateRole(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> delRole(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectRoleLimitList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> updateRoleLimit(IMapEntry<String, Object> paramMap);
}
