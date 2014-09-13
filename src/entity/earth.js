/* global _Element, G, Me, Rock */
/* jshint unused: false */
var Earth = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.EARTH;
	},
	collide: function(e) {
		_Element.collide.call(this, e);
		switch (e.type) {
			case Me.LAVA:
			case Me.FIRE:
				this.replace(Rock);
				G.remove(e);
			break;
			case Me.GRASS:
				e.replace(Earth);
			break;
			case Me.AIR:
				//this.free();
				if (e.selected === false) {
					e.selected = true;	
				}
			break;
			case Me.HEAD_PLANTS:
			case Me.PLANTS:
				G.remove(e);
				//this.y += 1;
			break;
		}
		return e;
	}
});