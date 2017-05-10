package com.tydic.web.sys.controller;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.tydic.base.util.IMapEntry;
import com.tydic.web.controller.ControllerBase;
import com.tydic.web.sys.service.UserService;

/**
 * 
 * @author wujian
 *
 */
@Controller
@RequestMapping("user")
public class UserController extends ControllerBase {
	@Autowired
	private UserService userService;

	@ResponseBody
	@RequestMapping("selectUserRoleLimitList")
	public IMapEntry<String, Object> selectUserRoleLimitList(HttpServletRequest request) {
		return this.userService.selectUserRoleLimitList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectUserLimitList")
	public IMapEntry<String, Object> selectUserLimitList(HttpServletRequest request) {
		return this.userService.selectUserLimitList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertUserLimit")
	public IMapEntry<String, Object> insertUserLimit(HttpServletRequest request) {
		return this.userService.insertUserLimit(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectUserRoleList")
	public IMapEntry<String, Object> selectUserRoleList(HttpServletRequest request) {
		return this.userService.selectUserRoleList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectUserJobList")
	public IMapEntry<String, Object> selectUserJobList(HttpServletRequest request) {
		return this.userService.selectUserJobList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertUserJob")
	public IMapEntry<String, Object> insertUserJob(HttpServletRequest request) {
		return this.userService.insertUserJob(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("delUserJob")
	public IMapEntry<String, Object> delUserJob(HttpServletRequest request) {
		return this.userService.delUserJob(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectUserList")
	public IMapEntry<String, Object> selectUserList(HttpServletRequest request) {
		return this.userService.selectUserList(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("selectUserDetail")
	public IMapEntry<String, Object> selectUserDetail(HttpServletRequest request) {
		return this.userService.selectUserDetail(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("insertUser")
	public IMapEntry<String, Object> insertUser(HttpServletRequest request) {
		return this.userService.insertUser(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("updateUser")
	public IMapEntry<String, Object> updateUser(HttpServletRequest request) {
		return this.userService.updateUser(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("loginPasswdReset")
	public IMapEntry<String, Object> loginPasswdReset(HttpServletRequest request) {
		return this.userService.loginPasswdReset(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("delUser")
	public IMapEntry<String, Object> delUser(HttpServletRequest request) {
		return this.userService.delUser(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("frozenUser")
	public IMapEntry<String, Object> frozenUser(HttpServletRequest request) {
		return this.userService.frozenUser(this.getRequestParameters());
	}

	@ResponseBody
	@RequestMapping("unFrozenUser")
	public IMapEntry<String, Object> unFrozenUser(HttpServletRequest request) {
		return this.userService.unFrozenUser(this.getRequestParameters());
	}
}
