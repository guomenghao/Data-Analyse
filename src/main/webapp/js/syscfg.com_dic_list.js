var ms_vm = avalon.define({
	$id : 'ms_vm',
	tab_data_total_cnt : 0,
	tab_data_page_num : 1,
	tab_data_list : [],
	add_edit_view_type : 'add',
	add_edit_view_title : '新增',
	add_edit_view_data : {},
	tab_data_list_dic_item : []
});

function init() {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(10, $('#menu_breadcrumb'));
	
	//初始化分页信息
	common_util.init_pagination($('#page_nav'), function (num){
		qry_data(num);
	});
	
	//初始化CRUD区域
	init_add_edit_view_dic();
	
	//初始化CRUD区域
	init_add_edit_view_dic_item();
	
	//默认自动查询
	qry_data(1);
}

/**
 * 查询数据，将反馈结果更新表格
 * @returns
 */
function qry_data(page_req) {
	var page_num = common_util.smart_page_num();
	var url = ctx + '/dicitem/selectDicList.action?page_num='+page_num+'&page_req=' + page_req;
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

function init_add_edit_view_dic() {
	$('#form_add_edit_view_dic').validate({
		rules:{
			dic_code : {
				required: true,
				maxlength: 50
			},
			dic_text: {
				 required: true,
				 maxlength: 50
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view_dic').serializeJsonObject();
			 var url = ctx + '/dicitem/insertDic.action';
			 common_util.load_data(url, data_json, function (result){
				 qry_data(1);
				 common_util.show_toast(result.msg);
	     		 $('#dlg_add_edit_view_dic').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
	
	$('#dlg_add_edit_view_dic').on('shown', function(){
		$('#form_add_edit_view_dic').validate('hideError');
	});
}

/**
 * 初始化CRUD功能
 * @returns
 */
function init_add_edit_view_dic_item() {
	$('#form_add_edit_view_dic_item').validate({
		rules:{
			 item_code: {
				 required: true,
				 maxlength: 50
			 },
			 item_text: {
				 required: true,
				 maxlength: 50
			 },
			 order_id: {
				 required: true,
				 digits: true,
				 gt:0,
				 lt:99
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view_dic_item').serializeJsonObject();
			 var url = ctx + '/dicitem/insertDicItem.action';
			 common_util.load_data(url, data_json, function (result){
	     		qry_data_dic_item(ms_vm.add_edit_view_data.dic_code);
	     		qry_data(1);
	     		common_util.show_toast(result.msg);
	     		$('#dlg_add_edit_view_dic_item').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
	$('#dlg_add_edit_view_dic_item').on('shown', function(){
		$('#form_add_edit_view_dic_item').validate('hideError');
	});
}

function add() {
	ms_vm.add_edit_view_type = 'add';
	ms_vm.add_edit_view_title = '新增';
	
	ms_vm.add_edit_view_data = {"dic_code":"","dic_text":""};
	
	$('#dlg_add_edit_view_dic').modal({width:500},'show');
}

function del(index) {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/dicitem/delDic.action';
		var dic_code = ms_vm.tab_data_list[index].dic_code;
		common_util.load_data(url, {'dic_code':dic_code}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}

function show_dic_item_list_view(index) {
	var dic_code = ms_vm.tab_data_list[index].dic_code;
	var dic_text = ms_vm.tab_data_list[index].dic_text;
	ms_vm.add_edit_view_data = {"dic_code":dic_code,"dic_text":dic_text};
	qry_data_dic_item(dic_code);
	$('#dlg_dic_item_list_view').modal({width:600},'show');
}

function qry_data_dic_item(dic_code) {
	var url = ctx + '/dicitem/selectDicItemList.action';
	common_util.load_data(url, {dic_code:dic_code}, function (result){
		ms_vm.tab_data_list_dic_item = result.data.data_list;
	});
}

function add_dic_item() {
	ms_vm.add_edit_view_type = 'add';
	ms_vm.add_edit_view_title = '新增';
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {item_code:'',item_text:'',order_id:''});
	$('#dlg_add_edit_view_dic_item').modal('show');
}

function del_dic_item(index) {
	var dic_code = ms_vm.tab_data_list_dic_item[index].dic_code;
	var item_code = ms_vm.tab_data_list_dic_item[index].item_code;
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/dicitem/delDicItem.action';
		common_util.load_data(url, {dic_code:dic_code,item_code:item_code}, function (result){
			qry_data_dic_item(ms_vm.add_edit_view_data.dic_code);
			qry_data(1);
			common_util.show_toast(result.msg);
		});
	}
}