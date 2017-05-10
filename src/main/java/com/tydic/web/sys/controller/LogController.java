package com.tydic.web.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.base.util.IMapEntry;
import com.tydic.web.controller.ControllerBase;
import com.tydic.web.sys.service.LogService;

@Controller
@RequestMapping("log")
public class LogController extends ControllerBase {

	@Autowired
	private LogService logService;

	@ResponseBody
	@RequestMapping("selectLoginLogList")
	public IMapEntry<String, Object> selectLoginLogList(HttpServletRequest request) {
		return this.logService.selectLoginLogList(this.getRequestParameters());
	}
}
