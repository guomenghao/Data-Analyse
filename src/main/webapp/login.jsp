<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<%@include file="common/common-nologin.jsp" %>
	<script type="text/javascript" src="${ctx}/js/common/cookie_util.js"></script>
	<script type="text/javascript" src="${ctx}/js/sysman.login.js"></script>
	<script type="text/javascript">
	$(function(){
		init();
	});
	</script>
</head>
<body>
<div class="sui-container" style="width:500px; height:200px; position:absolute; left:50%; top:50%; margin-left:-200px; margin-top:-100px;">
	<form id="form_login" class="sui-form form-horizontal">
		<div class="control-group">
		  <label for="login_code" class="control-label">登录账号：</label>
		  <div class="controls">
		    <input type="text" id="login_code" name="login_code" class="input-large" placeholder="请输入账号/手机号码/邮件地址..."/>
		  </div>
		</div>
		<div class="control-group">
		  <label for="login_passwd" class="control-label">登录密码：</label>
		  <div class="controls">
		    <input type="password" id="login_passwd" name="login_passwd" class="input-large" placeholder="请输入登录密码..."/>
		  </div>
		</div>
		<div class="control-group">
		  <label class="control-label"></label>
		  <div class="controls">
		    <button type="submit" id="btn_submit" class="sui-btn btn-primary">登录</button>
		    <button type="reset" class="sui-btn">重置</button>
		  </div>
		</div>
	</form>
</div>
</body>
</html>