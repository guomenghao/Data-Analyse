<%@ page language="java" contentType="text/html; charset=UTF-8" isELIgnored="false" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%
request.setAttribute("ctx", request.getContextPath());

//临时代码，用于主题皮肤切换演示
Object themes = session.getAttribute("themes");
if (themes == null) {
	themes = request.getParameter("themes");
	if (themes == null) {
		session.setAttribute("themes","sui-themes-dark-green");
	} else {
		session.setAttribute("themes", themes.toString());
	}
} else {
	themes = request.getParameter("themes");
	if (themes != null) {
		session.setAttribute("themes", themes.toString());
	}
}
%>	
<meta http-equiv="X-UA-Compatible" content="IE=edge"/>
<meta name="viewport" content="width=device-width, initial-scale=1"/>
<meta http-equiv="pragma" content="no-cache" />
<meta http-equiv="cache-control" content="no-cache" />
<title>系统管理V3.0</title>
<script type="text/javascript">
var ctx = '${ctx}';
var ticket = '${ticket}';
</script>

<!-- <link type="text/css" rel="stylesheet" href="http://g.alicdn.com/sj/dpl/1.5.1/css/sui-themes-green.min.css"/>
<link type="text/css" rel="stylesheet" href="http://g.alicdn.com/sj/dpl/1.5.1/css/sui.min.css" />
<link type="text/css" rel="stylesheet" href="http://g.alicdn.com/sj/dpl/1.5.1/css/sui-append.min.css"/>
<script type="text/javascript" src="http://g.alicdn.com/sj/lib/jquery/dist/jquery.min.js"></script>
<script type="text/javascript" src="http://g.alicdn.com/sj/dpl/1.5.1/js/sui.min.js"></script>-->

<link type="text/css" rel="stylesheet" href="${ctx}/css/${themes}.min.css" />
<link type="text/css" rel="stylesheet" href="${ctx}/css/sui-append.min.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/sui.min.js"></script>

<script type="text/javascript" src="${ctx}/js/third/jquery.placeholder.js"></script>
<script type="text/javascript" src="${ctx}/js/third/jquery.md5.js"></script>
<link type="text/css" rel="stylesheet" href="${ctx}/js/third/jquery.toast.min.css"/>
<script type="text/javascript" src="${ctx}/js/third/jquery.toast.min.js"></script>
<script type="text/javascript" src="${ctx}/js/third/avalon.js"></script>
<script type="text/javascript" src="${ctx}/js/common/common.js"></script>
<script type="text/javascript" src="${ctx}/js/common/user_limit_util.js"></script>
<script type="text/javascript" src="${ctx}/js/common/common_util.js"></script>
<script type="text/javascript" src="${ctx}/js/common/tree_util.js"></script>
<link type="text/css" rel="stylesheet" href="${ctx}/css/self.css" />

