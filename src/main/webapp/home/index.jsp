<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/home.index.js"></script>
<script type="text/javascript">
$(function(){
	init();
});
</script>
</head>
<body>
<div class="sui-navbar">
	<div class="navbar-inner"><a href="${ctx}/home/index.jsp" class="sui-brand">系统管理V3.0</a>
		<ul class="sui-nav" id="menu_nav"></ul>
	    <ul class="sui-nav pull-right">
	      <li><a href="${ctx}/home/index.jsp?themes=sui"><font color="#28a3ef">默认皮肤</font></a></li>
	      <li><a href="${ctx}/home/index.jsp?themes=sui-themes-pink"><font color="#b654a7">粉色皮肤</font></a></li>
	      <li><a href="${ctx}/home/index.jsp?themes=sui-themes-green"><font color="#4a8e57">绿色皮肤</font></a></li>
	      <li><a href="${ctx}/home/index.jsp?themes=sui-themes-dark-green"><font color="#518594">深绿色皮肤</font></a></li>
	      <li><a href="javascript:loginout();">退出登录</a></li>
	    </ul>
  </div>
  <iframe id="iframe_content" src="#" frameborder="0" scrolling="auto;" width="100%;"/>
</div>
</body>
</html>