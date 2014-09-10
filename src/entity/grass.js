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
		if (this.burned) {
			this._type = Me.BURNED_GRASS;
		}
	}
});