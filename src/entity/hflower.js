/* global _Element, G, MyElements, Grass */
/* jshint unused: false */
var Flower = Grass.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.FLOWER;
	}
});