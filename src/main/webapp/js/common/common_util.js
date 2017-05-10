var common_util = {
		add_menu_func_log : function (menu_func_id) {
			common_util.load_data(ctx + '/sso/insertMenuFunctioncLog.action', {'menu_func_id' : menu_func_id}, function (result){
				//忽略处理结果
			});
		}, 
		select_common : function (select_id, item_code, item_text) {
			$('#' + select_id + "_id").val(item_code);
			$('#' + select_id + '_text').text(item_text);
		},
		load_data : function (url, data_json, call_back) {
			data_json = $.extend({}, data_json, jQuery.parseJSON('{"ticket:":"'+ticket+'","r_code":"'+ Math.random()+'"}'));
			$.post(url, data_json, function (result){
		    	if (result.code == '0000') {
		    		call_back(result);
		    	} else {
		    		common_util.show_toast(result.msg,true);
		    		if (result.code == 'T000') {
		    			window.location = ctx + '/login.jsp';
		    		}
		    	}
			 }, 'json');
		},
		load_menu_breadcrumb : function (menu_func_id, div_id) {
			var user_limit_path_list = user_limit_util.get_user_limit_path_list(menu_func_id);
			
			var bc_html = '<ul class="sui-breadcrumb" style="margin-left: 0px; margin-top: 5px; margin-right: 0px; margin-bottom: 5px; padding: 0px;">';
			for (var i=user_limit_path_list.length-1; i>=0; i--) {
				if ('WEB_MENU' == user_limit_path_list[i].limit_type) {
					bc_html += '<li><a href="'+user_limit_path_list[i].url_info+'">'+user_limit_path_list[i].menu_func_name+'</a></li>';
				} else {
					bc_html += '<li class="active">'+user_limit_path_list[i].menu_func_name+'</li>';
				}
			}
			bc_html += '</ul>';
			div_id.append(bc_html);
		},
		smart_page_num : function () {
			var height = document.documentElement.clientHeight;
			if (height<500) {
				return 5;
			} else if (height<650) {
				return 10;
			} if (height < 750) {
				return 15;
			} else {
				return 20;
			}
		},
		init_pagination : function (page_nav, call_back) {
			page_nav.pagination({
			    showCtrl: true,
			    pages: 1,
			    onSelect: function (num) {
			    	call_back(num);
			    }        
			});
		},
		show_toast : function (msg, error_flag) {
			if (error_flag) {
				$.toast({heading:msg,loader:false,position:'top-center',hideAfter:8000,bgColor:'#f2dede',textColor:'#a94442'});
			} else {
				$.toast({heading:msg,loader:false,position:'top-center',hideAfter:4000,bgColor:'#dff0d8',textColor:'#3c763d'});
			}
		},
		json_concat : function (json_ori, json_data) {
			//基于深度拷贝
			var data = jQuery.parseJSON(JSON.stringify(json_ori));
			return jQuery.extend(data, json_data);
		},
		sort_qry : function (th_id,order_by_filed, call_back){
			var th_obj = $(th_id);
			var tr_obj = th_obj.parent();
			var order_by_type = 'asc';
			var child_list = tr_obj.children();
			for (var i=0;i<child_list.length;i++) {
				if (th_obj.is(child_list[i])) {
					//sort/sort-asc/sort-desc 至少会有一个，我们要做的就是做变化：sort-->sort-desc，sort_desc-->sort-asc,sort-asc-->sort-desc
					if (th_obj.hasClass('sort')) {
						th_obj.removeClass("sort").addClass('sort-desc');
						order_by_type = 'desc';
					} else if (th_obj.hasClass('sort-asc')) {
						th_obj.removeClass("sort-asc").addClass('sort-desc');
						order_by_type = 'desc';
					} else if (th_obj.hasClass('sort-desc')) {
						th_obj.removeClass("sort-desc").addClass('sort-asc');
						order_by_type = 'asc';
					}
				} else {
					var obj = $(child_list[i]);
					//针对存在sort-asc/sort_desc，统一变更为sort
					if (obj.hasClass('sort-asc')) {
						obj.removeClass("sort-asc").addClass('sort');
					} else if (obj.hasClass('sort-desc')) {
						obj.removeClass("sort-desc").addClass('sort');
					}
				}
			}
			$('#order_by').val(order_by_filed + ' ' + order_by_type);
			call_back(1);
		}
};