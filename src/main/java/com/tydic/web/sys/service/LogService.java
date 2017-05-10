package com.tydic.web.sys.service;

import com.tydic.base.util.IMapEntry;

public interface LogService {
	public IMapEntry<String, Object> selectLoginLogList(IMapEntry<String, Object> paramMap);
}
