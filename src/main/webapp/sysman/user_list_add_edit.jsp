<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<link type="text/css" rel="stylesheet" href="${ctx}/css/zTree.v3/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/sysman.user_list_add_edit.js"></script>
<script type="text/javascript">
$(function(){
	var user_id = '${param.user_id}';
	init(user_id);
});
</script>
</head>
<body ms-controller="ms_vm">
<div class="sui-container">
	<div class="sui-layout">
		<div id="menu_breadcrumb"></div>
		<div class="sui-steps steps-auto">
		  <div class="wrap">
		    <div id="step_1" class="current">
		      <label><span class="round">1</span><span style="cursor: pointer;" onclick="goto_step(1)">基本信息</span></label><i class="triangle-right-bg"></i><i class="triangle-right"></i>
		    </div>
		  </div>
		  <div class="wrap">
		    <div id="step_2" class="todo">
		      <label><span class="round">2</span><span  style="cursor: pointer;" onclick="goto_step(2)">任职信息</span></label><i class="triangle-right-bg"></i><i class="triangle-right"></i>
		    </div>
		  </div>
		  <div class="wrap">
		    <div id="step_3" class="todo">
		      <label><span class="round">3</span><span  style="cursor: pointer;"  onclick="goto_step(3)">菜单功能权限</span></label><i class="triangle-right-bg"></i><i class="triangle-right"></i>
		    </div>
		  </div>
		  <div class="wrap" style="display: none;">
		    <div id="step_4" class="todo">
		      <label><span class="round">4</span><span  onclick="goto_step(1)">更多信息</span></label><i class="triangle-right-bg"></i><i class="triangle-right"></i>
		    </div>
		  </div>
		</div>
		<div id="div_1">
			<form id="form_add_edit_view" class="sui-form form-horizontal">
				<input type="hidden" id="user_id" name="user_id" ms-attr="{value:@add_edit_view_data.user_id}" />
				<div class="control-group" style="display: none;">
					<label for="user_type" class="control-label"><b style="color: #f00;">*</b>所属区域：</label>
					<div class="controls">
						<span class="sui-dropdown dropdown-bordered">
							<span id="area" class="dropdown-inner" style="width: 200px;"></span>
	                   </span>
					</div>
				</div>
				<div class="control-group">
					<label class="control-label"><b style="color: #f00;">*</b>用户类型：</label>
					<div class="controls">
						<label :class="[@add_edit_view_data.user_type == el.item_code ? 'radio-pretty inline checked' : 'radio-pretty inline']" ms-for="($index,el) in @user_type_data_list">
							<input type="radio" id="user_type" name="user_type"  ms-duplex-check="@add_edit_view_data.user_type" ms-attr="{value:@el.item_code}"/><span>{{el.item_text}}</span>
						</label>
					</div>
				</div>
				<div class="control-group">
				    <label class="control-label"><b style="color: #f00;">*</b>用户姓名：</label>
				    <div class="controls">
				      <input type="text" id="user_name" name="user_name" class="input-large" ms-duplex="@add_edit_view_data.user_name" placeholder="请输入用户姓名...">
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label"><b style="color: #f00;">*</b>登录账号：</label>
				    <div class="controls">
				      <input type="text" id="login_acct" name="login_acct" class="input-large" ms-duplex="@add_edit_view_data.login_acct" placeholder="请输入登录账号...">
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label"><b style="color: #f00;">*</b>手机号码：</label>
				    <div class="controls">
				      <input type="text" id="acc_nbr" name="acc_nbr" class="input-large" ms-duplex="@add_edit_view_data.acc_nbr" placeholder="请输入手机号码...">
				      <div class="sui-msg msg-naked msg-tips"><i class="msg-icon"></i>
				        <div class="msg-con">新增用户时，手机号码后6位将作为默认登录密码</div>
				      </div>
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label">电子邮件：</label>
				    <div class="controls">
				      <input type="text" id="user_email" name="user_email" class="input-xlarge" ms-duplex="@add_edit_view_data.user_email" placeholder="请输入电子邮件...">
				    </div>
				</div>
				<div class="control-group">
				    <label class="control-label"><b style="color: #f00;">*</b>选择角色：</label>
				    <div class="controls">
				      <label ms-attr="{id:'chk_'+el.role_id}" class="checkbox-pretty inline" ms-for="($index,el) in @role_data_list">
				        <input type="checkbox" id="role_ids" name="role_ids" ms-attr="{value:@el.role_id}"><span>{{el.role_name}}</span>
				      </label>
				    </div>
				</div>
				<div style="margin-left: 96px;">
				    <!-- <button type="submit" class="sui-btn btn-primary">提交</button> -->
				    <button type="button" class="sui-btn" onclick="user_save()">下一步</button>
				</div>
			  	
			</form>
		</div>
		<div id="div_2" style="display: none;">
			<table class="sui-table table-primary">
			  <thead>
			    <tr>
			      <th width="30">序号</th>
			      <th>机构路径</th>
			      <th>角色名称</th>
			      <th width="40">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<tr ms-for="($index,el) in @user_job_data_list">
			  		<td>{{$index + 1}}</td>
			  		<td>{{el.bss_org_path_link}}</td>
			  		<td>{{el.role_name}}</td>
			  		<td>
			  			<a ms-attr="{href:'javascript:del('+$index+');'}" class="sui-btn btn-small btn-link">删除</a>
			  		</td>
			  	</tr>
			  	<tr>
			  		<td colspan="4">
			  			共计<a class="sui-text-danger">{{@user_job_data_list.length}}</a>条记录
			  		</td>
			  	</tr>
			  </tbody>
			</table>
			<div style="position:absolute;left: 40%; margin-top: 30px;">
				<button type="button" class="sui-btn btn-primary" onclick="add();">新增</button>
				<button type="button" class="sui-btn" onclick="goto_step(1)" style="margin-left: 10px;">上一步</button>
				<button type="button" class="sui-btn" onclick="goto_step(3)" style="margin-left: 10px;">下一步</button>
			</div>
		</div>
		<div id="div_3" style="display: none; width: 100%">
			<div style="width:400px;height:100%; float: left;">
				<div class="sui-msg msg-tips msg-naked">
     				<div class="msg-con">已经具备的权限：基于用户所属角色</div>
     				<s class="msg-icon"></s>
   				</div>
   				<ul id="tree_role" class="ztree" style="overflow:auto;margin-left: 10px;padding-left: 0px;" ></ul>
			</div>
			<div style="height:100%; float: left;border-left: 1px solid #ddd;">
				<div class="sui-msg msg-tips msg-naked">
     				<div class="msg-con">额外的授权权限：用户在基于所属角色权限以外的还可以拥有的权限</div>
     				<s class="msg-icon"></s>
   				</div>
   				<ul id="tree_user" class="ztree" style="overflow:auto; margin-left: 10px;padding-left: 0px;" ></ul>
				<div style="margin-top: 30px; margin-left: 10px;">
		      		<button type="button" class="sui-btn btn-primary" onclick="save();">提交</button>
					<button type="button" class="sui-btn" onclick="goto_step(2)" style="margin-left: 10px;">上一步</button>
					<%-- <button type="button" class="sui-btn" onclick="goto_step(1)" style="margin-left: 10px;">基本信息</button> --%>
				</div>
			</div>
		</div>
		<div id="div_4" style="display: none;">
			<br/><br/>
			<center>
			<p>这里没有想好做啥内容</p>
			<br/><br/>
			<div style="margin-left: 96px;">
			    <button type="button" onclick="goto_step(3)" class="sui-btn" style="margin-left: 10px;" ms-if="@add_edit_view_type=='edit' ">上一步</button>
			    <button type="button" onclick="goto_step(1)" class="sui-btn" style="margin-left: 10px;" ms-if="@add_edit_view_type=='edit' ">返回基本信息</button>
			</div>
			</center>
		</div>
	</div>
</div>
<div id="dlg_user_job" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_user_job" class="sui-form form-horizontal">
				<input type="hidden" id="user_id" name="user_id" ms-attr="{value:@add_edit_view_data.user_id}" />
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">新增任职信息--{{@add_edit_view_data.user_name}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>选择角色：</label>
						<div class="controls">
							<label class="radio-pretty inline" ms-for="($index,el) in @user_role_data_list">
								<input type="radio" id="role_id" name="role_id" ms-attr="{value:@el.role_id}"/><span>{{el.role_name}}</span>
							</label>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>选择机构：</label>
						<div class="controls">
							<ul id="tree" class="ztree" style="overflow:auto;margin-left: 0px;padding-left: 0px;" ></ul>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				  	<button type="submit" id="btn_submit" class="sui-btn btn-primary">提交</button>
		    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>
</body>
</html>