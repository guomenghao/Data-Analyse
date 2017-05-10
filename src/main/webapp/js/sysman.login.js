function init() {
	$('#form_login').validate({
		rules:{
			 login_code: {
				 required: true,
				 maxlength: 20
			 },
			 login_passwd: {
				 required: true,
				 maxlength: 50
			 }
		 },
		 success: function() {
			 $('#login_passwd').val($.md5($('#login_passwd').val()));
			 var data_json = $('#form_login').serializeJsonObject();
	     	 $.post(ctx + '/sso/login.action', data_json, function (result){
	     		 if (result.code == '0000') {
	     			 //临时方案，为了部署nginx后测试使用，方便的获取ticket @吴健
	     			 //window.location = ctx + '/home/index.jsp?ticket='+result.data.ticket;
	     			 cookie_util.setCookie('ticket', result.data.ticket, 1, '/');
	     			 window.location = ctx + '/home/index.jsp';
	     		 } else {
	     			 $('#login_passwd').val('');
	     			 alert(result.msg);
	     		 }
	     	 }, 'json');
	     	 
	      	return false;
	     }
	});
}