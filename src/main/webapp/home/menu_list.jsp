<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/home.menu_list.js"></script>
<script type="text/javascript">
$(function(){
	init(${param.menu_func_id});
});
</script>
</head>
<body>
<div class="sui-container">
	<div class="sui-layout">
		<div id="menu_breadcrumb"></div>
		<div ms-controller="data_table_controller">
			<table class="sui-table table-primary">
				<thead>
					<th width="30">序号</th>
					<th width="100">菜单编码</th>
					<th width="120">菜单名称</th>
					<th>功能描述</th>
				</thead>
				<tbody>
					<tr ms-for="($index,el) in @data_list">
			  		<td>{{$index + 1}}</td>
			  		<td>{{el.menu_func_id}}</td>
			  		<td><a ms-attr="{href:el.url_info}">{{el.menu_func_name}}</a></td>
			  		<td ms-attr="{title:el.menu_func_desc}">{{el.menu_func_desc}}</td>
			  	</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</body>
</html>