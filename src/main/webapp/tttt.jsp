<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
<%@include file="/common/common.jsp" %>
<script type="text/javascript">
$(function(){
	init();
});

var ms_vm = avalon.define({
	$id: 'ms_vm',
	add_edit_view_data: {},
	limit_type_data_list:[]
});

function init() {
	ms_vm.limit_type_data_list=[{item_code:'123',item_text:'123T'},{item_code:'456',item_text:'456T'}];
	ms_vm.add_edit_view_data = {'limit_type':'123'};
}

function do_sth() {
	ms_vm.limit_type_data_list=[{item_code:'789',item_text:'789T'}];
	ms_vm.add_edit_view_data = {'limit_type':'789'};
	
}

</script>
</head>
<body ms-controller="ms_vm">
<br/>
<button onclick="do_sth()"> test</button>
<br/><br/>
<label data-toggle="radio" :class="[@add_edit_view_data.limit_type==el.item_code ? 'radio-pretty inline checked':'radio-pretty inline']" ms-for="($index, el) in @limit_type_data_list">
	<input type="radio" id="limit_type" name="limit_type" ms-attr="{value:el.item_code}" ms-duplex="@add_edit_view_data.limit_type"/><span>{{el.item_text}}</span>
</label>
</body>
</html>