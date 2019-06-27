;(function($){
	$.fn.serializeObject = function() {
		return this.serializeArray().serializeObject();
	};

	/*-------------------------------------------------------------------------
	 * dropdown
	 * ------------------------------------------------------------------------ */
	$.fn.dropdown=function(options){
		var options=$.extend({mouse_click:false},options);
		return this.each(function(){
			var elem=$(this),option=options,target=elem.find('.dropdown'),_trigger,originalPos,onFlg=true,tooltipInit=true;
			target.css({opacity:0,'display':'none'});
			originalPos=target.css('top').replace('px','');
			/* Animation
			 ---------------------------------------- */
			function animateTo(onFlg){
				if(onFlg){
					elem.find('a').addClass('press');
					target.css({'display':'block',top:originalPos-5+'px'});
					target.stop().animate({'top':originalPos+'px','opacity':1},200,'linear');
				}else{
					elem.find('a').removeClass('press');
					target.stop().animate({'top':originalPos-5+'px','opacity':0},200,'linear',function(){
						target.css({'display':'none'});
					});
				}
			}

			/* Hover Handler 
			 ---------------------------------------- */
			if(!option.mouse_click){
				elem.hover(function(){
					animateTo(onFlg);
					onFlg=false;
				},function(){
					animateTo(onFlg);
					onFlg=true;
				});
			/* Click Handler
			 ---------------------------------------- */
			}else{
				_trigger=elem.find('.dropdown_trigger');
				_trigger.unbind("MSPointerDown");
				_trigger.click(function(){
					if(onFlg){
						animateTo(onFlg);
						onFlg=false;
					}else{
						animateTo(onFlg);
						onFlg=true;
					}
				});
			}
		});
	};
	
	/*-------------------------------------------------------------------------
	 * pagetop
	 * ------------------------------------------------------------------------ */
	//ページトップ
	var btn_pagetop = $('.page-top__btn');
	$_window = $(window);
	$(btn_pagetop).each(function(){
		var showFlag = false;
		$_window.on('scroll load resize',function(){
			var page_top__base_position = $('.page-top').offset();
			var page_top__button_position = $_window.scrollTop() + $_window.innerHeight() - (12 + btn_pagetop.height());
			if(page_top__base_position.top < $_window.innerHeight()){
				btn_pagetop.addClass('page-top__btn--absolute');
				showFlag = true;
				btn_pagetop.stop().animate({'right':'64px','opacity':'.5'},400);
			}else{
				if($_window.scrollTop() < 2){
					if (showFlag) {
						showFlag = false;
						btn_pagetop.stop().animate({'right':'-48px','opacity':'0'},400);
					}
				}else{
					if (showFlag == false) {
						showFlag = true;
						btn_pagetop.stop().animate({'right':'64px','opacity':'.5'},400);
					}
				}
				if(page_top__base_position.top <= page_top__button_position){
					btn_pagetop.addClass('page-top__btn--absolute');
				}else{
					btn_pagetop.removeClass('page-top__btn--absolute');
				}
			}
		});

	});
	$('.page-top__btn').click(function(){
		$('body,html').animate({
			scrollTop: 0
		}, 500);
		return false;
	});

})(jQuery);
