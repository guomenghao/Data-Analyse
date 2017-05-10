var ms_vm = avalon.define({
	$id : 'ms_vm',
	tab_data_total_cnt : 0,
	tab_data_page_num : 1,
	tab_data_list : [],
	add_edit_view_type : 'add',
	add_edit_view_title : '新增',
	add_edit_view_show_submit : true,
	add_edit_view_data : {},
	is_limited_function_id: function (menu_func_id) {
		console.log(user_limit_util.is_limited(menu_func_id))
		return user_limit_util.is_limited(menu_func_id);
	},
	user_type_data_list : [],
	role_limit:{}
});

var ztree_setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	check: {
		enable: true,
		chkboxType : { "Y" : "ps", "N" : "s" }
	}
};

function reset_search() {
	//$('#form_search')[0].reset();
	$('#s_key_words').val('');//不采用form.reset是避免placehoder丢失
	qry_data(1);
}

function init() {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(3, $('#menu_breadcrumb'));
	
	//初始化适用类型字典数据
	common_util.load_data(ctx + '/dicitem/selectDicItemList.action', {'dic_code':'USER_TYPE'}, function (result){
		ms_vm.user_type_data_list = result.data.data_list;
	});
	
	//初始化分页信息
	common_util.init_pagination($('#page_nav'), function (num){
		qry_data(num);
	});
	
	//初始化CRUD区域
	init_add_edit_view();
	
	//初始化CRUD区域
	init_role_limit();
	
	//默认自动查询
	qry_data(1);
}

/**
 * 查询数据，将反馈结果更新表格
 * @returns
 */
function qry_data(page_req) {
	var page_num = common_util.smart_page_num();
	var url = ctx + '/role/selectRoleList.action?page_num='+page_num+'&page_req=' + page_req;
	common_util.load_data(url, $('#form_search').serializeJsonObject(), function (result){
		$('#page_nav').pagination('updatePages', result.data.page_count, page_req);
		ms_vm.tab_data_total_cnt = result.data.total_cnt;
		ms_vm.tab_data_list = result.data.data_list;
		ms_vm.tab_data_page_num = (page_req-1) * page_num;
	});
}

/**
 * 初始化CRUD功能
 * @returns
 */
function init_add_edit_view() {
	$('#form_add_edit_view').validate({
		rules:{
			user_type: {
				 required: true
			 },
			 role_name: {
				 required: true,
				 maxlength: 20
			 },
			 role_desc: {
				 required: true,
				 maxlength: 50
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view').serializeJsonObject();
			 var url = ctx + '/role/insertRole.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/role/updateRole.action';
			 }
			 common_util.load_data(url, data_json, function (result){
	     		qry_data(1);
	     		common_util.show_toast(result.msg);
	     		$('#dlg_add_edit_view').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
	$('#dlg_add_edit_view').on('shown', function(){
		$('#form_add_edit_view').validate('hideError');
	});
}

function init_role_limit() {
	$('#form_role_limit').validate({
		 success: function() {
			 var treeObj = $.fn.zTree.getZTreeObj("tree");
			 var nodes = treeObj.getCheckedNodes(true);
			 var limit_ids = '';
			 for (var i=0; i<nodes.length;i++) {
				 if (limit_ids == '') {
					 limit_ids = nodes[i].limit_id;
				 } else {
					 limit_ids += ',' + nodes[i].limit_id;
				 }
			 }
			 var url = ctx + '/role/updateRoleLimit.action';
			 common_util.load_data(url, {limit_ids:limit_ids,role_id:ms_vm.role_limit.role_id}, function (result){
	     		common_util.show_toast(result.msg);
	     		$('#dlg_role_limit').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
	});
}

function del(role_id) {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/role/delRole.action';
		common_util.load_data(url, {'role_id' : role_id}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}

function add() {
	ms_vm.add_edit_view_type = 'add';
	ms_vm.add_edit_view_title = '新增';
	ms_vm.add_edit_view_show_submit = true;
	
	var user_type = $("input[name='s_user_type']:checked").val();
	if (user_type == '') {
		user_type = '02';
	}
	
	ms_vm.add_edit_view_data = {"role_id":"", "user_type":user_type, "role_name":"", "role_desc":""};
	
	$('#dlg_add_edit_view').modal('show');
}

function edit(role_id) {
	ms_vm.add_edit_view_type = 'edit';
	ms_vm.add_edit_view_title = '编辑';
	ms_vm.add_edit_view_show_submit = true;
	
	var url = ctx + '/role/selectRoleDetail.action';
	common_util.load_data(url, {'role_id':role_id}, function (result){
		ms_vm.add_edit_view_data = result.data;
		$('#dlg_add_edit_view').modal('show');
	});
}

function view(role_id) {
	ms_vm.add_edit_view_type = 'view';
	ms_vm.add_edit_view_title = '查看';
	ms_vm.add_edit_view_show_submit = false;
	
	var url = ctx + '/role/selectRoleDetail.action';
	common_util.load_data(url, {'role_id':role_id}, function (result){
		ms_vm.add_edit_view_data = result.data;
		$('#dlg_add_edit_view').modal('show');
	});
}

function limit(index) {
	var role_id = ms_vm.tab_data_list[index].role_id;
	var role_name = ms_vm.tab_data_list[index].role_name;
	ms_vm.role_limit = {role_id:role_id,role_name:role_name};
	
	common_util.load_data(ctx + '/menufunc/selectMenuFunctionList.action', {}, function (result){
		var data_list_all = result.data.data_list;
		common_util.load_data(ctx + '/role/selectRoleLimitList.action', {role_id:role_id}, function (result){
			var data_list_this = result.data.data_list;
			build_tree(data_list_all, data_list_this);
			$('#dlg_role_limit').modal({width:600,height:380},'show');
		});
	});
}

function build_tree(data_list_all, data_list_this) {
	var zNodes = [];
	for (var i=0; i<data_list_all.length;i++) {
		var id = data_list_all[i].menu_func_id;
		var pId = data_list_all[i].up_menu_func_id;
		var name = data_list_all[i].menu_func_name;
		var checked = false;
		for (var j=0; j<data_list_this.length;j++) {
			if (id == data_list_this[j].menu_func_id) {
				checked = true;
				break;
			}
		}
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name,open:true,checked:checked}, data_list_all[i]);
	}
	$.fn.zTree.init($('#tree'), ztree_setting, zNodes);
}
