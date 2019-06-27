(function() {
	var default_ffxiv_pr_cross_menu = {
		uri_js: 'https://jp.finalfantasyxiv.com/cross_menu/uri.js'
	};
	if ( typeof ffxiv_pr_cross_menu == "undefined" ) {
		ffxiv_pr_cross_menu = default_ffxiv_pr_cross_menu;
	}
	else {
		for (var property in default_ffxiv_pr_cross_menu) {
			if ( typeof ffxiv_pr_cross_menu[property] === "undefined" ) {
				ffxiv_pr_cross_menu[property] = default_ffxiv_pr_cross_menu[property];
			}
		}
	}

	var uri_refresh_interval = 60;
	var refresh_time = Math.floor(new Date().getTime() / 1000 / uri_refresh_interval) * uri_refresh_interval;

	window.recieve_ffxiv_pr_cross_menu_uri = function(data) {
		ffxiv_pr_cross_menu.uri = data;
	};

	var inited = false;
	var counter = 0;
	external_load('js', ffxiv_pr_cross_menu.uri_js + '?' + refresh_time, function() {
        setTimeout(function() {
            typeof jQuery == "undefined" ?
            external_load('js', ffxiv_pr_cross_menu.uri.jquery, function() {
                jQuery.noConflict();
                after_load();
            }) : after_load();
        }, 1000);

		external_load('css', ffxiv_pr_cross_menu.uri.css, after_load);
		external_load('js', ffxiv_pr_cross_menu.uri.js, after_load);
	});
	setTimeout(function() {
		// for onload do'nt execute devices
		if ( !inited ) {
			var init_check_fn;
			init_check_fn = function() {
				if ( !inited ) {
					if ( ffxiv_pr_cross_menu.init ) {
						inited = true;
						ffxiv_pr_cross_menu.init(jQuery);
					}
					else {
						setTimeout(init_check_fn, 500);
					}
				}
			};
			setTimeout(init_check_fn, 500);
		}
	}, 1000);

	function after_load() {
		counter++;
		if ( counter >= 3 ) {
			if ( !inited && ffxiv_pr_cross_menu.init ) {
				inited = true;
				ffxiv_pr_cross_menu.init(jQuery);
			}
		}
	}

	function external_load(type, src, callback){
		var loaded = false;
		var el, src_attr;
		var d = document;
		if ( type === 'js' ) {
			el = d.createElement('script');
			el.type  = 'text/javascript';
			src_attr = 'src';
		}
		else if ( type === 'css' ) {
			el = d.createElement('link');
			el.type  = 'text/css';
			el.rel	 = 'stylesheet';
			src_attr = 'href';
		}
		el.async = true;
		if (window.ActiveXObject) {
			el.onreadystatechange = function() {
				var state = el.readyState;
				if ( state === 'loaded' || state === 'complete' ) {
					if ( !loaded ) {
						loaded = true;
						callback();
					}
				}
			};
		}
		else {
			el.onload = callback;
		}
		el[src_attr] = src;
		var head = d.getElementsByTagName("head")[0] || d.documentElement;
		head.insertBefore(el, head.firstChild);
	}
})();
