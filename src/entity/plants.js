/* global _Element, Me, G, Grass, Air, M */
/* jshint unused: false */
var Plants = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.PLANTS;
		/*
		if (M.random() > 0.5) {
			this.type = Me.FLOWER;
		}
		*/
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		if (this.burned) {
			this.type = Me.BURNED_PLANTS;
			var e = G.get(this.x, this.y + 1);
			if (e) {
				e.burned = true;
			}
			
		}
	}
});