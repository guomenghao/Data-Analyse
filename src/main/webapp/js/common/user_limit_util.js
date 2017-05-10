var user_limit_list = new Array();

var user_limit_util = {
		get_user_limit_list:function (){
			if (user_limit_list.length == 0) {
				$.ajax({  
		            async:false,//使用同步的Ajax请求  
		            type: 'POST',  
		            url: ctx + '/sso/validTicket.action?ret_flag=user_limit&ticket='+ticket+'&r_code='+Math.random(),  
		            data: {'limit_type':'WEB_MENU,WEB_MENU_FUNCTION'},  
		            dataType: 'json',
		            success: function(result){  
		            	user_limit_list = result.data.user_limit_list;
		            	//格式化url_info
		            	for (var i=0; i<user_limit_list.length; i++) {
		            		var url_info = user_limit_list[i].url_info;
		            		var menu_func_id = user_limit_list[i].menu_func_id;
		            		
		            		var format_url_info = '';
		            		if (url_info == null || url_info == undefined || url_info == '' || url_info.replace(/(^s*)|(s*$)/g, "").length == 0 || '#' == url_info) {
		            			format_url_info = '/home/menu_list.jsp?menu_func_id=' + menu_func_id;
		            		} else {
		            			var user_limit_child_list = user_limit_util.get_user_limit_child_list(menu_func_id, 'WEB_MENU');
		            			if (user_limit_child_list.length > 0) {
		            				format_url_info = '/home/menu_list.jsp?menu_func_id=' + menu_func_id;
		            			} else {
		            				format_url_info = url_info.toLowerCase();
		            			}
		            		}
		            		
		            		if (format_url_info.startWith('http')) {
		            			if (format_url_info.indexOf('?') == -1) {
		            				format_url_info = url_info + '?ticket=' + ticket;
		            			}else {
		            				format_url_info = url_info + '&ticket=' + ticket;
		            			}
		            		} else {
		            			if (!format_url_info.startWith('/')) {
		            				format_url_info = '/' + format_url_info;
		            			}
		            			if(!format_url_info.startWith(ctx + '/')) {
		            				format_url_info = ctx + format_url_info;
		            			}
		            			if (format_url_info.indexOf('?') == -1) {
		            				format_url_info = format_url_info + '?ticket=' + ticket;
		            			}else {
		            				format_url_info = format_url_info + '&ticket=' + ticket;
		            			}
		            		}
		            		format_url_info = format_url_info.replace('http://dev03.oicp.net:3080','')
		            		
		            		user_limit_list[i].url_info = format_url_info;
		            	}
		            }  
		        });
				//alert(JSON.stringify(user_limit_list));
			}
			return user_limit_list;
		},
		get_user_limit_root_list: function() {
			var user_limit_root_list = new Array();
			
			var data_list = user_limit_util.get_user_limit_list();
			for (var i=0; i<data_list.length; i++) {
				var up_menu_func_id = data_list[i].up_menu_func_id;
				if (user_limit_util.is_root_menu_func(up_menu_func_id)) {
					user_limit_root_list[user_limit_root_list.length] = data_list[i];
				}
			}
			
			return user_limit_root_list;
		},
		get_user_limit_child_list: function(menu_func_id, limit_type_ids) {
			var user_limit_child_list = new Array();
			
			var limit_type_list = limit_type_ids.split(',');
			var data_list = user_limit_util.get_user_limit_list();
			for (var i=0; i<data_list.length; i++) {
				if (menu_func_id == data_list[i].up_menu_func_id) {
					for (var k=0; k<limit_type_list.length; k++) {
						if(data_list[i].limit_type == limit_type_list[k]) {
							user_limit_child_list[user_limit_child_list.length] = data_list[i];
							break;
						}
					}
				}
			}
			
			return user_limit_child_list;
		},
		get_user_limit_path_list : function (menu_func_id) {
			var user_limit_path_list = new Array();
			
			var data_list = user_limit_util.get_user_limit_list();
			for(var i = 0; i < data_list.length; i++){
				if (menu_func_id == data_list[i].menu_func_id) {
					user_limit_path_list[0] = data_list[i];
					var up_menu_func_id = data_list[i].up_menu_func_id;
					if (!user_limit_util.is_root_menu_func(up_menu_func_id)) {
						var menu_path_list_up = user_limit_util.get_user_limit_path_list(up_menu_func_id);
						for (var j=0; j<menu_path_list_up.length; j++) {
							user_limit_path_list[user_limit_path_list.length] = menu_path_list_up[j];
						}
					}
					break;
				}
			}
			return user_limit_path_list;
		},
		is_root_menu_func : function (up_menu_func_id) {
			if (up_menu_func_id == null || up_menu_func_id == '' || up_menu_func_id == -1) {
				return true;
			} else {
				return false;
			}
		}, 
		is_limited : function (menu_func_id) {
			var data_list = user_limit_util.get_user_limit_list();
			for(var i = 0; i < data_list.length; i++){
				if (menu_func_id == data_list[i].menu_func_id) {
					return true;
				}
			}
			return false;
		}
};