<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<link type="text/css" rel="stylesheet" href="${ctx}/css/zTree.v3/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/sysman.role_list.js"></script>
<script type="text/javascript">
$(function(){
	init();
});
</script>
</head>
<body ms-controller="ms_vm">
<div class="sui-container">
	<div class="sui-layout">
		<div id="menu_breadcrumb"></div>
		<div>
			<form id="form_search" class="sui-form form-search">
				<table width="100%" class="sui-table table-bordered table-sideheader">
					<tbody>
						<tr>
							<td width="100">适用类型</td>
							<td>
								<label class="radio-pretty inline checked">
									<input type="radio" checked="checked" id="s_user_type" name="s_user_type" value="" onclick="qry_data(1);"/><span>全部</span>
								</label>
								<label class="radio-pretty inline" ms-for="($index,el) in @user_type_data_list">
									<input type="radio" id="s_user_type" name="s_user_type" ms-attr="{value:@el.item_code}" onclick="qry_data(1);"/><span>{{el.item_text}}</span>
								</label>
							</td>
						</tr>
						<tr>
							<td>模糊检索</td>
							<td>
								<div class="input-append">
			  						<input id="s_key_words" name="s_key_words" type="text" class="span2 input-xlarge" placeholder="请输入角色名称/描述..."/>
			  						<button id="btn_qry" type="button" class="sui-btn btn-primary" onclick="qry_data(1);">检索</button>
			  						<button type="button" class="sui-btn" onclick="reset_search();">重置</button>
								</div>
								<div class="input-append" style="float:right">
		  							<button data-toggle="modal" onclick="add();" data-keyboard="false" class="sui-btn btn-primary btn-lg" ms-if="@is_limited_function_id(31)">新增</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</form>
		</div>
		<div>
			<table class="sui-table table-primary">
			  <thead>
			    <tr>
			      <th width="30">序号</th>
			      <th width="60">角色编码</th>
			      <th width="100">角色名称</th>
			      <th width="80">适用类型</th>
			      <th>角色描述</th>
			      <th width="160">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<tr ms-for="($index,el) in @tab_data_list">
			  		<td>{{$index + 1 + @tab_data_page_num}}</td>
			  		<td>{{el.role_id}}</td>
			  		<td>{{el.role_name}}</td>
			  		<td>{{el.user_type_text}}</td>
			  		<td ms-attr="{title:el.role_desc}">{{el.role_desc}}</td>
			  		<td>
			  			<a ms-attr="{href:@is_limited_function_id(32) ? 'javascript:view('+el.role_id+');' : 'javascript:void(0);'}" :class="@is_limited_function_id(32) ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">查看</a>
			  			<a ms-attr="{href:@is_limited_function_id(33) ? 'javascript:edit('+el.role_id+');' : 'javascript:void(0);'}" :class="@is_limited_function_id(33) ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">编辑</a>
			  			<a ms-attr="{href:@is_limited_function_id(34) && el.role_id!=1 ? 'javascript:del('+el.role_id+');' : 'javascript:void(0);'}" :class="@is_limited_function_id(34) && el.role_id!=1 ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">删除</a>
			  			<a ms-attr="{href:@is_limited_function_id(56) ? 'javascript:limit('+$index+');' : 'javascript:void(0);'}" :class="@is_limited_function_id(56) ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">权限</a>
			  		</td>
			  	</tr>
			  	<tr>
			  		<td colspan="6">
			  			共计<a class="sui-text-danger">{{@tab_data_total_cnt}}</a>条记录<span id="page_nav" style="display: inline-block; margin-left: 10px;"></span>
			  		</td>
			  	</tr>
			  </tbody>
			</table>
		</div>
	</div>
</div>
<div id="dlg_add_edit_view" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_add_edit_view" class="sui-form form-horizontal">
				<input type="hidden" id="role_id" name="role_id" ms-duplex="@add_edit_view_data.role_id" />
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_title}}</h4>
				</div>
				<div class="modal-body">
						<div class="control-group">
							<label class="control-label"><b style="color: #f00;">*</b>适用类型：</label>
							<div class="controls">
								<label :class="[@add_edit_view_data.user_type == el.item_code ? 'radio-pretty inline checked' : 'radio-pretty inline']" ms-for="($index,el) in @user_type_data_list">
									<input type="radio" id="user_type" name="user_type" ms-duplex-check="@add_edit_view_data.user_type" ms-attr="{value:@el.item_code}"/><span>{{el.item_text}}</span>
								</label>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"><b style="color: #f00;">*</b>角色名称：</label>
							<div class="controls">
								<input type="text" id="role_name" name="role_name" ms-duplex="@add_edit_view_data.role_name" class="input-large" placeholder="请输入角色名称..." />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label"><b style="color: #f00;">*</b>角色描述：</label>
							<div class="controls">
								<textarea id="role_desc" name="role_desc" rows="3" cols="40" ms-duplex="@add_edit_view_data.role_desc" placeholder="请输入角色描述..."></textarea>
							</div>
						</div>
				</div>
				<div class="modal-footer">
				  	<button type="submit" id="btn_submit" class="sui-btn btn-primary" :css="{display:@add_edit_view_show_submit ? '':'none'}">提交</button>
		    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>
<div id="dlg_role_limit" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_role_limit" class="sui-form form-horizontal">
				<input type="hidden" id="role_id" name="role_id" value="@role_limit.role_id" />
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">权限:{{@role_limit.role_name}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<div class="controls">
							<ul id="tree" class="ztree" style="overflow:auto;margin-left: 0px;padding-left: 0px;" ></ul>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				  	<button type="submit" id="btn_submit" class="sui-btn btn-primary" :css="{display:@add_edit_view_show_submit ? '':'none'}">提交</button>
		    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>
</body>
</html>