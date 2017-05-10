/**
 * 1.获取登录者可以访问的web菜单信息，构建web菜单导航
 * 2.打开默认首页
 */
function init() {
	//构建菜单信息
	build_menu_nav();
	
	//添加iframe自适应高度事件
	window.onresize=function(){  
	    changeFrameHeight();  
	} 
	
	changeFrameHeight();
	
	open_url(ctx + '/home/index_home.jsp?ticket='+ticket, 'SYSMAN', '1');
}
/**
 * @note iframe_content 高度自适应
 */
function changeFrameHeight(){
    var iframe_content= $('#iframe_content');
    $('#iframe_content').attr('height', document.documentElement.clientHeight-72);
};
/**
 * @note 打开菜单页面，添加菜单访问日志
 * @param url_info
 * @param from_system
 * @param menu_func_id
 */
function open_url(url_info, from_system, menu_func_id) {
	common_util.add_menu_func_log(menu_func_id);
	
	$('#iframe_content').attr('src', url_info);
}

/**
 * 根据web菜单数据data_list，构建web菜单导航
 */
function build_menu_nav() {
	var data_list = user_limit_util.get_user_limit_root_list();
	
	var menu_nav_str = '';
	for (var i=0; i<data_list.length; i++) {
		var menu_func_id = data_list[i].menu_func_id;
		var child_menu_list = user_limit_util.get_user_limit_child_list(menu_func_id, 'WEB_MENU');
		if (child_menu_list.length == 0) {
			var href = "javascript:open_url('" + data_list[i].url_info + "','"+data_list[i].from_system+"','"+menu_func_id+"');";
			menu_nav_str += '<li><a href="' + href + '">' + data_list[i].menu_func_name + '</a></li>';
		} else {
			var href = "javascript:void(0);";
			menu_nav_str += '<li class="sui-dropdown"><a href="' + href + '" data-toggle="dropdown" class="dropdown-toggle">' + data_list[i].menu_func_name + '<i class="caret"></i></a>';
			menu_nav_str += '<ul role="menu" class="sui-dropdown-menu">'+get_menu_list_html(child_menu_list, data_list)+'</ul>';
			menu_nav_str += '</li>';
		}
	}
	$('#menu_nav').append(menu_nav_str);
}
/**
 * 
 * @param menu_list 
 * @param data_list
 * @returns 根据指定的web菜单数据data_list构建html
 */
function get_menu_list_html(menu_list, data_list) {
	var menu_nav_str = '';
	
	for (var i=0; i<menu_list.length; i++) {
		var menu_func_id = menu_list[i].menu_func_id;
		var child_menu_list = user_limit_util.get_user_limit_child_list(menu_func_id, 'WEB_MENU');
		if (child_menu_list.length == 0) {
			var href = "javascript:open_url('" + menu_list[i].url_info + "','"+menu_list[i].from_system+"','"+menu_func_id+"');";
			menu_nav_str += '<li role="presentation"><a role="menuitem" tabindex="-1" href="' + href + '">' + menu_list[i].menu_func_name + '</a></li>';
		} else {
			var href = "javascript:void(0);";
			menu_nav_str += '<li role="presentation" class="dropdown-submenu"><a role="menuitem" tabindex="-1" href="' + href + '">' + menu_list[i].menu_func_name + '<i class="sui-icon icon-angle-right pull-right"></i></a>';
			menu_nav_str += '<ul role="menu" class="sui-dropdown-menu">' + get_menu_list_html(child_menu_list, data_list) + '</ul>';	
			menu_nav_str += '</li>';
		}
	}
	return menu_nav_str;
}

function loginout() {
	common_util.load_data(ctx + '/sso/loginout.action?ticket='+ticket,{},function (result){
		window.location = ctx + '/login.jsp';
	});
}