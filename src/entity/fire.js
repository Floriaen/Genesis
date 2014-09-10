/* global _Element, G, M, MyElements, Air, Earth, Water, Cloud */
/* jshint unused: false */
var Fire = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.FIRE;
		this.spriteAnim.push(2, 12, 22, 32, 12);
		this.animSpeed = 0.23;
		this.sc = M.rand(4);
	},
  	collide: function(e) {
    	_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.WATER:
				this.replace(Cloud);
			break;
			case MyElements.GRASS:
				e.replace(Earth);
			break;
			case MyElements.AIR:
			case MyElements.HEAD_PLANTS:
				G.remove(e);
			break;
			case MyElements.PLANTS:
				if (e.burned) {
					G.remove(e);
				} else {
					e.burned = true;
					G.remove(this);	
				}
			break;
			case MyElements.ICE:
				e.replace(Water);
				this.replace(Cloud);
			break;
		}
		return e;
  	},
  	update: function(e) {
  		_Element.update.call(this, e);
  		var ea = G.get(this.x, this.y - 1);
  		if (ea && ea.type === MyElements.FIRE) {
  			this.type = MyElements.FIRE_BASE;
  			this.spriteAnim = [];
  		} else {
  			this.type = MyElements.FIRE;
  			this.spriteAnim.push(2, 12, 22, 32, 12);
  		}
  	}
});