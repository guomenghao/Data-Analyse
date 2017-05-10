<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<link type="text/css" rel="stylesheet" href="${ctx}/css/zTree.v3/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/sysman.menu_function_list.js"></script>
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
		<div id="left" class="sidebar" style="border-right: 1px solid #ddd;height: 100%;width: 300px;">
			<ul id="tree" class="ztree" style="width:300px; overflow:auto;margin-left: 0px;padding-left: 0px;" ></ul>
		</div>
		<div class="content">
			<p class="sui-text-xlarge" style="margin-top: 0px;">{{add_edit_view_title}}</p>
			<form id="form_add_edit_view" class="sui-form form-horizontal">
			  <input type="hidden" id="menu_func_id" name="menu_func_id" ms-duplex="@add_edit_view_data.menu_func_id"/>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>选择类型：</label>
			    <div class="controls">
			    	<label data-toggle="radio" :class="[@add_edit_view_data.limit_type==el.item_code ? 'radio-pretty inline checked':'radio-pretty inline']" ms-for="($index, el) in @limit_type_data_list">
						<input type="radio" id="limit_type" name="limit_type" ms-attr="{value:el.item_code}" ms-duplex-check="@add_edit_view_data.limit_type"/><span>{{el.item_text}}</span>
					</label>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>来源系统：</label>
			    <div class="controls">
			      <label data-toggle="radio" :class="[@add_edit_view_data.from_system == el.item_code ? 'radio-pretty inline checked' : 'radio-pretty inline']" ms-for="($index,el) in @from_system_data_list">
			        <input type="radio" id="from_system" name="from_system" ms-attr="{value:el.item_code}" ms-duplex-check="@add_edit_view_data.from_system" /><span>{{el.item_text}}</span>
			      </label>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>上级菜单：</label>
			    <div class="controls">
					<span class="sui-dropdown dropdown-bordered">
						<span id="up_menu_func" class="dropdown-inner" style="width: 200px;"></span>
                   </span>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>名称：</label>
			    <div class="controls">
			      <input type="text" id="menu_func_name" name="menu_func_name" class="input-large" ms-duplex="@add_edit_view_data.menu_func_name" placeholder="请输入菜单功能项名称...">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>链接URL：</label>
			    <div class="controls">
			      <input type="text" id="url_info" name="url_info" class="input-xxlarge" ms-duplex="@add_edit_view_data.url_info" placeholder="请输入菜链接URL...">
			      <div class="sui-msg msg-tips msg-naked">
			        <div class="msg-con">提示：没有请填写 # </div>
			        <s class="msg-icon"></s>
			      </div>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>同级排序：</label>
			    <div class="controls">
			      <input type="text" id="order_id" name="order_id" class="input-small" ms-duplex="@add_edit_view_data.order_id" placeholder="数字">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>描述：</label>
			    <div class="controls">
			    	<textarea id="menu_func_desc" name="menu_func_desc" rows="4" cols="79" ms-duplex="@add_edit_view_data.menu_func_desc" placeholder="请输入菜单功能项描述..."></textarea>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"></label>
			    <div class="controls">
			      <button type="submit" class="sui-btn btn-primary">提交</button>
			      <a style="margin-left: 20px;" href="javascript:add_node_sibling();" class="sui-btn" :css="{display:add_edit_view_type=='edit' ? '':'none'}">新增同级</a>
			      <a style="margin-left: 20px;" href="javascript:add_node_child();" class="sui-btn" :css="{display:(@add_edit_view_type=='edit' && (@add_edit_view_data.limit_type == 'WEB_MENU'||@add_edit_view_data.limit_type == 'MOB_APP')) ? '':'none'}">新增下级</a>
			      <a style="margin-left: 20px;" href="javascript:del();" class="sui-btn" :css="{display:@add_edit_view_type=='edit' ? '':'none'}">删除</a>	
			    </div>
			  </div>
			</form>
		</div>
	</div>
</div>
</body>
</html>