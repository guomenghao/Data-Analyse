<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
</head>
<body>
<div class="sui-container">
<h1><a href="#">好吧，这是首页，需要每个项目自行开发，一定要高端大气上档次</a></h1>
<h2>这里我们来说一说这次框架的特点：</h2>
<a href="#">项目目标：</a>统一部门基础开发框架；重构系统管理3.0；引入MVVM前端开发模式；解决IE8兼容性问题；统一前端普通业务场景系统；<span class="sui-text-danger">支持前端更好的自定义修改样式CSS</span>
<br/><a href="#">技术选型：</a>SUI 2 + avalon 2，SUI3(http://sui3.taobao.org/)是基于bootstrap3的，不支持IE8，所以我们还是选择SUI2(http://sui.taobao.org/sui/docs/gallery.html)；avalon 是一个轻量级MVVM框架(http://avalonjs.coding.me/)
<br/><a href="#">&nbsp;&nbsp;&nbsp;兼容性：</a><span class="sui-text-danger">IE8及以上</span>，其他主流浏览器如chrome，Safari等
<br/><a href="#">后端分层：</a>Controller只负责参数准备和校验工作，Service负责具体业务逻辑
<br/><a href="#">常见组件：</a>文本框、单选、树、下拉树、表格、分页等，通过实际功能开发提供示例
<br/><a href="#">智能分页：</a>提供通用计算函数，通过分辨率自动识别分页条数，800以下：10条，800-1000：15条，1000以上：20条
<br/><a href="#">列表排序：</a>提供示例demo支持字段判断，参见“登录日志”功能
<br/><a href="#">参数校验：</a>Controller层统一做参数校验，包括：是否允许为空、字符串长度、数字范围、hash散列等
<br/><a href="#">数据缓存：</a>基于配置实现自定义缓存（内存、redis等），支持不同场景缓存时间不同，目前只改造完成了内存缓存，redis的后续改造
<br/><a href="#">主题皮肤：</a>SUI提供了4套皮肤，同时提供了基于主题颜色设置的的方式快速变更主题颜色
<br/><a href="#">后续计划：</a><span class="sui-text-danger">Q1：</span><span class="sui-text-info">@测试团队</span> 验证测试当前系统相关功能；<span class="sui-text-info">@各研发团队负责人</span> 查阅相关功能和代码，自己OR安排人员实战研发功能体验，提出完善意见；<span class="sui-text-danger">Q2:</span>试点项目推广；<span class="sui-text-danger">Q3：</span>全部推广
<br/><a href="#">总体架构：</a><img src="${ctx}/images/ztjg.png" alt="" width="600" height="300" />

</div>
</body>
</html>