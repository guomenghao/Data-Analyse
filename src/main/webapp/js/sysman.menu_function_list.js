var ms_vm = avalon.define({
	$id : 'ms_vm',
	add_edit_view_type : 'edit',
	add_edit_view_title : '详情',
	add_edit_view_data : {},
	limit_type_data_list : [],
	from_system_data_list : []
});

var ztree_setting = {
	data: {
		simpleData: {
			enable: true
		}
	},
	callback:{
		onClick:click_tree_node
	}
};
var tree_data_list = [];

function init() {
	var total = document.documentElement.clientHeight;
	var colHeight = total-document.getElementById("left").offsetTop - 50;
	document.getElementById("left").style.height = colHeight+"px";
	
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(6, $('#menu_breadcrumb'));

	//初始化类型字典
	init_limit_type(null);
	
	//初始化来源字典
	init_from_system();
	
	//初始化菜单功能项树形数据
	qry_data_tree(null);
	
	//初始化CRUD
	init_add_edit_view();
}

function init_limit_type(limit_type) {
	var data_list = [{item_code:'WEB_MENU',item_text:'WEB菜单'},{item_code:'WEB_MENU_FUNCTION',item_text:'WEB菜单功能项'},{item_code:'MOB_APP',item_text:'移动端菜单'},{item_code:'MOB_APP_FUNCTION',item_text:'移动菜单功能项'}];
	if (limit_type == null) {
		ms_vm.limit_type_data_list = data_list;
	} else {
		var data_list_filter = [];
		var item_code_array = limit_type.split(',');
		for (var i=0; i<item_code_array.length; i++) {
			for (var j=0;j<data_list.length;j++) {
				if (item_code_array[i] == data_list[j].item_code) {
					data_list_filter[data_list_filter.length] = data_list[j];
					break;
				}
			}
		}
		ms_vm.limit_type_data_list = data_list_filter;
	}
}

function init_from_system() {
	common_util.load_data(ctx + '/dicitem/selectDicItemList.action', {dic_code:'FROM_SYSTEM'}, function (result){
		ms_vm.from_system_data_list = result.data.data_list;
	});
}

function qry_data_tree(default_select_menu_func_id) {
	common_util.load_data(ctx + '/menufunc/selectMenuFunctionList.action', {}, function (result){
		tree_data_list = format_to_znodes(result.data.data_list);
		$.fn.zTree.init($('#tree'), ztree_setting, tree_data_list);
		if (default_select_menu_func_id == null) {
			set_default_select(tree_data_list[0].menu_func_id);
		} else {
			set_default_select(default_select_menu_func_id);
		}
	});
}

function click_tree_node() {
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	set_add_edit_view(treeObj.getSelectedNodes()[0],'edit','详情')
}

function set_add_edit_view(data,type,title) {
	init_limit_type(data.limit_type);
	ms_vm.add_edit_view_data = data;
	ms_vm.add_edit_view_type = type;
	ms_vm.add_edit_view_title = title + ":" + data.menu_func_name;
	init_up_menu_func_list(data);
	
	$('#form_add_edit_view').validate('hideError');
}

function set_default_select(menu_func_id) {
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	var nodes = treeObj.getNodes();
	var flag = true;
	for (var i=0; i<nodes.length; i++) {
		if (menu_func_id == nodes[i].menu_func_id) {
			treeObj.selectNode(nodes[i]);
			set_add_edit_view(nodes[i],'edit','详情');
			flag = false;
			break;
		}
	}
	if (flag) {
		treeObj.selectNode(nodes[0]);
		set_add_edit_view(nodes[0],'edit','详情');
	}
}

function init_up_menu_func_list (node) {
	var limit_type = node.limit_type;
	if ('WEB_MENU_FUNCTION' == limit_type) {
		limit_type = 'WEB_MENU';
	} else if('MOB_APP_FUNCTION' == limit_type) {
		limit_type = 'MOB_APP';
	}
	var data_list = [];
	for (var i=0;i<tree_data_list.length;i++) {
		if (limit_type == tree_data_list[i].limit_type) {
			var id = tree_data_list[i].id;
			var pId = tree_data_list[i].pId;
			var name = tree_data_list[i].name;
			data_list[data_list.length] = {id:id, pId:pId, name: name};
		}
	}
	//排除自己和自己的下级递归
	var result_list = [];
	var child_list_connectby = tree_util.get_child_list_connectby(node.id, tree_data_list);
	child_list_connectby[child_list_connectby.length] = node;
	var result_list = tree_util.get_minus_list(data_list, child_list_connectby); 
	
	var p_node = tree_util.get_node(node.pId, data_list);
	if (p_node == null) {
		p_node = {id:'',name:'根目录', pId:''}
	}
	
	tree_util.build_select_tree_html('up_menu_func', p_node, result_list, true);
}

function format_to_znodes(data_list) {
	var zNodes = [];
	for (var i=0; i<data_list.length;i++) {
		var id = data_list[i].menu_func_id;
		var pId = data_list[i].up_menu_func_id;
		var name = data_list[i].menu_func_name;
		if (name.length > 10) {
			name = name.substr(0,10) + "...";
		}
		var open = false;
		if (user_limit_util.is_root_menu_func(pId)) {
			open = true;
		}
		if (data_list[i].order_id != null) {
			name = '['+data_list[i].order_id+']' + name;
		} else {
			name = '[-]' + name;
		}
		var limit_type = data_list[i].limit_type;
		var iconURL;
		if (user_limit_util.is_root_menu_func(pId)) {
			if ('WEB_MENU' == limit_type) {
				iconURL = ctx + "/images/menu-web.png";
			} else {
				iconURL = ctx + "/images/menu-mobile.png";
			}
		} else {
			if ('WEB_MENU' == limit_type) {
				iconURL = ctx + "/images/menu-web.png";
			} else if('MOB_APP' == limit_type) {
				iconURL = ctx + "/images/menu-mobile.png";
			} else {
				iconURL = ctx + "/images/menu-function.png";
			}
		}
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name,open:open,icon:iconURL}, data_list[i]);
	}
	return zNodes;
}


function add_node_sibling() {
	ms_vm.add_edit_view_type = 'add_node_sibling';
	ms_vm.add_edit_view_title = '新增同级节点';
	var up_menu_func_id = $('#up_menu_func_id').val();
	var limit_type = ms_vm.add_edit_view_data.limit_type;
	
	if ('WEB_MENU_FUNCTION' == limit_type) {
		init_limit_type('WEB_MENU_FUNCTION');
	} else if('MOB_APP_FUNCTION' == limit_type) {
		init_limit_type('MOB_APP_FUNCTION');
	} else {
		init_limit_type('WEB_MENU,MOB_APP');
	}
	
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {menu_func_id:'',limit_type:limit_type,menu_func_name:'',menu_func_desc:'',order_id:'',url_info:''});
	
	$('#form_add_edit_view').validate('hideError');
}


function add_node_child() {
	ms_vm.add_edit_view_type = 'add_node_child';
	ms_vm.add_edit_view_title = '新增下级节点';
	var up_menu_func_id = ms_vm.add_edit_view_data.menu_func_id;
	var up_menu_func_name = ms_vm.add_edit_view_data.menu_func_name;
	var limit_type = ms_vm.add_edit_view_data.limit_type;
	var new_limit_type = '';
	if ('WEB_MENU' == limit_type) {
		init_limit_type('WEB_MENU,WEB_MENU_FUNCTION');
		new_limit_type = 'WEB_MENU,WEB_MENU_FUNCTION';
	} else if('MOB_APP' == limit_type) {
		init_limit_type('MOB_APP,MOB_APP_FUNCTION');
		new_limit_type = 'MOB_APP,MOB_APP_FUNCTION';
	}
	common_util.select_common('up_menu_func', up_menu_func_id, up_menu_func_name);
	
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {menu_func_id:'',up_menu_func_id:up_menu_func_id,limit_type:new_limit_type,menu_func_name:'',menu_func_desc:'',order_id:'',url_info:''});
	
	$('#form_add_edit_view').validate('hideError');
}

/**
 * 初始化CRUD功能
 * @returns
 */
function init_add_edit_view() {
	$('#form_add_edit_view').validate({
		rules:{
			 menu_func_name: {
				 required: true,
				 maxlength: 30
			 },
			 url_info: {
				 required: true,
				 maxlength: 500
			 },
			 order_id : {
				 required: true,
				 digits : true,
				 gt : 0,
				 lt : 100
			 },
			 menu_func_desc : {
				 required: true,
				 maxlength: 100
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view').serializeJsonObject();
			 var url = ctx + '/menufunc/insertMenuFunction.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/menufunc/updateMenuFunction.action';
			 } 
			 common_util.load_data(url, data_json, function (result){
				//刷新树
				if('edit' == ms_vm.add_edit_view_type) {
					qry_data_tree(ms_vm.add_edit_view_data.menu_func_id);
				} else {
					qry_data_tree(null);
				}
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

function del() {
	if(confirm('确认要删除该条记录？')) {
		var url = ctx + '/menufunc/delMenuFunction.action';
		common_util.load_data(url, {'menu_func_id' : ms_vm.add_edit_view_data.menu_func_id}, function (result){
			common_util.show_toast(result.msg);
			//刷新树
			qry_data_tree(null);
		});
	}
}