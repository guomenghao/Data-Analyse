package com.tydic.web.sys.service;

import com.tydic.base.util.IMapEntry;

/**
 * 
 * @author wujian
 *
 */
public interface MenuFunctionService {
	public IMapEntry<String, Object> selectMenuFunctionList(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> insertMenuFunction(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> delMenuFunction(IMapEntry<String, Object> paramMap);

	public IMapEntry<String, Object> updateMenuFunction(IMapEntry<String, Object> paramMap);
}
