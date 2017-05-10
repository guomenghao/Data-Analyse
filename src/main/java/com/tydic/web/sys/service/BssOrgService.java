package com.tydic.web.sys.service;

import com.tydic.base.util.IMapEntry;

/**
 * 
 * @author wujian
 *
 */
public interface BssOrgService {
	public IMapEntry<String, Object> selectBssOrgList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertBssOrg(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> updateBssOrg(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> delBssOrg(IMapEntry<String, Object> paramMap);
}
