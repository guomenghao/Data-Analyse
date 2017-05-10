package com.tydic.web.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.base.util.IMapEntry;
import com.tydic.web.controller.ControllerBase;
import com.tydic.web.sys.service.BssOrgService;

/**
 * 
 * @author wujian
 *
 */
@Controller
@RequestMapping("bssorg")
public class BssOrgController extends ControllerBase {
	@Autowired
	private BssOrgService bssOrgService;

	@ResponseBody
	@RequestMapping("selectBssOrgList")
	public IMapEntry<String, Object> selectBssOrgList(HttpServletRequest request) {
		return this.bssOrgService.selectBssOrgList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertBssOrg")
	public IMapEntry<String, Object> insertBssOrg(HttpServletRequest request) {
		return this.bssOrgService.insertBssOrg(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("updateBssOrg")
	public IMapEntry<String, Object> updateBssOrg(HttpServletRequest request) {
		return this.bssOrgService.updateBssOrg(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("delBssOrg")
	public IMapEntry<String, Object> delBssOrg(HttpServletRequest request) {
		return this.bssOrgService.delBssOrg(this.getRequestParameters());
	}
}
