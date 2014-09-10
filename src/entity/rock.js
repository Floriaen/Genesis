/* global _Element, G, MyElements, Lava, Earth */
/* jshint unused: false */
var Rock = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.ROCK;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.GRASS:
				e.replace(Earth);
			break;
			case MyElements.HEAD_PLANTS:
			case MyElements.PLANTS:
				G.remove(e);
			break;
			case MyElements.LAVA:
				this.replace(Lava);
			break;
			case MyElements.FIRE:
				G.remove(this);
				e.replace(Lava);
			break;

		}
		return e;
	}
});