package com.tydic.web.sys.service;

import org.springframework.stereotype.Service;

import com.tydic.base.service.ServiceBase;
import com.tydic.base.util.IMapEntry;
import com.tydic.base.util.ResultUtil;

@Service("logService")
public class LogServiceImpl extends ServiceBase implements LogService {

	@Override
	public IMapEntry<String, Object> selectLoginLogList(IMapEntry<String, Object> paramMap) {
		return ResultUtil.resultSuccess(this.qryPage("sys.log.selectLoginLogList", paramMap));
	}
}
