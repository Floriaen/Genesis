/* global _Element, MyElements, G, Grass, Air, Plants */
/* jshint unused: false */
var HeadPlants = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.HEAD_PLANTS;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.grid.get(this.x, this.y - 1);
		if (elAbove !== MyElements.PLANTS && elAbove !== MyElements.HEAD_PLANTS) {
			this.replace(Plants);
		}
	}
});