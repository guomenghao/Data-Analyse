var ms_vm = avalon.define({
	$id : 'ms_vm',
	add_edit_view_type : 'edit',
	add_edit_view_title : '详情',
	add_edit_view_data : {area_name:'',area_desc:'',center_longitude:'',center_latitude:''}
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
	common_util.load_menu_breadcrumb(7, $('#menu_breadcrumb'));
	
	//初始化菜单功能项树形数据
	qry_data_tree(null);
	
	//初始化CRUD
	init_add_edit_view();
}

function qry_data_tree(default_select_id) {
	common_util.load_data(ctx + '/area/selectAreaList.action', {}, function (result){
		tree_data_list = format_to_znodes(result.data.data_list);
		$.fn.zTree.init($('#tree'), ztree_setting, tree_data_list);
		if (default_select_id == null) {
			set_default_select(tree_data_list[0].id);
		} else {
			set_default_select(default_select_id);
		}
	});
}

function click_tree_node() {
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	set_add_edit_view(treeObj.getSelectedNodes()[0],'edit','详情')
}

function set_default_select(default_select_id) {
	var treeObj = $.fn.zTree.getZTreeObj("tree");
	var nodes = treeObj.getNodes();
	var flag = true;
	for (var i=0; i<nodes.length; i++) {
		if (default_select_id == nodes[i].id) {
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

function set_add_edit_view(data,type,title) {
	ms_vm.add_edit_view_data = data;
	ms_vm.add_edit_view_type = type;
	ms_vm.add_edit_view_title = title + ":" + data.area_name;
	init_up_data_list(data);
	
	$('#form_add_edit_view').validate('hideError');
}

function init_up_data_list (node) {
	var data_list = [];
	for (var i=0;i<tree_data_list.length;i++) {
		var id = tree_data_list[i].id;
		var pId = tree_data_list[i].pId;
		var name = tree_data_list[i].name;
		data_list[data_list.length] = {id:id, pId:pId, name: name};
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
	
	tree_util.build_select_tree_html('up_area',p_node, result_list, true);
}

function format_to_znodes(data_list) {
	var zNodes = [];
	for (var i=0; i<data_list.length;i++) {
		var id = data_list[i].area_id;
		var pId = data_list[i].up_area_id;
		var name = data_list[i].area_name;
		if(name.length>10) {
			name=name.substr(0,10) + "...";
		}
		var open = false;
		if (data_list[i].level_code < 2) {
			open = true;
		}
		if(data_list[i].area_desc == null) {
			data_list[i].area_desc = '';
		}
		if(data_list[i].center_longitude == null) {
			data_list[i].center_longitude = '';
		}
		if(data_list[i].center_latitude == null) {
			data_list[i].center_latitude = '';
		}
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name,open:open}, data_list[i]);
	}
	return zNodes;
}


function add_node_sibling() {
	ms_vm.add_edit_view_type = 'add_node_sibling';
	ms_vm.add_edit_view_title = '新增同级节点';
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {area_id:'',area_name:'',area_desc:'',center_longitude:'',center_latitude:''});
	$('#form_add_edit_view').validate('hideError');
}


function add_node_child() {
	ms_vm.add_edit_view_type = 'add_node_child';
	ms_vm.add_edit_view_title = '新增下级节点';
	var pId = ms_vm.add_edit_view_data.id;
	var pName = ms_vm.add_edit_view_data.name;
	common_util.select_common('up_area', pId, pName);
	
	ms_vm.add_edit_view_data = common_util.json_concat(ms_vm.add_edit_view_data.$model, {area_id:'',up_area_id:pId,area_name:'',area_desc:'',center_longitude:'',center_latitude:''});
	
	$('#form_add_edit_view').validate('hideError');
}

/**
 * 初始化CRUD功能
 * @returns
 */
function init_add_edit_view() {
	$('#form_add_edit_view').validate({
		rules:{
			 area_name: {
				 required: true,
				 maxlength: 30
			 },
			 area_desc : {
				 required: true,
				 maxlength: 100
			 },
			 center_longitude : {
				 number : true,
				 maxlength: 15
			 },
			 center_latitude : {
				 number : true,
				 maxlength: 15
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view').serializeJsonObject();
			 var url = ctx + '/area/insertArea.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/area/updateArea.action';
			 } 
			 common_util.load_data(url, data_json, function (result){
				//刷新树
				if('edit' == ms_vm.add_edit_view_type) {
					qry_data_tree(ms_vm.add_edit_view_data.area_id);
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
		var url = ctx + '/area/delArea.action';
		common_util.load_data(url, {area_id : ms_vm.add_edit_view_data.area_id}, function (result){
			common_util.show_toast(result.msg);
			//刷新树
			qry_data_tree(null);
		});
	}
}