<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/sysman.user_list.js"></script>
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
				<table class="sui-table table-bordered table-sideheader">
					<tbody>
						<tr>
							<td width="100">用户类型</td>
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
			  						<input id="s_key_words" name="s_key_words" type="text" class="span2 input-xxlarge" placeholder="请输入区域名称/用户姓名/登录账号/手机号码/电子邮件/模糊检索..."/>
			  						<button id="btn_qry" type="button" class="sui-btn btn-primary" onclick="qry_data(1);">检索</button>
			  						<button type="button" class="sui-btn" onclick="reset_search();">重置</button>
								</div>
								<div class="input-append" style="float:right">
		  							<button data-toggle="modal" onclick="add();" data-keyboard="false" class="sui-btn btn-primary btn-lg">新增</button>
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
			      <th width="60">用户标识</th>
			      <th>用户姓名</th>
			      <th>所属区域</th>
			      <th>用户类型</th>
			      <th>登录账号</th>
			      <th>手机号码</th>
			      <th>电子邮件</th>
			      <th width="170">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<tr ms-for="($index,el) in @tab_data_list">
			  		<td>{{$index + 1 + @tab_data_page_num}}</td>
			  		<td>{{el.user_id}}</td>
			  		<td>{{el.user_name}}</td>
			  		<td>{{el.area_name}}</td>
			  		<td>{{el.user_type_text}}</td>
			  		<td>{{el.login_acct}}</td>
			  		<td>{{el.acc_nbr}}</td>
			  		<td>{{el.user_email}}</td>
			  		<td>
			  			<a ms-attr="{href:'javascript:edit('+el.user_id+');'}" class="sui-btn btn-small btn-link">编辑</a>
			  			<a ms-attr="{href:el.user_id !=1 ? 'javascript:del('+el.user_id+');' : 'javascript:void(0);'}" :class="el.user_id !=1 ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">删除</a>
			  			<a ms-attr="{href:'javascript:login_passwd_reset('+el.user_id+');'}" class="sui-btn btn-small btn-link">密码重置</a>
						<a ms-attr="{href:@is_limited_function_id(95) ? (el.state=='10A' ? 'javascript:frozen('+el.user_id+');':'javascript:un_frozen('+el.user_id+');') : 'javascript:void(0);'}" :class="@is_limited_function_id(95) ? 'sui-btn btn-small btn-link' : 'sui-btn btn-small disabled btn-link'">{{el.state=='10D' ? '解冻':'冻结'}}</a>
			  		</td>
			  	</tr>
			  	<tr>
			  		<td colspan="9">
			  			共计<a class="sui-text-danger">{{@tab_data_total_cnt}}</a>条记录<span id="page_nav" style="display: inline-block; margin-left: 10px;"></span>
			  		</td>
			  	</tr>
			  </tbody>
			</table>
		</div>
	</div>
</div>
</body>
</html>