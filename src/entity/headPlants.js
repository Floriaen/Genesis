/* global _Element, Me, G, Grass, Air, Plants */
/* jshint unused: false */
var HeadPlants = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.HEAD_PLANTS;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.grid.get(this.x, this.y - 1);
		if (elAbove !== Me.PLANTS && elAbove !== Me.HEAD_PLANTS) {
			this.replace(Plants);
		}
	}
});