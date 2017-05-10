<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/sysman.login_log_list.js"></script>
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
				<input type="hidden" id="order_by" name="order_by" value="b.login_date desc" />
				<table class="sui-table table-bordered table-sideheader">
					<tbody>
						<tr style="display: none;">
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
							<td width="100">登录日期</td>
							<td >
								<div data-toggle="datepicker" class="control-group input-daterange" style="margin-bottom: 0px;">
								    <div class="controls">
								      <input type="text" id="s_start" name="s_start" class="input-medium input-date"><span>-</span>
								      <input type="text" id="s_end" name="s_end" class="input-medium input-date">
								    </div>
							  	</div>
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
			      <th>用户姓名</th>
			      <th>所属区域</th>
			      <th>用户类型</th>
			      <th>终端类型</th>
			      <th class="sort" onclick="common_util.sort_qry(this,'b.os_type',qry_data)">操作系统</th>
			      <th class="sort" onclick="common_util.sort_qry(this,'b.login_ip',qry_data)">登录IP</th>
			      <th class="sort-desc" onclick="common_util.sort_qry(this,'b.login_date',qry_data)">登录时间</th>
			      <th width="40">操作</th>
			    </tr>
			  </thead>
			  <tbody>
			  	<tr ms-for="($index,el) in @tab_data_list">
			  		<td>{{$index + 1 + @tab_data_page_num}}</td>
			  		<td>{{el.user_name}}</td>
			  		<td>{{el.area_name}}</td>
			  		<td>{{el.user_type_text}}</td>
			  		<td>{{el.terminal_type_text}}</td>
			  		<td>{{el.os_type_text}}</td>
			  		<td>{{el.login_ip}}</td>
			  		<td>{{el.login_date}}</td>
			  		<td>
			  			<a ms-attr="{href:'javascript:view('+$index+');'}" class="sui-btn btn-small btn-link">详情</a>
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
<div id="dlg_log_view" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
			  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
			  <h4 id="myModalLabel" class="modal-title">详情</h4>
			</div>
			<div class="modal-body">
				<h3>用户信息</h3>
				<table class="sui-table table-vzebra">
                    <tbody>
                      <tr>
                        <td>用户标识</td>
                        <td>{{@user_info.user_id}}</td>
                        <td>用户姓名</td>
                        <td>{{@user_info.user_name}}</td>
                        <td>用户类型</td>
                        <td>{{@user_info.user_type_text}}</td>
                      </tr>
                      <tr>
                      	<td>所属区域</td>
                        <td>{{@user_info.area_name}}</td>
                        <td>登录账号</td>
                        <td>{{@user_info.login_acct}}</td>
                        <td>手机号码</td>
                        <td>{{@user_info.acc_nbr}}</td>
                      </tr>
                      <tr>
                      	<td>电子邮件</td>
                        <td colspan="5">{{@user_info.user_email}}</td>
                      </tr>
                    </tbody>
               </table>
               <h3>登录信息</h3>
				<table class="sui-table table-vzebra">
                    <tbody>
                   	  <tr>
                        <td>终端类型</td>
                        <td>{{@login_log.terminal_type_text}}</td>
                        <td>操作系统</td>
                        <td>{{@login_log.os_type_text}}</td>
                        <td>登录IP</td>
                        <td>{{@login_log.login_ip}}</td>
                      </tr>
                      <tr>
                        <td>ticket生效时间</td>
                        <td>{{@login_log.eff_date}}</td>
                        <td>ticket失效时间</td>
                        <td>{{@login_log.exp_date}}</td>
                        <td>登录时间</td>
                        <td>{{@login_log.login_date}}</td>
                      </tr>
                      <tr>
                      	<td>ticket</td>
                        <td colspan="5">{{@login_log.ticket}}</td>
                      </tr>
                      <tr>
                        <td>User-Agent</td>
                        <td colspan="5">
                        	<textarea rows="3" cols="110" ms-duplex="@login_log.user_agent"></textarea>
                        </td>
                      </tr>
                    </tbody>
               </table>
			</div>
			<div class="modal-footer">
	    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
			</div>
		</div>
	</div>
</div>
</body>
</html>