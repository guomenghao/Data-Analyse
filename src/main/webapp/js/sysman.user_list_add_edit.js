var ms_vm = avalon.define({
	$id : 'ms_vm',
	user_type_data_list : [],
	role_data_list : [],
	add_edit_view_data : {user_id:'',user_type:'',user_name:'',login_acct:'',acc_nbr:'',user_email:'',area_id:''},
	add_edit_view_type : 'add',
	user_job_data_list: [],
	user_role_data_list: [],
	current_step:1,
	add_edit_submit_type:'add',
});

var tree_data_list_area = [];
var tree_data_list_func_all = [];
var tree_data_list_func_role = [];

function init(user_id) {
	//初始化构建菜单导航
	common_util.load_menu_breadcrumb(4, $('#menu_breadcrumb'));
	
	common_util.load_data(ctx + '/area/selectAreaList.action', {dic_code:'USER_TYPE'}, function (result){
		tree_data_list_area = format_to_znodes_area(result.data.data_list);
		
		common_util.load_data(ctx + '/dicitem/selectDicItemList.action', {dic_code:'USER_TYPE'}, function (result){
			ms_vm.user_type_data_list = result.data.data_list;
			
			common_util.load_data(ctx + '/role/selectRoleList.action', {page_req:1,page_num:1000}, function (result){
				ms_vm.role_data_list = result.data.data_list;
				
				if (user_id == '') {
					//add
					ms_vm.add_edit_view_type = 'add';
					ms_vm.add_edit_view_data.user_type = '01';
					var node_area = tree_data_list_area[0];
					tree_util.build_select_tree_html('area', node_area, tree_data_list_area, false);
				} else {
					//edit
					ms_vm.add_edit_view_type = 'edit';
					ms_vm.add_edit_submit_type = 'edit';
					qry_data_user_detail(user_id);
					qry_data_user_role_list(user_id);
				}
			});
		});
	});
	
	init_add_edit_view();
	
	init_user_job_view();
}

function qry_data_bss_org_tree(area_id) {
	common_util.load_data(ctx + '/bssorg/selectBssOrgList.action', {area_id:area_id}, function (result){
		var tree_data_list_bss_org = format_to_znodes_bss_org(result.data.data_list);
		if(tree_data_list_bss_org.length == 0) {
			common_util.show_toast('该用户所属区域下暂无组织机构信息，请核实!', true);
			return;
		}
		var ztree_setting = {
				data: {
					simpleData: {
						enable: true
					}
				}
			};
		$.fn.zTree.init($('#tree'), ztree_setting, tree_data_list_bss_org);
	});
}
function format_to_znodes_bss_org(data_list) {
	var zNodes = [];
	for (var i=0; i<data_list.length;i++) {
		var id = data_list[i].bss_org_id;
		var pId = data_list[i].up_bss_org_id;
		var name = data_list[i].bss_org_name;
		var open = false;
		if (data_list[i].level_code < 2) {
			open = true;
		}
		if(data_list[i].bss_org_desc == null) {
			data_list[i].bss_org_desc = '';
		}
		
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name,open:open}, data_list[i]);
	}
	return zNodes;
}

function qry_data_user_detail(user_id) {
	common_util.load_data(ctx + '/user/selectUserList.action', {user_id:user_id}, function (result){
		ms_vm.add_edit_view_data = result.data.data_list[0];
		if (ms_vm.add_edit_view_data.user_email == null) {
			ms_vm.add_edit_view_data.user_email = '';
		}
		var node_area = tree_util.get_node(ms_vm.add_edit_view_data.area_id, tree_data_list_area);
		tree_util.build_select_tree_html('area', node_area, tree_data_list_area, false);
	});
}

function qry_data_user_role_list(user_id) {
	common_util.load_data(ctx + '/user/selectUserRoleList.action', {user_id:user_id}, function (result){
		var user_role_data_list = result.data.data_list;
		for (var i=0;i<user_role_data_list.length;i++) {
			var $checkbox = $("#chk_" + user_role_data_list[i].role_id).checkbox();
			$checkbox.checkbox("check");
		}
		ms_vm.user_role_data_list = user_role_data_list;
	});
}

function init_user_job(){
	common_util.load_data(ctx + '/user/selectUserJobList.action', {user_id:ms_vm.add_edit_view_data.user_id}, function (result){
		ms_vm.user_job_data_list = result.data.data_list;
	});
}

function init_user_job_view() {
	$('#form_user_job').validate({
		rules:{
			role_id: {
				 required: true
			 }
		 },
		 success: function() {
			 var treeObj = $.fn.zTree.getZTreeObj("tree");
			 if (treeObj == null) {
				 common_util.show_toast('请选择任职机构',true);
				 return false;
			 }
			 var nodes = treeObj.getSelectedNodes();
			 if (nodes.length == 0) {
				 common_util.show_toast('请选择任职机构',true);
				 return false;
			 } 
			 var data_json = $('#form_user_job').serializeJsonObject();
			 data_json = common_util.json_concat(data_json, {bss_org_id:nodes[0].id})
			 var url = ctx + '/user/insertUserJob.action';
			 common_util.load_data(url, data_json, function (result){
	     		common_util.show_toast(result.msg);
	     		init_user_job();
	     		$('#dlg_user_job').modal('hide');
	     	 });
	     	 
	      	return false;
	     }
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
			 user_name: {
				 required: true,
				 maxlength: 30
			 },
			 login_acct: {
				 required: true,
				 maxlength: 20
			 },
			 acc_nbr: {
				 required: true,
				 mobile: true,
				 maxlength:11
			 },
			 user_email: {
				 email: true,
				 maxlength: 50
			 },
			 role_ids: {
				 required: true
			 }
		 },
		 success: function() {
			 var data_json = $('#form_add_edit_view').serializeJsonObject();
			 var url = ctx + '/user/insertUser.action';
			 if ('edit' == ms_vm.add_edit_view_type) {
				 url = ctx + '/user/updateUser.action';
			 }
			 common_util.load_data(url, data_json, function (result){
	     		common_util.show_toast(result.msg);
	     		if ('add' == ms_vm.add_edit_view_type) {
	     			ms_vm.add_edit_submit_type = 'add';
					//自动跳转到第二步去
	     			//user_id需要去获取一下，根据手机号码或者登录账号就可以获取到
	     			common_util.load_data(ctx + '/user/selectUserList.action', {login_acct:data_json.login_acct}, function (result){
	     				ms_vm.add_edit_view_data = result.data.data_list[0];
	     				data_json.user_id = ms_vm.add_edit_view_data.user_id;
	     				if (ms_vm.add_edit_view_data.user_email == null) {
	     					ms_vm.add_edit_view_data.user_email = '';
	     				}
	     				ms_vm.add_edit_view_type = 'edit';
	     				qry_data_user_role_list(data_json.user_id);
	     				common_util.load_data(ctx + '/user/selectUserRoleList.action', {user_id:ms_vm.add_edit_view_data.user_id}, function (result){
	     					ms_vm.user_role_data_list = result.data.data_list;
	     					goto_step(2);
	     				});
	     			});
				} else {
					ms_vm.add_edit_submit_type = 'edit';
					qry_data_user_role_list(data_json.user_id);
				}
	     		//特殊处理，因为下拉树没有做mvvm绑定
	     		ms_vm.add_edit_view_data.area_id=$('#area_id').val();
	     	 });
	     	 
	      	return false;
	     },
	});
}
function add() {
	qry_data_bss_org_tree(ms_vm.add_edit_view_data.area_id);
	$('#dlg_user_job').modal({width:600,height:400},'show');
}
function edit(index) {
	
}
function del(index) {
	var user_job_data = ms_vm.user_job_data_list[index];
	var url = ctx + '/user/delUserJob.action';
	common_util.load_data(url, {user_id:user_job_data.user_id,bss_org_id:user_job_data.bss_org_id,role_id:user_job_data.role_id}, function (result){
		common_util.show_toast(result.msg);
		common_util.load_data(ctx + '/user/selectUserJobList.action', {user_id:user_job_data.user_id}, function (result){
			ms_vm.user_job_data_list = result.data.data_list;
		});
	});
}

function save() {
	var treeObj = $.fn.zTree.getZTreeObj("tree_user");
	if (treeObj == null) {
		 common_util.show_toast('该用户所属的角色已经具备全部菜单功能权限!',false);
		 return false;
	 }
	 var nodes = treeObj.getCheckedNodes(true);
	 var limit_ids = '';
	 for (var i=0; i<nodes.length;i++) {
		 if (limit_ids == '') {
			 limit_ids = nodes[i].limit_id;
		 } else {
			 limit_ids += ',' + nodes[i].limit_id;
		 }
	 }
	 common_util.load_data(ctx+'/user/insertUserLimit.action', {user_id:ms_vm.add_edit_view_data.user_id,limit_ids:limit_ids}, function (result){
		common_util.show_toast(result.msg);
		//从新加载
		init_func_limit();
	 });
}

function goto_step(num) {
	if(ms_vm.current_step ==1){
		if(ms_vm.add_edit_submit_type =='edit'){
			$('#form_add_edit_view').submit();
		} else if(ms_vm.add_edit_submit_type == 'add'){
			ms_vm.add_edit_submit_type = 'edit';
		}
	} else if(ms_vm.current_step ==3){
		save();
	}
	for (var i=1; i<=4; i++) {
		var step = $('#step_' + i);
		if (i<num && !step.hasClass('finished')) {
			step.removeClass();
			step.addClass('finished');
		}
		if(i==num && !step.hasClass('current')) {
			step.removeClass();
			step.addClass('current');
		}
		if(i > num && !step.hasClass('todo')){
			step.removeClass();
			step.addClass('todo');
		}
		if (i!=num) {
			$('#div_' + i).hide();
		} else {
			$('#div_' + i).show();
		}
	}
	
	if (num==2 && ms_vm.add_edit_view_type=='edit') {
		init_user_job();
	}
	if(num==3) {
		init_func_limit();
	}
	ms_vm.current_step=num;
}

function user_save(){
	if(ms_vm.add_edit_view_type =='add'){
		$('#form_add_edit_view').submit();
	}else if(ms_vm.add_edit_view_type =='edit'){
		goto_step(2);
	}
}

function init_func_limit() {
	//加载菜单功能权限，每次都加载一下，避免在基本信息处，变更了用户的角色信息，导致权限已经发生变化
	//0、加载所有权限
	common_util.load_data(ctx + '/menufunc/selectMenuFunctionList.action', {}, function (result){
		tree_data_list_func_all = result.data.data_list;
		//1、加载已有的权限:基于用户角色
		common_util.load_data(ctx + '/user/selectUserRoleLimitList.action', {user_id:ms_vm.add_edit_view_data.user_id}, function (result){
			tree_data_list_func_role = result.data.data_list;
			build_tree($('#tree_role'), tree_data_list_func_role, tree_data_list_func_role, true);
			if(tree_data_list_func_all.length == tree_data_list_func_role.length) {
				common_util.show_toast("该用户所属的角色已经具备全部菜单功能权限，无需额外添加授权!", true);
				return;
			}
			//2、加载已有权限:基于用户自己
			common_util.load_data(ctx + '/user/selectUserLimitList.action', {user_id:ms_vm.add_edit_view_data.user_id}, function (result){
				var data_list_all = [];
				for (var i=0;i<tree_data_list_func_all.length;i++) {
					var flag = false;
					for (var j=0;j<tree_data_list_func_role.length;j++) {
						if (tree_data_list_func_all[i].menu_func_id == tree_data_list_func_role[j].menu_func_id) {
							//已经在role授权中存在
							flag = true;
							break;
						}
					}
					if(!flag) {
						data_list_all[data_list_all.length] = tree_data_list_func_all[i];
					}
				}
				build_tree($('#tree_user'), data_list_all, result.data.data_list, false);
			});
		});
	});
}

function build_tree(tree_id, data_list_all, data_list_this, chkDisabled) {
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
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name,checked:checked,chkDisabled:chkDisabled,open:!chkDisabled}, data_list_all[i]);
	}
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
	$.fn.zTree.init(tree_id, ztree_setting, zNodes);
}

function format_to_znodes_area(data_list) {
	var zNodes = [];
	for (var i=0; i<data_list.length;i++) {
		var id = data_list[i].area_id;
		var pId = data_list[i].up_area_id;
		var name = data_list[i].area_name;
		zNodes[i] = common_util.json_concat({id:id,pId:pId,name:name}, data_list[i]);
	}
	return zNodes;
}
