(function($) {
	//ie7、8支持placeholder属性
	$.fn.extend({
        "iePlaceholder":function (options) {
            options = $.extend({
                placeholderColor:'#999',
                isUseSpan:false,
                onInput:true
            }, options);
			
            $(this).each(function () {
                var _this = this;
                var supportPlaceholder = 'placeholder' in document.createElement('input');
                if (!supportPlaceholder) {
                    var defaultValue = $(_this).attr('placeholder');
                    var defaultColor = $(_this).css('color');
                    if (options.isUseSpan == false) {
                        $(_this).focus(function () {
                            var pattern = new RegExp("^" + defaultValue + "$|^$");
                            pattern.test($(_this).val()) && $(_this).val('').css('color', defaultColor);
                        }).blur(function () {
                                if ($(_this).val() == defaultValue) {
                                    $(_this).css('color', defaultColor);
                                } else if ($(_this).val().length == 0) {
                                    $(_this).val(defaultValue).css('color', options.placeholderColor)
                                }
                            }).trigger('blur');
                    } else {
                    	var spanHeight = $(_this).height();
                    	spanHeight = parseInt(spanHeight) + 10;
                        var $imitate = $('<span class="wrap-placeholder" style="position:absolute; display:inline-block; overflow:hidden;z-index:2; color:'+options.placeholderColor+'; width:'+$(_this).width()+'px; height:'+spanHeight+'px;">' + (defaultValue==undefined?"":defaultValue) + '</span>');
                        $imitate.css({
                            'margin-left':$(_this).css('margin-left'),
                            'margin-top':$(_this).css('margin-top'),
							'text-align':'left',
                            'font-size':$(_this).css('font-size'),
                            'font-family':$(_this).css('font-family'),
                            'font-weight':$(_this).css('font-weight'),
                            'padding-left':parseInt($(_this).css('padding-left')) + 2 + 'px',
                            'line-height':_this.nodeName.toLowerCase() == 'textarea' ? $(_this).css('line-weight') : $(_this).outerHeight() + 'px',
                            'padding-top':_this.nodeName.toLowerCase() == 'textarea' ? parseInt($(_this).css('padding-top')) + 2 : 0
                        });
                        $(_this).before($imitate.click(function () {
                            $(_this).trigger('focus');
                        }));
                        
                        $(_this).val().length != 0 && $imitate.hide();
                        if (options.onInput) {
                            var inputChangeEvent = typeof(_this.oninput) == 'object' ? 'input' : 'propertychange';
                            $(_this).bind(inputChangeEvent, function () {
                                $imitate[0].style.display = $(_this).val().length != 0 ? 'none' : 'inline-block';
                            });
                            $(_this).bind("click", function () {//绑定点击事件
                                $imitate[0].style.display = $(_this).val().length != 0 ? 'none' : 'inline-block';
                            });
                            $(_this).click();//先自动focus一次，绑定内容变化事件后，再blur
                        } else {
                        	$(_this).focus();//textarea专用，先自动focus一次，绑定内容变化事件后，再blur
	                    	$(_this).bind("input propertychange", function () {//绑定内容变化事件（ie用）
	                    		  if(/^$/.test($(_this).val())){
	                    			  $imitate.show();
	                    		  }  else{
	                    			  $imitate.hide();
	                    		  }
	                        });
	                    	$(_this).blur();
	                    	
	                        $(_this).focus(function () {
	                            $imitate.hide();
	                        }).blur(function () {
	                                /^$/.test($(_this).val()) && $imitate.show();
	                        	});
                        }
                    }
                }
            });
            return this;
        }
    });
})(jQuery);
//function initPlaceholder(obj) {
//	$('input[placeholder], textarea[placeholder]',obj).each(function() {
//		var type = $(this).attr("type");
//		if (type == "password") {
//			$(this).is('input') ? $(this).iePlaceholder({
//				isUseSpan : true
//			}) : $(this).iePlaceholder({
//				isUseSpan : true,
//				onInput : false
//			});
//		} else {
//			$(this).is('input') ? $(this).iePlaceholder({
//				//2015年3月27日09:31:41 jsj 改为非pdw类型input获取焦点时不清楚placeholder提示信息
//				isUseSpan : true
//			}) : $(this).iePlaceholder({
//				isUseSpan : false,
//				onInput : false
//			});
//		}
//	});
//}