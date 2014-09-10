/* global _Element, MyElements, G, Cloud, Grass, M, Air, Plants, HeadPlants, Rock, Ice, Flower */
/* jshint unused: false */
var Water = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.WATER;
		this.spriteAnim.push(15, 25, 35);
		this.animSpeed = 0.63;
		this.sc = M.rand(3);
		this.toIceCountDown = 2;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.grid.get(this.x, this.y + 1);
		if (elAbove && elAbove.type === MyElements.ROCK) {
			//console.log('COUNTDOWN');
			if ((this.toIceCountDown -= dt) < 0) {
				this.replace(Ice);
			}	
		} else {
			this.toIceCountDown = 2;
		}
	},
	collide: function(e) {
		//_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.ICE:
				this.replace(Ice);
			break;
			case MyElements.EARTH:
				e.replace(Grass);
				this.replace(Plants);
			break;
			case MyElements.LAVA:
				e.replace(Rock);
				G.remove(this);
			break;
			case MyElements.FIRE:
				e.replace(Cloud);
				G.remove(this);
			break;
			case MyElements.GRASS:
				this.replace(Plants);
				e.burned = false;
			break;
			case MyElements.PLANTS:
				var n = this.replace(Plants);
				n.burned = e.burned;
				e.replace(HeadPlants);
			break;
			case MyElements.HEAD_PLANTS:
				//G.remove(this);
			break;
			case MyElements.AIR:
				this.replace(Ice);
				G.remove(e);
			break;
		}
		return e;
	}
});