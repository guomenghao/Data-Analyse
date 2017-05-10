<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/avalon.js"></script>
<script type="text/javascript">
avalon.define({
    $id: 'test',
    aaa: 'aaa',
    bbb: 'bbb'
});
</script>
</head>
<body ms-controller="test">
	<p>{{@aaa}}{{@bbb}} 这个性能差些</p>
    <p>{{@aaa+@bbb}} 这个性能好些</p>
    <p>{{@aaa+@bbb  | uppercase}} 选择器必须放在表达值的后端</p>
</body>
</html>