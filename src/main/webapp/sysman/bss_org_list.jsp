<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<link type="text/css" rel="stylesheet" href="${ctx}/css/zTree.v3/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/sysman.bss_org_list.js"></script>
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
			<ul id="tree" class="ztree" style="width:400px; overflow:auto;margin-left: 0px;padding-left: 0px;" ></ul>
		</div>
		<div class="content">
			<p class="sui-text-xlarge" style="margin-top: 0px;">{{add_edit_view_title}}</p>
			<form id="form_add_edit_view" class="sui-form form-horizontal">
			  <input type="hidden" id="bss_org_id" name="bss_org_id" ms-duplex="@add_edit_view_data.bss_org_id"/>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>上级机构：</label>
			    <div class="controls">
					<span class="sui-dropdown dropdown-bordered">
						<span id="up_bss_org" class="dropdown-inner" style="width: 200px;"></span>
                   </span>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>所属区域：</label>
			    <div class="controls">
					<span class="sui-dropdown dropdown-bordered">
						<span id="area" class="dropdown-inner" style="width: 200px;"></span>
                   </span>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>机构名称：</label>
			    <div class="controls">
			      <input type="text" id="bss_org_name" name="bss_org_name" class="input-large" ms-duplex="@add_edit_view_data.bss_org_name" placeholder="请输入机构名称...">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>机构描述：</label>
			    <div class="controls">
			    	<textarea id="bss_org_desc" name="bss_org_desc" rows="4" cols="79" ms-duplex="@add_edit_view_data.bss_org_desc" placeholder="请输入机构描述..."></textarea>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"></label>
			    <div class="controls">
			      <button type="submit" class="sui-btn btn-primary">提交</button>
			      <a style="margin-left: 20px;" href="javascript:add_node_sibling();" class="sui-btn" :css="{display:@add_edit_view_type=='edit' ? '':'none'}">新增同级</a>
			      <a style="margin-left: 20px;" href="javascript:add_node_child();" class="sui-btn" :css="{display:@add_edit_view_type=='edit' ? '':'none'}">新增下级</a>
			      <a style="margin-left: 20px;" href="javascript:del();" class="sui-btn" :css="{display:@add_edit_view_type=='edit' ? '':'none'}">删除</a>	
			    </div>
			  </div>
			</form>
		</div>
	</div>
</div>
</body>
</html>