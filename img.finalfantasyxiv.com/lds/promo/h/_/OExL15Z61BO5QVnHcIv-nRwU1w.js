;
String.prototype.escapeHTML = function(){
	return this
		.replace(/&/g,'&amp;')
		.replace(/</g,'&lt;')
		.replace(/>/g,'&gt;')
		.replace(/\"/g,'&quot;')
		.replace(/\'/g,'&#39;')
	;
};
String.prototype.n2br = function(){
	return this.escapeHTML().replace( /\n/g, '<br />' );
};
Array.prototype.serializeObject = function(){
	var o = {};
	$.each(this, function() {
		if (o[this.name]) {
			if (!o[this.name].push) {
				o[this.name] = [o[this.name]];
			}
			o[this.name].push(this.value || '');
		} else {
			o[this.name] = this.value || '';
		}
	});
	return o;
};

/*-------------------------------------------------------------------------
 * htmlEscape function
 * ------------------------------------------------------------------------ */
htmlEscape = function(s) {
	return typeof(s) === "undefined" ? "" : typeof(s) === "string" ?
		s.escapeHTML() :
		s && s.toString().escapeHTML();
};

function silent_reload() {
	if ( location.href.match('#') ) {
		// #入の場合のreloadは本当のreload
		location.reload();
	}
	else {
		// それ以外はreplaceで履歴に残さずreload
		location.replace(location.href);
	}
}
