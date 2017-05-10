$.fn.serializeJsonObject = function() {
	var o = {};
	var a = this.serializeArray();
	$.each(a, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [ o[this.name] ];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};
String.prototype.startWith=function(str){     
  var reg=new RegExp("^"+str);     
  return reg.test(this);        
}  

String.prototype.endWith=function(str){     
  var reg=new RegExp(str+"$");     
  return reg.test(this);        
}

function init_placeholder() {
	//$('input[placeholder], textarea[placeholder]').placeholder();
	$('input[placeholder], textarea[placeholder]',document.body).each(function() {
		var type = $(this).attr("type");
		if (type == "password") {
			$(this).is('input') ? $(this).iePlaceholder({
				isUseSpan : true
			}) : $(this).iePlaceholder({
				isUseSpan : true,
				onInput : false
			});
		} else {
			$(this).is('input') ? $(this).iePlaceholder({
				//2015年3月27日09:31:41 jsj 改为非pdw类型input获取焦点时不清楚placeholder提示信息
				isUseSpan : true
			}) : $(this).iePlaceholder({
				isUseSpan : true,
				onInput : false
			});
		}
	});
}

$(function(){
	init_placeholder();
});
