/* global _Element, Me, G, Cloud, Grass, M, Air, Plants, HeadPlants, Rock, Ice */
/* jshint unused: false */
var Water = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = Me.WATER;
		this.spriteAnim.push(15, 25, 35, 25);
		this.animSpeed = 0.21;
		this.sc = M.rand(3);
		this.toIceCountDown = 2;
	},
	update: function(dt) {
		_Element.update.call(this, dt);
		var elAbove = G.grid.get(this.x, this.y + 1);
		if (elAbove && elAbove.type === Me.ROCK) {
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
			case Me.ICE:
				this.replace(Ice);
			break;
			case Me.EARTH:
				e.replace(Grass);
				this.replace(Plants);
			break;
			case Me.LAVA:
				e.replace(Rock);
				G.remove(this);
			break;
			case Me.FIRE:
				e.replace(Cloud);
				G.remove(this);
			break;
			case Me.GRASS:
				this.replace(Plants);
				e.burned = false;
			break;
			case Me.PLANTS:
				if (e.burned === false) {
					var n = this.replace(Plants);
					e.replace(HeadPlants);	
				} else {
					G.remove(this);
				}
				
			break;
			case Me.HEAD_PLANTS:
				//G.remove(this);
			break;
			case Me.AIR:
				this.replace(Ice);
				G.remove(e);
			break;
		}
		return e;
	}
});