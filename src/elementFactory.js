/* global M, MyElements, Air, Earth, Fire, Rock, Water */
/* jshint unused: false */
var ElementFactory = {
	c: 0,
	getRandom: function(x, y) {
		var e = null;
		var r = MyElements.g[~~(M.random() * MyElements.g.length)];
		switch (r) {
			case MyElements.AIR:
				e = Air.new(x, y);
			break;
			case MyElements.EARTH:
				e = Earth.new(x, y);
			break;
			case MyElements.FIRE:
				e = Fire.new(x, y);
			break;
			case MyElements.ROCK:
				e = Rock.new(x, y);
			break;
			case MyElements.WATER:
				e = Water.new(x, y);
			break;
		}
		this.c++;
		return e;
	}
};