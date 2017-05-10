<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript" src="${ctx}/js/syscfg.com_dic_list.js"></script>
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
			  						<input id="s_key_words" name="s_key_words" type="text" class="span2 input-xlarge" placeholder="请输入字典编码/字典名称..."/>
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
			      <th width="300">dic_code</th>
			      <th>dic_text</th>
			      <th width="100">dic_item_count</th>
			      <th width="40">操作</th>
			    </tr>
			  </thead>
			  <tbody>
		  		<tr ms-for="($index,el) in @tab_data_list">
		  			<td>{{$index + 1 + @tab_data_page_num}}</td>
		  			<td ms-attr="{title:el.service_code}">{{el.dic_code}}</td>
		  			<td>{{el.dic_text}}</td>
		  			<td style="text-align: center;"><a ms-attr="{href:'javascript:show_dic_item_list_view('+$index+');'}">{{el.dic_item_count}}</a></td>
		  			<td>
			  			<a ms-attr="{href:'javascript:del('+$index+');'}" class="sui-btn btn-small btn-link">删除</a>
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
<div id="dlg_add_edit_view_dic" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_add_edit_view_dic" class="sui-form form-horizontal">
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>dic_code：</label>
						<div class="controls">
							<input type="text" id="dic_code" name="dic_code" ms-duplex="@add_edit_view_data.dic_code" class="input-xlarge" placeholder="请输入字典编码..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>dic_text：</label>
						<div class="controls">
							<input type="text" id="dic_text" name="dic_text" ms-duplex="@add_edit_view_data.dic_text" class="input-xlarge" placeholder="请输入字典名称..." />
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
<div id="dlg_dic_item_list_view" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">字典项信息</h4>
			</div>
			<div class="modal-body">
				<table width="100%">
					<tbody>
						<tr>
							<td width="100">dic_code:</td>
							<td>{{@add_edit_view_data.dic_code}}</td>
						</tr>
						<tr>
							<td>dic_text:</td>
							<td>{{@add_edit_view_data.dic_text}}</td>
						</tr>
						<tr>
							<td colspan="2">
								<div class="input-append" style="float:right">
		  							<button data-toggle="modal" onclick="add_dic_item();" data-keyboard="false" class="sui-btn btn-primary btn-lg">新增</button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
				<table class="sui-table table-primary">
				  <thead>
				    <tr>
				      <th width="30">S/N</th>
				      <th width="200">item_code</th>
				      <th>item_text</th>
				      <th width="40">操作</th>
				    </tr>
				  </thead>
				  <tbody>
				  	<tr ms-for="($index,el) in @tab_data_list_dic_item">
				  		<td>{{$index + 1}}</td>
				  		<td>{{el.item_code}}</td>
				  		<td>{{el.item_text}}</td>
				  		<td>
				  			<a ms-attr="{href:'javascript:del_dic_item('+$index+');'}" class="sui-btn btn-small btn-link">删除</a>
				  		</td>
				  	</tr>
				  	<tr>
			  		<td colspan="4">
			  			共计<a class="sui-text-danger">{{@tab_data_list_dic_item.length}}</a>条记录
			  		</td>
			  	</tr>
				  </tbody>
				</table>
			</div>
		</div>
	</div>
</div>
<div id="dlg_add_edit_view_dic_item" tabindex="-1" role="dialog" data-hasfoot="false" class="sui-modal hide fade">
	<div class="modal-dialog">
		<div class="modal-content">
			<form id="form_add_edit_view_dic_item" class="sui-form form-horizontal">
				<input type="hidden" id="dic_code" name="dic_code" ms-duplex="@add_edit_view_data.dic_code" />
				<div class="modal-header">
				  <button type="button" data-dismiss="modal" aria-hidden="true" class="sui-close">x</button>
				  <h4 id="myModalLabel" class="modal-title">{{@add_edit_view_title}}</h4>
				</div>
				<div class="modal-body">
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>item_code：</label>
						<div class="controls">
							<input type="text" id="item_code" name="item_code" ms-duplex="@add_edit_view_data.item_code" class="input-large" placeholder="请输入字典项编码..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>item_text：</label>
						<div class="controls">
							<input type="text" id="item_text" name="item_text" ms-duplex="@add_edit_view_data.item_text" class="input-large" placeholder="请输入字典项名称..." />
						</div>
					</div>
					<div class="control-group">
						<label class="control-label"><b style="color: #f00;">*</b>order_id：</label>
						<div class="controls">
							<input type="text" id="order_id" name="order_id" ms-duplex="@add_edit_view_data.order_id" class="input-medium" placeholder="请输入排序数字..." />
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