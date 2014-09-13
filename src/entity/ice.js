/* global _Element, G, Me, Rock, Water, Earth */
/* jshint unused: false */
var Ice = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 3;
		this.type = Me.ICE;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case Me.LAVA:
			case Me.FIRE:
				this.replace(Water);
			break;
			case Me.GRASS:
				e.replace(Earth);
			break;
			case Me.WATER:
				e.replace(Ice);
			break;
			case Me.AIR:
			case Me.HEAD_PLANTS:
			case Me.PLANTS:
				G.remove(e);
			break;
		}
		return e;
	}
});