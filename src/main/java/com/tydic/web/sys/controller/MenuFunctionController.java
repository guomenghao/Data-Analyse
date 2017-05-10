package com.tydic.web.sys.controller;

import javax.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import com.tydic.base.util.IMapEntry;
import com.tydic.web.controller.ControllerBase;
import com.tydic.web.sys.service.MenuFunctionService;

/**
 * 
 * @author wujian
 *
 */
@Controller
@RequestMapping("menufunc")
public class MenuFunctionController extends ControllerBase {

	@Autowired
	private MenuFunctionService menuFunctionService;

	@ResponseBody
	@RequestMapping("selectMenuFunctionList")
	public IMapEntry<String, Object> selectMenuFunctionList(HttpServletRequest request) {
		return this.menuFunctionService.selectMenuFunctionList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertMenuFunction")
	public IMapEntry<String, Object> insertMenuFunction(HttpServletRequest request) {
		return this.menuFunctionService.insertMenuFunction(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("delMenuFunction")
	public IMapEntry<String, Object> delMenuFunction(HttpServletRequest request) {
		return this.menuFunctionService.delMenuFunction(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("updateMenuFunction")
	public IMapEntry<String, Object> updateMenuFunction(HttpServletRequest request) {
		return this.menuFunctionService.updateMenuFunction(this.getRequestParameters());
	}
}
