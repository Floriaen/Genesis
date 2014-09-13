/* global _Element, Me, G, Grass, Air, M, HeadPlants */
/* jshint unused: false */
var Plants = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 3;
		this.type = Me.PLANTS;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var e = null;
		if (this.burned) {
			this.type = Me.BURNED_PLANTS;
			e = G.get(this.x, this.y + 1);
			if (e) {
				e.burned = true;
			}
		}

		e = G.grid.get(this.x, this.y - 1);
		if (e === Me.HEAD_PLANTS || e === Me.PLANTS) {
			this.replace(HeadPlants);
		}
	}
});