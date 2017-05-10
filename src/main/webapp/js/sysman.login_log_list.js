var ms_vm = avalon.define({
	$id : 'ms_vm',
	tab_data_total_cnt : 0,
	tab_data_page_num : 1,
	tab_data_list : [],
	user_type_data_list : [],
	login_log : {},
	user_info : {}
});

function reset_search() {
	$('#s_key_words').val('');//不采用form.reset是避免placehoder丢失
	$('#s_start').val('');
	$('#s_end').val('');
	qry_data(1);
}

function init() {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(8, $('#menu_breadcrumb'));
	
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
	var url = ctx + '/log/selectLoginLogList.action?page_num='+page_num+'&page_req=' + page_req
	common_util.load_data(url, $('#form_search').serializeJsonObject(), function (result){
		$('#page_nav').pagination('updatePages', result.data.page_count, page_req);
		ms_vm.tab_data_total_cnt = result.data.total_cnt;
		ms_vm.tab_data_list = result.data.data_list;
		ms_vm.tab_data_page_num = (page_req-1) * page_num;
	});
}

function view(index) {
	var user_id=ms_vm.tab_data_list[index].user_id;
	var ticket=ms_vm.tab_data_list[index].ticket;
	//1.查询用户基本信息
	common_util.load_data(ctx+'/user/selectUserList.action', {user_id:user_id}, function (result){
		ms_vm.user_info = result.data.data_list[0];
		common_util.load_data(ctx+'/sso/selectUserTicketDetail.action', {log_ticket:ticket}, function (result){
			//2.查询用户登录日志
			ms_vm.login_log = result.data;
			$('#dlg_log_view').modal({width:900},'show');
		});
	});
}
