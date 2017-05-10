var ms_vm = avalon.define({
	$id : 'ms_vm',
	tab_data_total_cnt : 0,
	tab_data_page_num : 1,
	tab_data_list : [],
	add_edit_view_type : 'add',
	add_edit_view_title : '新增',
	add_edit_view_data : {},
	tab_data_list_param : []
});

function init() {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(27, $('#menu_breadcrumb'));
	
	//初始化分页信息
	common_util.init_pagination($('#page_nav'), function (num){
		qry_data(num);
	});
	
	//初始化CRUD区域
	init_add_edit_view_busi_service();
	
	//初始化CRUD区域
	init_add_edit_view_param();
	
	//默认自动查询
	qry_data(1);
}

/**
 * 查询数据，将反馈结果更新表格
 * @returns
 */
function qry_data(page_req) {
	var page_num = common_util.smart_page_num();
	var url = ctx + '/spv/selectBusiServiceList.action?page_num='+page_num+'&page_req=' + page_req;
	common_util.load_data(url, $('#form_search').serializeJsonObject(), function (result){
		$('#page_nav').pagination('updatePages', result.data.page_count, page_req);
		ms_vm.tab_data_total_cnt = result.data.total_cnt;
		ms_vm.tab_data_list = result.data.data_list;
		ms_vm.tab_data_page_num = (page_req-1) * page_num;
	});
}

function reset_qry() {
	$('#form_search')[0].reset();
	qry_data(1);
}

function init_add_edit_view_busi_service() {
	$('#form_add_edit_view_busi_service').validate({
		rules:{
			service_code : {
				required: true,
				maxlength: 50
			},
			service_name: {
				 required: true,
				 maxlength: 50
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view_busi_service').serializeJsonObject();
			 var url = ctx + '/spv/insertBusiService.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/spv/updateBusiService.action';
			 }
			 common_util.load_data(url, data_json, function (result){
				 qry_data(1);
				 common_util.show_toast(result.msg);
	     		 $('#dlg_add_edit_view_busi_service').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
	
	$('#dlg_add_edit_view_busi_service').on('shown', function(){
		$('#form_add_edit_view_busi_service').validate('hideError');
	});
}

/**
 * 初始化CRUD功能
 * @returns
 */
function init_add_edit_view_param() {
	$('#form_add_edit_view_param').validate({
		rules:{
			 param_code: {
				 required: true,
				 maxlength: 50
			 },
			 param_name: {
				 required: true,
				 maxlength: 50
			 },
			 allow_null: {
				 required: true
			 },
			 param_type: {
				 required: true
			 },
			 range_min: {
				 number: true,
				 maxlength: 10
			 },
			 range_max: {
				 number: true,
				 maxlength: 10
			 },
			 range_hash : {
				 maxlength: 200
			 },
			 reg_exp : {
				 maxlength: 50
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view_param').serializeJsonObject();
			 var url = ctx + '/spv/insertServiceParamValid.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/spv/updateServiceParamValid.action';
			 }
			 common_util.load_data(url, data_json, function (result){
	     		qry_data_param(ms_vm.add_edit_view_data.service_id);
	     		qry_data(1);
	     		common_util.show_toast(result.msg);
	     		$('#dlg_add_edit_view_param').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
	$('#dlg_add_edit_view_param').on('shown', function(){
		$('#form_add_edit_view_param').validate('hideError');
	});
}

function add() {
	ms_vm.add_edit_view_type = 'add';
	ms_vm.add_edit_view_title = '新增';
	
	ms_vm.add_edit_view_data = {"service_id":"","service_code":"","service_name":""};
	$('#dlg_add_edit_view_busi_service').modal({width:500},'show');
}

function edit(index) {
	var service_id = ms_vm.tab_data_list[index].service_id;
	var service_code = ms_vm.tab_data_list[index].service_code;
	var service_name = ms_vm.tab_data_list[index].service_name;
	ms_vm.add_edit_view_type = 'edit';
	ms_vm.add_edit_view_title = '编辑';
	
	ms_vm.add_edit_view_data = {"service_id":service_id,"service_code":service_code,"service_name":service_name};
	
	$('#dlg_add_edit_view_busi_service').modal({width:500},'show');
}
function del(service_id) {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/spv/delBusiService.action';
		common_util.load_data(url, {'service_id':service_id}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}

function show_param_list_view(index) {
	var service_id = ms_vm.tab_data_list[index].service_id;
	var service_code = ms_vm.tab_data_list[index].service_code;
	var service_name = ms_vm.tab_data_list[index].service_name;
	ms_vm.add_edit_view_data = {"service_id":service_id,"service_code":service_code,"service_name":service_name};
	qry_data_param(service_id);
	$('#dlg_param_list_view').modal({width:960,height:380},'show');
}

function qry_data_param(service_id) {
	var url = ctx + '/spv/selectServiceParamValidList.action';
	common_util.load_data(url, {'service_id':service_id}, function (result){
		ms_vm.tab_data_list_param = result.data.data_list;
	});
}

function add_param() {
	ms_vm.add_edit_view_type = 'add';
	ms_vm.add_edit_view_title = '新增';
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model,{param_id:'',param_code:'',param_name:'',allow_null:'N',param_type:'str',range_min:'',range_max:'',range_hash:'',reg_exp:''});
	$('#dlg_add_edit_view_param').modal({width:700},'show');
}

function edit_param(index) {
	ms_vm.add_edit_view_type = 'edit';
	ms_vm.add_edit_view_title = '编辑';
	
	//ms_vm.add_edit_view_data = ms_vm.tab_data_list_param[index];
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, ms_vm.tab_data_list_param[index].$model);
	
	if (ms_vm.add_edit_view_data.range_min == null) {
		ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {range_min:''});
	}
	if (ms_vm.add_edit_view_data.range_max == null) {
		ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {range_max:''});
	}
	if (ms_vm.add_edit_view_data.range_hash == null) {
		ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {range_hash:''});
	}
	if (ms_vm.add_edit_view_data.reg_exp == null) {
		ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {reg_exp:''});
	}
	
	$('#dlg_add_edit_view_param').modal({width:700},'show');
}

function del_param(param_id) {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/spv/delServiceParamValid.action';
		common_util.load_data(url, {'param_id':param_id}, function (result){
			qry_data_param(ms_vm.add_edit_view_data.service_id);
			qry_data(1);
			common_util.show_toast(result.msg);
		});
	}
}