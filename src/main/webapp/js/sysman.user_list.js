var ms_vm = avalon.define({
	$id : 'ms_vm',
	tab_data_total_cnt : 0,
	tab_data_page_num : 1,
	tab_data_list : [],
	user_type_data_list : [],
	is_limited_function_id: function (menu_func_id) {
		return user_limit_util.is_limited(menu_func_id);
	},
});

function reset_search() {
	$('#s_key_words').val('');//不采用form.reset是避免placehoder丢失
	qry_data(1);
}

function init() {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(4, $('#menu_breadcrumb'));
	
	//初始化适用类型字典数据
	common_util.load_data(ctx + '/dicitem/selectDicItemList.action', {'dic_code':'USER_TYPE'}, function (result){
		ms_vm.user_type_data_list = result.data.data_list;
	});
	
	//初始化分页信息
	common_util.init_pagination($('#page_nav'), function (num){
		qry_data(num);
	});
	
	//默认自动查询
	qry_data(1);
}

/**
 * 查询数据，将反馈结果更新表格
 * @returns
 */
function qry_data(page_req) {
	var page_num = common_util.smart_page_num();
	var url = ctx + '/user/selectUserList.action?page_num='+page_num+'&page_req=' + page_req;
	common_util.load_data(url, $('#form_search').serializeJsonObject(), function (result){
		$('#page_nav').pagination('updatePages', result.data.page_count, page_req);
		ms_vm.tab_data_total_cnt = result.data.total_cnt;
		ms_vm.tab_data_list = result.data.data_list;
		ms_vm.tab_data_page_num = (page_req-1) * page_num;
	});
}

function add() {
	window.location = ctx + '/sysman/user_list_add_edit.jsp';
}
function del(user_id) {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/user/delUser.action';
		common_util.load_data(url, {user_id: user_id}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}
function edit(user_id) {
	window.location = ctx + '/sysman/user_list_add_edit.jsp?user_id=' + user_id;
}
function login_passwd_reset(user_id) {
	if(confirm('确认要重置该账号的登录密码？')) {
		common_util.load_data(ctx + '/user/loginPasswdReset.action', {user_id:user_id}, function (result){
			common_util.show_toast(result.msg);
		});
	}
}
function frozen(user_id){
	if(confirm('确认要冻结该用户？')) {
		var url = ctx + '/user/frozenUser.action';
		common_util.load_data(url, {user_id: user_id}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}
function un_frozen(user_id){
	if(confirm('确认要解冻该用户？')) {
		var url = ctx + '/user/unFrozenUser.action';
		common_util.load_data(url, {user_id: user_id}, function (result){
			common_util.show_toast(result.msg);
			qry_data(1);
		});
	}
}

