<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<link type="text/css" rel="stylesheet" href="${ctx}/css/zTree.v3/zTreeStyle/zTreeStyle.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.ztree.all.min.js"></script>
<script type="text/javascript" src="${ctx}/js/syscfg.com_area_list.js"></script>
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
			  <input type="hidden" id="area_id" name="area_id" ms-duplex="@add_edit_view_data.area_id"/>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>上级区域：</label>
			    <div class="controls">
					<span class="sui-dropdown dropdown-bordered">
						<span id="up_area" class="dropdown-inner" style="width: 200px;"></span>
                   </span>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>区域名称：</label>
			    <div class="controls">
			      <input type="text" id="area_name" name="area_name" class="input-large" ms-duplex="@add_edit_view_data.area_name" placeholder="请输入区域名称...">
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"><b style="color: #f00;">*</b>区域描述：</label>
			    <div class="controls">
			    	<textarea id="area_desc" name="area_desc" rows="4" cols="79" ms-duplex="@add_edit_view_data.area_desc" placeholder="请输入区域描述..."></textarea>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label">中心点：</label>
			    <div class="controls">
			    	<input type="text" id="center_longitude" name="center_longitude" class="input-medium" ms-duplex="@add_edit_view_data.center_longitude" placeholder="经度...">
			    	-
			    	<input type="text" id="center_latitude" name="center_latitude" class="input-medium" ms-duplex="@add_edit_view_data.center_latitude" placeholder="纬度...">
			    	<div class="sui-msg msg-tips msg-naked">
				        <div class="msg-con">提示：区域的中心点经纬度</div>
				        <s class="msg-icon"></s>
				    </div>
			    </div>
			  </div>
			  <div class="control-group">
			    <label class="control-label"></label>
			    <div class="controls">
			      <button type="submit" class="sui-btn btn-primary">提交</button>
			      <a style="margin-left: 20px;" href="javascript:add_node_sibling();" class="sui-btn" :css="{display:(@add_edit_view_type=='edit' && @add_edit_view_data.pId != null ) ? '':'none'}">新增同级</a>
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