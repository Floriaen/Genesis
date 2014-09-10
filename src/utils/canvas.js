/* jshint unused: false */
var Canvas = {
	
	o: null,

	get: function(w, h) {
		var o = document.createElement('canvas');
		o.width = w;
		o.height = h;
		return o;
	},

	pixelate: function(cvs) {
		var c = cvs.getContext('2d');
		c["imageSmoothingEnabled"] = false;
		c["mozImageSmoothingEnabled"]  = false;
		c["webkitImageSmoothingEnabled"] = false;
		c['oImageSmoothingEnabled'] = false;
		c['msImageSmoothingEnabled'] = false;
	},

	createAlphaMask: function(color, data, x, y, width, height) {
		var o = this.get(width, height);
		var ctx = o.getContext('2d');
		ctx.drawImage(data, x, y, width, height, 0, 0, width, height);
		var c = ctx.getImageData(0, 0, width, height);
		for (var i = 0, len = c.data.length; i < len; i = i + 4) {
			c.data[i] = color[0];
			c.data[i + 1] = color[1];
			c.data[i + 2] = color[2];
			// alpha still the same
		}
		ctx.putImageData(c, 0, 0); // update 
		return o;
	},
};