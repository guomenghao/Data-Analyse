var tree_util = {
		is_root: function (value, data_list) {
			for (var i=0;i<data_list.length;i++) {
				if (value == data_list[i].id) {
					return false;
				}
			}
			return true;
		},
		get_node : function (id, data_list) {
			for (var i=0;i<data_list.length;i++) {
				if (id == data_list[i].id) {
					return data_list[i];
				}
			} 
			return null;
		},
		get_minus_list : function (data_list_all, data_list_minus) {
			var result_list = [];
			for (var i=0;i<data_list_all.length; i++) {
				var flag = true;
				for (var j=0; j<data_list_minus.length; j++) {
					if(data_list_all[i].id == data_list_minus[j].id) {
						flag = false;
						break;
					}
				}
				if(flag) {
					result_list[result_list.length] = data_list_all[i];
				}
			}
			return result_list;
		},
		get_child_list : function (pId, data_list) {
			var result_list = [];
			for (var i=0;i<data_list.length;i++) {
				if (pId == data_list[i].pId) {
					result_list[result_list.length] = data_list[i];
				}
			} 
			return result_list;
		},
		get_child_list_connectby : function (pId, data_list){
			var result_list = [];
			for (var i=0;i<data_list.length;i++) {
				if (pId == data_list[i].pId) {
					result_list[result_list.length] = data_list[i];
					result_list = result_list.concat(tree_util.get_child_list_connectby(data_list[i].id, data_list));
				}
			} 
			return result_list;
		},
		build_select_tree_html : function (span_id,node, data_list, add_root) {
			var html = '<input type="hidden" id="' + span_id + '_id" name="'+span_id+'_id" value="'+node.id+'" />'; 
			html += '<a role="button" data-toggle="dropdown" href="#" class="dropdown-toggle"><i class="caret"></i><span id="'+span_id+'_text" name="'+span_id+'_text">'+node.name+'</span></a>';
			html += '<ul role="menu" aria-labelledby="drop1" class="sui-dropdown-menu">';
			
			if (add_root && node.id != '') {//添加根目录选项
				var func_name = "common_util.select_common('"+span_id+"','','根目录')";
				html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:'+func_name+';">根目录</a></li>';
			}
			var func_name = "common_util.select_common('"+span_id+"','"+node.id+"','"+node.name+"')";
			html += '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:'+func_name+';">'+node.name+'</a></li>';
			html += '<li role="presentation" class="divider"></li>';
			
			for (var i=0; i<data_list.length; i++) {
				if (tree_util.is_root(data_list[i].pId, data_list)) {
					html += tree_util.get_child_list_html(span_id,data_list[i], data_list);
				}
			}
			html += '</ul>';
			
			var up_menu_select = $('#' + span_id);
			up_menu_select.html(html);
		},
		get_child_list_html : function (span_id, node, data_list) {
			var html = '';
			var child_list = tree_util.get_child_list(node.id, data_list);
			if (child_list.length == 0) {
				var func_name = "common_util.select_common('"+span_id+"','"+node.id+"','"+node.name+"')";
				html = '<li role="presentation"><a role="menuitem" tabindex="-1" href="javascript:'+func_name+';">'+node.name+'</a></li>';
			} else {
				html = '<li role="presentation" class="dropdown-submenu">';
				var func_name = "common_util.select_common('"+span_id+"','"+node.id+"','"+node.name+"')";
				html += '<a role="menuitem" tabindex="-1" href="javascript:'+func_name+';"><i class="sui-icon icon-angle-right pull-right"></i>'+node.name+'</a>';
				html += '<ul class="sui-dropdown-menu">';
				for (var i=0; i<child_list.length;i++) {
					html += tree_util.get_child_list_html(span_id, child_list[i], data_list);
				}
				html += '</ul>';
				html += '</li>';
			}
			
			return html;
		},
		get_node_name : function (nodeId, data_list) {
			if (tree_util.is_root(nodeId, data_list)) {
				return '根目录';
			} else {
				for (var i=0; i<data_list.length; i++) {
					if (nodeId == data_list[i].id) {
						return data_list[i].name;
					}
				}
			}
		}
};