/* global M, Me, Air, Earth, Fire, Rock, Water */
/* jshint unused: false */
var ElementFactory = {
	c: 0,
	getRandom: function(x, y) {
		var e = null;
		var r = Me.g[~~(M.random() * Me.g.length)];
		switch (r) {
			case Me.AIR:
				e = Air.new(x, y);
			break;
			case Me.EARTH:
				e = Earth.new(x, y);
			break;
			case Me.FIRE:
				e = Fire.new(x, y);
			break;
			case Me.ROCK:
				e = Rock.new(x, y);
			break;
			case Me.WATER:
				e = Water.new(x, y);
			break;
		}
		this.c++;
		return e;
	}
};