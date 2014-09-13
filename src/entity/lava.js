/* global _Element, G, M, Me, Air, Earth, Rock, Water */
/* jshint unused: false */
var Lava = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.cost = 5;
		this.type = Me.LAVA;
		this.spriteAnim.push(10, 20, 30);
		this.sc = M.rand(3);
	},
  	collide: function(e) {
    	_Element.collide.call(this, e);
		switch (e.type) {
			case Me.ICE:
				e.replace(Water);
			break;
			case Me.WATER:
				this.replace(Rock);
			break;
			case Me.AIR:
			case Me.FIRE:
				G.remove(e);
			break;
			case Me.GRASS:
				e.replace(Earth);
			break;
			case Me.HEAD_PLANTS:
			case Me.PLANTS:
				G.remove(e);
			break;
			case Me.EARTH:
				this.free();
				if (e.selected === false) {
					e.selected = true;	
				}
			break;
		}
		return e;
  	}
});