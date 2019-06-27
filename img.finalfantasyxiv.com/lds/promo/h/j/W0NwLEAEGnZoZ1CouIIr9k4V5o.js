;$(function(){

	var $w = $(window);
	var fade_time = 400;

	$.fn.btn_over = function(){
		$(this).hover(
			function(){
				$(this).find('.on').stop().animate({'opacity':1},fade_time, 'easeOutQuad');
				$(this).find('.off').stop().animate({'opacity':0},fade_time, 'easeInQuad');
			},
			function(){
				$(this).find('.on').stop().animate({'opacity':0},fade_time, 'easeInQuad');
				$(this).find('.off').stop().animate({'opacity':1},fade_time, 'easeOutQuad');
			}
		);
	};
	$('.js__btn_over').btn_over();

	$.fn.menu = function(){
		return this.each(function(){
			var $this = $(this);
			var $btn = $this.find('.js__btn');
			var $sub_menu;
			var submenu_height;
			var menu_hover_flag = 0;
			$btn.hover(
				function(){
					$sub_menu = $(this).find('.js__sub_menu');
					submenu_height = $sub_menu.outerHeight();
					$(this).addClass('hover');
					$sub_menu.stop().animate({'bottom':'-'+submenu_height+'px','opacity':'1'},400,'easeOutQuad');
				},
				function(){
					$sub_menu.stop().animate({'bottom':'3px','opacity':'0'},400,'easeOutQuad',function(){
						$(this).closest('.js__btn').removeClass('hover');
					});
				}
			);

			$w.scroll(function(){
				var scrollTop = $w.scrollTop();
				if (scrollTop > 38) {
					$this.addClass('fixed');
					$('.nav__floating__icon,.nav__floating__list').addClass('fixed');
				}else{
					$this.removeClass('fixed');
					$('.nav__floating__icon,.nav__floating__list').removeClass('fixed');
				}
			});

		});
	};
	$('.js__menu').menu();

	var count = 0;
	var nav_show_flag;
	var window_flag;
	$.fn.floating_nav = function(){
		return this.each(function(){
			var $this = $(this);
			var $floating = $this.find('.nav__floating');
			var $list = $this.find('.nav__floating__list');
			var $icon = $this.find('.nav__floating__icon');
			var w_width;
			var c_width = 960+((272+16)*2);

			$icon.fadeIn(200);
			$w.on('load resize',function(){
				w_width = $w.width();
				if(w_width > c_width){
					$icon.fadeOut(200);
					window_flag = 1;
					$list.fadeIn(200,function(){
						navi_scrollvar();
					});
				}else{
					$icon.fadeIn(200);
					window_flag = 0;
					nav_show_flag = 0;
					$list.stop().fadeOut(200,function(){navi_scrollvar();});
				}
			});

			$(window).on('scroll resize load',function(){
				var init_pos = $this.offset().top;
				var scrollTop = $w.scrollTop();
				if(scrollTop > init_pos-16){
					$floating.addClass('nav__floating--fixed');
				}else{
					$floating.removeClass('nav__floating--fixed');
				}
			});

			$icon.click(function(){
				if(!nav_show_flag){
					$('.nav__floating__list').fadeIn(400,function(){navi_scrollvar();});
					nav_show_flag = 1;
				}else{
					$('.nav__floating__list').stop().fadeOut(400,function(){navi_scrollvar();});
					nav_show_flag = 0;
				}
			});

			// anchorLink
			var $btn_nav = $floating.find('.nav__floating__list a');
			$btn_nav.click(function (e) {
				e.preventDefault();
				var target = $(this).attr("href");
				var target_pos = $('.job__content').find(target).offset().top-50;
				$($.browser.webkit ? 'body,html' : 'html').animate({
					scrollTop: (target_pos)
				}, 500);
				if(!window_flag){
					if(nav_show_flag){
						$('.nav__floating__list').stop().fadeOut(400,function(){navi_scrollvar();});
						nav_show_flag = 0;
					}
					return false;
				}
			});
		});
	};
	if(window.parent.screen.height >= 1050){
		$('.js__nav').floating_nav();
	}
	if($('.nav__floating__list__wrapper').length){
		var nav__iscroll = new IScroll('.nav__floating__list__wrapper', {
			mouseWheel: true,
			click:true,
			disablePointer: true,
			disableTouch: false,
			disableMouse: false,
			hideScrollbar: false,
			scrollbars: true,
			fadeScrollbars: false,
			interactiveScrollbars: true,
			shrinkScrollbars: 'scale',
			bounce: true,
			onBeforeScrollStart: function(){}
		});
	}

	function navi_scrollvar(){
		if($('.nav__floating__list__wrapper').length){
			var max_height = $w.innerHeight()-166;
			$('.nav__floating__list').height('auto');
			if ($('.nav__floating__list').height() > max_height) {
				$('.nav__floating__list').height(max_height);
				nav__iscroll.refresh();
			}else{
				$('.nav__floating__list').height('auto');
				if(nav__iscroll){
					nav__iscroll.refresh();
				}

			}
		}
	};

	$.fn.tabchange = function(){
		return this.each(function(){
			var $this = $(this);
			var $tab__pve = $this.find('.job__tab--pve');
			var $tab__pvp = $this.find('.job__tab--pvp');
			var $content_pve = $('.js__select--pve');
			var $content_pvp = $('.js__select--pvp');
			var $link_change = $('.js__link_change');
			var onload = 0;

			$w.on('ready hashchange',function(){
				var hash = window.location.hash;
				if(hash === '#pvp'){
					view_pvp();
				}else{
					view_pve();
				}
			});

			$tab__pve.click(function(){
				view_pve();
				location.hash = '';
			});
			$tab__pvp.click(function(){
				view_pvp();
				location.hash = 'pvp';
			});

			var view_pve = function(){
				$content_pve.each(function(){
					$(this).addClass('active');
				});
				$content_pvp.each(function(){
					$(this).removeClass('active');
				});
				$link_change.each(function(){
					var href = $(this).data('pve');
					$(this).attr('href',href);
				});
				navi_scrollvar();

			};
			var view_pvp = function(){
				$content_pve.each(function(){
					$(this).removeClass('active');
				});
				$content_pvp.each(function(){
					$(this).addClass('active');
				});
				$link_change.each(function(){
					var href = $(this).data('pvp');
					$(this).attr('href',href);
				});
				navi_scrollvar();

			};
		});

	};
	$('.js__tabchange_content').tabchange();
	$('.job__loading').fadeOut(400,function(){
		$('.job__wrapper').css({'position':'static','display':'none'});
		$('.job__wrapper,.job__tab').fadeIn(400,function(){
			if($w.width() > 1536 && window.parent.screen.height >= 1050){
				$('.nav__floating__list').fadeIn(400,function(){navi_scrollvar();});
			}
		});
	});

	$('.js__scrollbar').each(function(){
		$(this).perfectScrollbar();
	});

	$.fn.js__tooltip=function(){
		return this.each(function(){
			var $this = $(this);
			var $tooltipContent;
			var _title;
			var source = '';
			source += '<div class="tooltip__text"></div>';
			$('body').append(source);
			$tooltipContent = $('.tooltip__text');
			$this.css({'cursor':'normal'});
			if ($tooltipContent.length != 1) {
				$tooltipContent.eq(1).remove();
			}

			$tooltipContent.css({position:'fixed', display:'none'});

			$this.hover(function() {
				_title = $(this).data('tooltip');
				$tooltipContent.stop().css({display:'block', opacity:1}).html(_title);
				if($(this).find('a').length != 0){
					$(this).find('a').data('tooltip','');
				}
			},function() {
				if ($(this).find('a').length != 0) {
					$(this).find('a').data('tooltip',_title);
				}
				$tooltipContent.stop().fadeOut(500);
			});
			$this.mousemove(function(e) {
				if ($(this).hasClass('help_text')) {
					var posTop = e.clientY + 20;
					var posLeft = e.clientX + 10;
					$('.tooltip__text').css({'line-height':'1.4'});
				} else {
					var posTop = e.clientY + 20;
					var posLeft = e.clientX;
				}
				if (posLeft+$tooltipContent.outerWidth()>$(window).width()) {
					posTop = e.clientY + ($tooltipContent.height());
					posLeft = posLeft - ((posLeft + $tooltipContent.outerWidth() - $(window).width()) + 10);
				}
				$tooltipContent.css({top:posTop+'px',left:posLeft+'px'});
			});
			$this.mousedown(function(e) {
				$tooltipContent.stop().fadeOut(500);
			});


		});
	};
	$('.js__tooltip').js__tooltip();

	$.fn.js__tile = function(){
		return this.each(function(){
			$('.js__tile_text').tile(2);
		});
	};
	$('.js__tile_text').js__tile();

	$('.social_plugin_bt_box li').hover(
		function(){
			$(this).css({'opacity' : 1});
		},
		function(){
			$(this).css({'opacity' : 0.2});
		}
	);

	(function() {
		// new or update icon show
		'use strict';
		var ALL_NEW = false;
		var ALL_UPDATE = false;
		var new_update_limit_dt_sec = Math.round((Date.now() - (86400 * 30 * 1000)) / 1000); // 30 days ago
		var return_number = function(num) {
			var number = parseInt(num);
			if ( isNaN(number) ) {
				return 0;
			}
			return number;
		};
		$('.js__jobguide_new_or_update').each(function() {
			var $this = $(this);
			var new_sec = return_number($this.data('new'));
			var updated_sec = return_number($this.data('updated'));
			if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
				if ( ALL_NEW || new_sec > new_update_limit_dt_sec ) {
					$this.find('.js__jobguide_update').remove();
					$this.show();
				}
			}
			else {
				if ( ALL_UPDATE || updated_sec > new_update_limit_dt_sec ) {
					$this.find('.js__jobguide_new').remove();
					$this.show();
				}
			}
		});
		$('.js__jobguide_new_one').each(function() {
			var $this = $(this);
			var new_sec = return_number($this.data('new'));
			var updated_sec = return_number($this.data('updated'));
			if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
				if ( ALL_NEW || new_sec > new_update_limit_dt_sec ) {
					$this.show();
					return true;
				}
			}
			$this.remove();
			return true;
		});
		$('.js__jobguide_update_one').each(function() {
			var $this = $(this);
			var new_sec = return_number($this.data('new'));
			var updated_sec = return_number($this.data('updated'));
			if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
				// nothing
			}
			else {
				if ( ALL_UPDATE || updated_sec > new_update_limit_dt_sec ) {
					$this.show();
					return true;
				}
			}
			$this.remove();
			return true;
		});
		$('.js__new_or_update_ic').each(function() {
			var $this = $(this);
			var new_sec = return_number($this.data('new'));
			var updated_sec = return_number($this.data('updated'));

			if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
				if ( ALL_NEW || new_sec > new_update_limit_dt_sec ) {
					$this.addClass('ic_new');
				}
			}
			else {
				if ( ALL_UPDATE || updated_sec > new_update_limit_dt_sec ) {
					$this.addClass('ic_update');
				}
			}
		});
		$('.js__job_action_new_or_updated').each(function() {
			var $this = $(this);
			var new_sec = return_number($this.data('new'));
			var updated_sec = return_number($this.data('updated'));

			if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
				if ( ALL_NEW || new_sec > new_update_limit_dt_sec ) {
					$this.addClass('job__action__new');
				}
			}
			else {
				if ( ALL_UPDATE || updated_sec > new_update_limit_dt_sec ) {
					$this.addClass('job__action__updated');
				}
			}
		});
		var build_new_or_update_ic = function() {
			var is_this_pvp = false;
			if ( window.location.hash === '#pvp' ) {
				is_this_pvp = true;
			}
			$('.js__new_or_update_ic_pv').each(function() {
				var $this = $(this);
				var prefix = is_this_pvp ? 'pvp_' : 'pve_'
				var new_sec = return_number($this.data(prefix + 'new'));
				var updated_sec = return_number($this.data(prefix + 'updated'));
				$this.removeClass('ic_new');
				$this.removeClass('ic_update');

				if ( ALL_NEW || !ALL_UPDATE && new_sec >= updated_sec ) {
					if ( ALL_NEW || new_sec > new_update_limit_dt_sec ) {
						$this.addClass('ic_new');
					}
				}
				else {
					if ( ALL_UPDATE || updated_sec > new_update_limit_dt_sec ) {
						$this.addClass('ic_update');
					}
				}
			});
		};
		$(window).on('hashchange',build_new_or_update_ic);
		build_new_or_update_ic();
	})();
});
