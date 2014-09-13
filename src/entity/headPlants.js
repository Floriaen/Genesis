/* global _Element, Me, G, Grass, Air, Plants */
/* jshint unused: false */
var HeadPlants = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 3;
		this.type = Me.HEAD_PLANTS;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.grid.get(this.x, this.y - 1);
		if (elAbove === 0) {
			this.replace(Plants);
		}
	}
});