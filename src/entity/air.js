/* global _Element, G, MyElements, M, Ice, Cloud */
/* jshint unused: false */
var Air = _Element.extend({
	initialize: function(x, y) {
		_Element.initialize.call(this, x, y);
		this.type = MyElements.AIR;
		this.spriteAnim.push(MyElements.AIR, 16, 26, 36);
		this.animSpeed = 40;
		this.sc = M.rand(4);
	},
	collide: function(e) {
		//_Element.collide.call(this, e);
		switch (e.type) {
			case MyElements.WATER:
				e.replace(Ice);
				G.remove(this);
			break;
			case MyElements.LAVA:
			case MyElements.FIRE:
				this.replace(Cloud);
			break;

		}
		return e;
	}
});