/* global _Element, G, M, MyElements, Air, Earth, Rock, Water */
/* jshint unused: false */
var Lava = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 2;
		this.type = MyElements.LAVA;
		this.spriteAnim.push(10, 20, 30);
		this.sc = M.rand(3);
	},
  	collide: function(e) {
    	_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.ICE:
				e.replace(Water);
			break;
			case MyElements.WATER:
				this.replace(Rock);
			break;
			case MyElements.AIR:
			case MyElements.FIRE:
				G.remove(e);
			break;
			case MyElements.GRASS:
				e.replace(Earth);
			break;
			case MyElements.HEAD_PLANTS:
			case MyElements.PLANTS:
				G.remove(e);
			break;
			case MyElements.EARTH:
				if (e.pressure === 0) {
					e.pressure = 3;
				}
			break;
		}
		return e;
  	}
});