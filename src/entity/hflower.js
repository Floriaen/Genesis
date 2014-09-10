/* global _Element, G, Me, Grass */
/* jshint unused: false */
var Flower = Grass.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.FLOWER;
	}
});