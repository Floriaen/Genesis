/* global _Element, G, Me, sprite, E, M, Canvas */
/* jshint unused: false */
var Eye = _Element.extend({
	initialize: function() {
		_Element.initialize.call(this, 0, 0);
		this.type = 61;

		this.coords = [
			[0, 60],
			[30, 60],
			[60, 60]
		];
		this.animSpeed = 0.1;
		this.animDelay = 1;

		this.pcx = 42;
		this.pcy = 22;

		// bounds:
		this.rw = 50 / G.width;
		this.rh = 30 / G.height;

		this.cvs = Canvas.get(30, 20);
		this.ctx = this.cvs.getContext('2d');

	},

	onAnimLoop: function() {
		//this.animDelay = true;
		this.anim = 3;
	},

	update: function(dt) {
		this.t = this.coords[this.sc];
		
		this.anim -= dt;
		if (this.anim <= 0) {
			this.anim = this.animSpeed;
			this.sc = (this.sc + 1) % this.coords.length;
			if (this.sc === 0) {
				this.onAnimLoop();
			}
		}
		if (G.ce) {
			this.pcx = 42 - (42 - (G.ce.cx * E)) * this.rw;
			this.pcy = 22 - (22 - (G.ce.cy * E)) * this.rh;
		}
	},

	render: function() {
		var bw = this.cvs.width, bh = this.cvs.height;
		var cbx = this.pcx - (42 - bw / 2),
			cby = this.pcy - (22 - bh / 2);
		
		this.ctx.clearRect(0, 0, G.width, G.height);
		this.ctx.drawImage(sprite, this.t[0], this.t[1], bw , bh, 0, 0, bw, bh);
		this.ctx.globalCompositeOperation = 'source-out';
		this.ctx.drawImage(sprite, 0, 80, 20 , 20, cbx - 10, cby - 10, 20, 20);

		G.context.fillStyle = "white";
		
		var y = 20;
		G.context.drawImage(sprite, 20, 80, 60, 60, 10, y - 20, 60, 60);// sun

		G.context.fillRect(42 - 15 - 2, y + 22 - 10 - 2, this.cvs.width, this.cvs.height);
		G.context.drawImage(this.cvs, 42 - 15 - 2, y + 22 - 10 - 2);
		G.context.drawImage(sprite, this.t[0], this.t[1], 30 , 20, 25, y + 10, 30, 20);
	},
	moveTo: function(x, y) {

	}
});