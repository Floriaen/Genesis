/* global _Element, G, MyElements, Rock, Water, Earth */
/* jshint unused: false */
var Ice = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 2;
		this.type = MyElements.ICE;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.LAVA:
			case MyElements.FIRE:
				this.replace(Water);
			break;
			case MyElements.GRASS:
				e.replace(Earth);
			break;
			case MyElements.WATER:
				e.replace(Ice);
			break;
			case MyElements.AIR:
			case MyElements.HEAD_PLANTS:
			case MyElements.PLANTS:
				G.remove(e);
			break;
		}
		return e;
	}
});