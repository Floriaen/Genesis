/* global _Element, G, Me, M */
/* jshint unused: false */
var Grass = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 2;
		this.type = Me.GRASS;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case Me.FIRE:
				G.remove(e);
			break;
			case Me.PLANTS:
				G.remove(e);
			break;
		}
		return e;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.get(this.x, this.y - 1);
		if (elAbove) {
			this.burned = elAbove.burned;
		}
		if (this.burned === true) {
			this.type = Me.BURNED_GRASS;
		} else {
			this.type = Me.GRASS;
		}
	}
});