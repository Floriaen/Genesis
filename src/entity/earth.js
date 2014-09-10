/* global _Element, G, MyElements, Rock */
/* jshint unused: false */
var Earth = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.EARTH;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.LAVA:
			case MyElements.FIRE:
				this.replace(Rock);
				G.remove(e);
			break;
			case MyElements.GRASS:
				e.replace(Earth);
			break;
			case MyElements.AIR:
				if (e.pressure === 0) {
					e.pressure = 3;
				}
			break;
			case MyElements.HEAD_PLANTS:
			case MyElements.PLANTS:
				G.remove(e);
				this.y += 1;
			break;
		}
		return e;
	}
});