/* global _Element, G, Me, Lava, Earth */
/* jshint unused: false */
var Rock = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.ROCK;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case Me.GRASS:
				e.replace(Earth);
			break;
			case Me.HEAD_PLANTS:
			case Me.PLANTS:
				G.remove(e);
			break;
			case Me.LAVA:
				this.replace(Lava);
			break;
			case Me.FIRE:
				G.remove(this);
				e.replace(Lava);
			break;

		}
		return e;
	}
});