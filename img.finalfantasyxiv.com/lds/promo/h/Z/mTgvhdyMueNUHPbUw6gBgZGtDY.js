(function($) {
var cookiepolicy_shows = {};
var shows = [];
var cookie_name = 'ldst_cookiepolicy_show' + cookie_suffix;
if ( Cookies.get(cookie_name) ) {
	shows = JSON.parse(Cookies.get(cookie_name));
}
$(function() {
	$('.sys_cookiepolicy_show').each(function() {
		var $this = $(this);
		var key = $this.data('key');
		if ( $.inArray(key, shows) === -1 ) {
			$this.show();
			if ( cookiepolicy_shows[key] ) {
				cookiepolicy_shows[key].push($this);
			}
			else {
				cookiepolicy_shows[key] = [$this];
			}
		}
	});
	$('.sys_cookiepolicy_show_trigger').on('click', function() {
		var $this = $(this);
		var key = $this.data('key');
		if ( $.inArray(key, shows) === -1 ) {
			if ( cookiepolicy_shows[key] ) {
				$.each(cookiepolicy_shows[key], function(i, $n) {
					$n.hide();
				});
			}
			shows.push(key);
			Cookies.set(cookie_name, JSON.stringify(shows), {
				expires: 365,
				domain: base_domain
			});
		}
	});
});
})(jQuery);
