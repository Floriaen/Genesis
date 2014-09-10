/* global Base, G, MyElements, M, E, sprite, Z, Shadows */
/* jshint unused: false */
var _Element = Base.extend({
	initialize: function(x, y) {
		this.burned = false;
		this.spriteAnim = [];
		this.anim = 0.4;
		this.animSpeed = 0.4;
		this.sc = 0;

		this.cost = 1;
		this.x = x;
		this.y = y;

		this.cx = x;
		this.cy = y;

		// for render purpose:
		this.rx = 0;
		this.ry = 0;

		this.v = {x: 0, y: E};

		this.w = E;
		this.h = E;

		this.gravity = 10;

		this._type = 0;
		this._oType = 0;
		this.fixed = false;

		this.pressureDelay = 0.5;
		this.pressure = 0;
		this._selected = false;
		this.blink = 0.1;
	},
	set type (v) {
		if (v !== this._type) {
			if (this._oType === 0) {
				this._oType = v;
			}
			this._type = v;
			this.rx = (--v % (sprite.width / E)) * E;
			this.ry = M.floor(v / (sprite.width / E)) * E;
		}
	},

	get type () {
		return this._oType;
	},

	set selected (v) {
		
		//G.remove(c);
		this.pressure = 1.4;
		this._selected = v;
	},

	get selected () {
		return this._selected;
	},

	free: function() {
		this.gravity = 10;
	},

	onAnimLoop: function() {

	},

	update: function(dt) {
		
		this.x = this.cx;

		if (this.spriteAnim.length > 0) {
			var t = this.spriteAnim[this.sc];
			this.rx = ((t - 1) % (sprite.width / E)) * E;
			this.ry = M.floor((t - 1) / (sprite.width / E)) * E;
			this.anim -= dt;
			if (this.anim <= 0) {
				this.anim = this.animSpeed;
				this.sc = (this.sc + 1) % this.spriteAnim.length;
				if (this.sc === 0) {
					this.onAnimLoop();
				}
			}
		} 

		if (this.pressure > 0) {
			if ((this.pressureDelay -= dt) <= 0) {
				this.pressureDelay = 0.5;
				if ((this.pressure -= 1) <= 0) {
					G.remove(this);
				}
			}
		}

		// init
		if (this.y < G.grid.r - 1) {
			if (G.grid.get(this.x, this.y + 1) === 0) {
				this.cy += this.gravity * dt;
				if (this.cy > this.y) {
					this.y += 1;
				}
			} else {
				this.cy = this.y;
			}
		} else {
			this.y = G.grid.r - 1;
			this.cy = this.y;
		}

		if (this.selected) {
			if ((this.blink -= dt) < 0) {
				this.blink = 0.1;
			}
		}
	},
	render: function(ctx) {
		ctx = ctx || G.context;
		if (this.blink === 0.1) {
			//console.log('element', this.type, this.rx, this.ry);
			ctx.drawImage(sprite, this.rx, this.ry, 10 , 10, ~~this.cx * E, ~~this.cy * E, 10, 10);
		}
		/*
		if (this.selected) {
			ctx.strokeStyle = "white";
			ctx.strokeRect(this.cx * E, this.cy * E, 10, 10);
		}
		*/
	},

	collide: function(e) {
		
	},

	replace: function(Class) {
		var e = G.add(Class.new(this.x, this.y));
		G.remove(this);
		return e;
	}
});