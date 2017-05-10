package com.tydic.web.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.base.util.IMapEntry;
import com.tydic.web.controller.ControllerBase;
import com.tydic.web.sys.service.RoleService;

/**
 * 
 * @author wujian
 *
 */
@Controller
@RequestMapping("role")
public class RoleController extends ControllerBase {

	@Autowired
	private RoleService roleService;

	@ResponseBody
	@RequestMapping("selectRoleList")
	public IMapEntry<String, Object> selectRoleList(HttpServletRequest request) {
		return this.roleService.selectRoleList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectRoleDetail")
	public IMapEntry<String, Object> selectRoleDetail(HttpServletRequest request) {
		return this.roleService.selectRoleDetail(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertRole")
	public IMapEntry<String, Object> insertRole(HttpServletRequest request) {
		return this.roleService.insertRole(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("updateRole")
	public IMapEntry<String, Object> updateRole(HttpServletRequest request) {
		return this.roleService.updateRole(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("delRole")
	public IMapEntry<String, Object> delRole(HttpServletRequest request) {
		return this.roleService.delRole(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectRoleLimitList")
	public IMapEntry<String, Object> selectRoleLimitList(HttpServletRequest request) {
		return this.roleService.selectRoleLimitList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("updateRoleLimit")
	public IMapEntry<String, Object> updateRoleLimit(HttpServletRequest request) {
		return this.roleService.updateRoleLimit(this.getRequestParameters());
	}
}
