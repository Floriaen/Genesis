/* jshint unused: false */
/* global M */
var MyColors = {	

	colorLerp: function(fromColor, toColor, tm) {
		var f = MyColors.hexToRgb(fromColor);
		var t = MyColors.hexToRgb(toColor);
		var r = ~~(M.lerp(f.r, t.r, tm));
		var g = ~~(M.lerp(f.g, t.g, tm));
		var b = ~~(M.lerp(f.b, t.b, tm));
		return 'rgb(' + r + ',' + g + ',' + b + ')';
	},

	hexToRgb: function(hex) {
    	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    	return result ? {
	        r: parseInt(result[1], 16),
	        g: parseInt(result[2], 16),
	        b: parseInt(result[3], 16)
	    } : null;
	}
};