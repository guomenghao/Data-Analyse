var data_table = avalon.define({
    $id: 'data_table_controller',
    data_list:[]
});

function init(menu_func_id) {
	//构建菜单导航
	common_util.load_menu_breadcrumb(menu_func_id, $('#menu_breadcrumb'));
	
	//加载数据
	var user_limit_child_list = user_limit_util.get_user_limit_child_list(menu_func_id, 'WEB_MENU');
	data_table.data_list = user_limit_child_list;
}
