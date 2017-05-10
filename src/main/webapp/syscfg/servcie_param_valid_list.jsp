<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/syscfg.service_param_valid_list.js"></script>
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
				<table width="100%" class="sui-table table-bordered table-sideheader">
					<tbody>
						<tr>
							<td width="100">模糊检索</td>
							<td>
								<div class="input-append">
			  						<input id="s_key_words" name="s_key_words" type="text" class="span2 input-xlarge" placeholder="请输入服务编码/服务名称..."/>
			  						<button type="button" class="sui-btn btn-primary" onclick="javascript:qry_data(1);">检索</button>
			  						<button type="button" class="sui-btn" onclick="javascript:reset_qry();">重置</button>
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
			      <th width="30">S/N</th>
			      <th width="400">service_code</th>
			      <th>service_name</th>
			      <th width="80">param_count</th>
			      <th width="80">操作</th>
			    </tr>
			  </thead>
			  <tbody>
		  		<tr ms-for="($index,el) in @tab_data_list">
		  			<td>{{$index + 1 + @tab_data_page_num}}</td>
		  			<td ms-attr="{title:el.service_code}">{{el.service_code}}</td>
		  			<td>{{el.service_name}}</td>
		  			<td style="text-align: center;"><a ms-attr="{href:'javascript:show_param_list_view('+$index+');'}">{{el.param_count}}</a></td>
		  			<td>
		  				<a ms-attr="{href:'javascript:edit('+$index+');'}" class="sui-btn btn-small btn-link">编辑</a>
			  			<a ms-attr="{href:'javascript:del('+el.service_id+');'}" class="sui-btn btn-small btn-link">删除</a>
		  			</td>
		  		</tr>
		  		<tr>
			  		<td colspan="5">
			  			共计<a class="sui-text-danger">{{@tab_data_total_cnt}}</a>条记录<span id="page_nav" style="display: inline-block; margin-left: 10px;"></span>
			  		</td>
			  	</tr>
			  </tbody>
			</table>
		</div>
	</div>
</div>
<div id="dlg_add_edit_view_busi_service" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_add_edit_view_busi_service" class="sui-form form-horizontal">
				<input type="hidden" id="service_id" name="service_id" ms-duplex="@add_edit_view_data.service_id"/>
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>service_code：</label>
						<div class="controls">
							<input type="text" id="service_code" name="service_code" ms-duplex="@add_edit_view_data.service_code" class="input-xlarge" placeholder="请输入服务编码..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>service_name：</label>
						<div class="controls">
							<input type="text" id="service_name" name="service_name" ms-duplex="@add_edit_view_data.service_name" class="input-xlarge" placeholder="请输入服务名称..." />
						</div>
					</div>
				</div>
				<div class="modal-footer">
				  	<button type="submit" class="sui-btn btn-primary">提交</button>
		    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
				</div>
			</form>
		</div>
	</div>
</div>

<div id="dlg_param_list_view" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_data.service_name}}:{{@add_edit_view_data.service_code}}</h4>
			</div>
			<div class="modal-body">
				<div class="input-append" style="float:right;margin-bottom: 10px;">
					<button data-toggle="modal" onclick="add_param();" data-keyboard="false" class="sui-btn btn-primary btn-lg">新增</button>
				</div>
				<table class="sui-table table-primary">
				  <thead>
				    <tr>
				      <th width="30">S/N</th>
				      <th>param_code</th>
				      <th>param_name</th>
				      <th>allow_null</th>
				      <th>param_type</th>
				      <th>range_min</th>
				      <th>range_max</th>
				      <th>range_hash</th>
				      <th>reg_exp</th>
				      <th width="80">操作</th>
				    </tr>
				  </thead>
				  <tbody>
				  	<tr ms-for="($index,el) in @tab_data_list_param">
				  		<td>{{$index + 1}}</td>
				  		<td ms-attr="{title:el.param_code}">{{el.param_code}}</td>
				  		<td ms-attr="{title:el.param_name}">{{el.param_name}}</td>
				  		<td>{{el.allow_null}}</td>
				  		<td>{{el.param_type}}</td>
				  		<td>{{el.range_min}}</td>
				  		<td>{{el.range_max}}</td>
				  		<td>{{el.range_hash}}</td>
				  		<td>{{el.reg_exp}}</td>
				  		<td>
				  			<a ms-attr="{href:'javascript:edit_param('+$index+');'}" class="sui-btn btn-small btn-link">编辑</a>
				  			<a ms-attr="{href:'javascript:del_param('+el.param_id+');'}" class="sui-btn btn-small btn-link">删除</a>
				  		</td>
				  	</tr>
				  	<tr>
			  		<td colspan="10">
			  			共计<a class="sui-text-danger">{{@tab_data_list_param.length}}</a>条记录
			  		</td>
			  	</tr>
				  </tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div id="dlg_add_edit_view_param" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_add_edit_view_param" class="sui-form form-horizontal">
				<input type="hidden" id="param_id" name="param_id" ms-attr="{value:@add_edit_view_data.param_id}" />
				<input type="hidden" id="service_id" name="service_id" ms-attr="{value:@add_edit_view_data.service_id}" />
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>param_code：</label>
						<div class="controls">
							<input type="text" id="param_code" name="param_code" ms-duplex="@add_edit_view_data.param_code" class="input-large" placeholder="请输入参数编码..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>param_name：</label>
						<div class="controls">
							<input type="text" id="param_name" name="param_name" ms-duplex="@add_edit_view_data.param_name" class="input-large" placeholder="请输入参数名称..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>allow_null：</label>
						<div class="controls">
							<label :class="[@add_edit_view_data.allow_null == 'Y' ? 'radio-pretty inline checked' : 'radio-pretty inline']">
								<input type="radio" id="allow_null" name="allow_null" ms-duplex-check="@add_edit_view_data.allow_null" value="Y"/><span>Y</span>
							</label>
							<label :class="[@add_edit_view_data.allow_null == 'N' ? 'radio-pretty inline checked' : 'radio-pretty inline']">
								<input type="radio" id="allow_null" name="allow_null" ms-duplex-check="@add_edit_view_data.allow_null" value="N"/><span>N</span>
							</label>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>param_type：</label>
						<div class="controls">
							<label :class="[@add_edit_view_data.param_type == 'str' ? 'radio-pretty inline checked' : 'radio-pretty inline']">
								<input type="radio" id="param_type" name="param_type" ms-duplex-check="@add_edit_view_data.param_type" value="str"/><span>str</span>
							</label>
							<label :class="[@add_edit_view_data.param_type == 'num' ? 'radio-pretty inline checked' : 'radio-pretty inline']">
								<input type="radio" id="param_type" name="param_type" ms-duplex-check="@add_edit_view_data.param_type" value="num"/><span>num</span>
							</label>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">range：</label>
						<div class="controls">
							<input type="text" id="range_min" name="range_min" ms-duplex="@add_edit_view_data.range_min" class="input-small" />
							-
							<input type="text" id="range_max" name="range_max" ms-duplex="@add_edit_view_data.range_max" class="input-small" />
							<div class="sui-msg msg-tips msg-naked">
					        	<div class="msg-con">提示：num 为数字大小范围，str为长度范围 </div>
						        <s class="msg-icon"></s>
						    </div>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">range_hash：</label>
						<div class="controls">
							<input type="text" id="range_hash" name="range_hash" ms-duplex="@add_edit_view_data.range_hash" class="input-xxlarge" placeholder="请输入范围hash，多个英文逗号分隔..."/>
						</div>
					</div>
					<div class="control-group">
						<label class="control-label">reg_exp：</label>
						<div class="controls">
							<input type="text" id="reg_exp" name="reg_exp" ms-duplex="@add_edit_view_data.reg_exp" class="input-xxlarge" placeholder="请输入正则表达式..."/>
						</div>
					</div>
				</div>
				<div class="modal-footer">
				  	<button type="submit" class="sui-btn btn-primary">提交</button>
		    		<button type="button" class="sui-btn" data-dismiss="modal">关闭</button>
				</div>
	       </form>
	    </div>
	 </div>
</div>
</body>
</html>