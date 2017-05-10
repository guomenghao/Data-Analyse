package com.tydic.web.sys.service;

import com.tydic.base.util.IMapEntry;

/**
 * 
 * @author wujian
 *
 */
public interface UserService {
	public IMapEntry<String, Object> selectUserRoleList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectUserJobList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectUserList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectUserDetail(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertUser(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> updateUser(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> loginPasswdReset(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> delUser(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> frozenUser(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> unFrozenUser(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertUserJob(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> delUserJob(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectUserRoleLimitList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> selectUserLimitList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertUserLimit(IMapEntry<String, Object> paramMap);
}
