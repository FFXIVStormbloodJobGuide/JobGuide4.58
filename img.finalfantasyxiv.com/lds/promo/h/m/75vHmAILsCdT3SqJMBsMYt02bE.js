if (typeof(window.console) == "undefined") { console = {}; console.log = console.warn = console.error = function(a) {}; }
jQuery.ajaxSettings.traditional = true;
f_pass=true;
// for no-cache

var Lodestone = {
    init_for_el_plugins: [],
	init_at_page: function() {
		// switch back sp
		$('#bt_for_smartphone,#link_spsite a').click(function() {
			$.ajax({
				type: 'POST',
				url: sprintf(
					'%sswitch_sp',
					api_uri
				),
				dataType: 'json',
				data: {
					'csrf_token': csrf_token
				},
				success: function(data) {
					if ( data.error ) {
						alert(data.error.message);
					}
					else {
						silent_reload();
					}
				}
			});
		});

		function is_touch_device() {
			return !! ('ontouchstart' in window);
		}
		function reset_attr_href(my_obj){
			if(my_obj.attr("fclick") == "0"){
				my_obj.attr("fclick","1")
			}else{
				my_obj.attr("href",my_obj.attr("href2"));
			}
		}
		if (is_touch_device() || (navigator.msMaxTouchPoints && navigator.msMaxTouchPoints > 1)) {
			$(".dropdown_box").each(function(){
				$(this).children("a").attr("fclick","0");
				$(this).children("a").attr("href2" , $(this).find("a").attr("href"));
				$(this).children("a").attr("href","javascript:void(0)");
				$(this).children("a").click(function(e) {
					reset_attr_href($(this));
				});
			});
		}
		$('.dropdown_box').dropdown();
		$('.dropdown_trigger_box').dropdown({mouse_click:true});
	},
    add_init_for_el_plugin: function(fn) {
        Lodestone.init_for_el_plugins.push(fn);
    },
};

jQuery(Lodestone.init_at_page);

