/* global _Element, G, Me, M, Ice */
/* jshint unused: false */
var Cloud = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.CLOUD;
		this.spriteAnim.push(57, 47, 37, 27, 17);
		this.animSpeed = 0.1;
	},
	onAnimLoop: function() {
		G.remove(this);
	}
});