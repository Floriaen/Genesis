/* jshint unused: false */
/* global _Element, ElementFactory, Me, Input, M, document.$, E, Grid, startup, sprite,
Grass, score, Water, Flower, Grass, Earth, Region, Plants, Fire, Rock, Eye, Ice, HeadPlants, level, Lava, Canvas */
var G = {
	width: 0,
	height: 0,
	scale: 4,
	sw: 0,
	sh: 0,
	context: null,
	color: '#2C2C2C',

	ent: null,
	ent2: null,
	
	entities: [],
	grid: null,

	delay: 0,
	ceDelay: 0.1,

	ce: null,
	requestElement: 0,

	_cleanRequested: false,

	score: 0,
	gameOver: false,

	collideDelay: 0.2,

	shadows: {},

	dx: 0,

	level: 0,
	levels: [
		{
			elementCount: 30 / 4,
			elementSpeed: 0.3,
			c: "#23758C"
		},
		{
			elementCount: 60 / 4,
			elementSpeed: 0.29,
			c: "#42B665"
		},
		{
			elementCount: 90 / 4,
			elementSpeed: 0.28,
			c: "#E28A32"
		},
		{
			elementCount: 120 / 4,
			elementSpeed: 0.25,
			c: "#E24A32"
		},
		{
			elementCount: 130 / 4,
			elementSpeed: 0.22,
			c: "#9B1800"

		},
		{
			elementCount: 150 / 4,
			elementSpeed: 0.2,
			c: "#2A0700"
		}
	],

	_initShadows: function() {
		var e = null;
		for (var el in Me) {
			var c = Canvas.get(10, 10);
			Canvas.pixelate(c);
			e = Me[el];

			var x = ((e - 1) % (sprite.width / E)) * E;
			var y = M.floor((e - 1) / (sprite.width / E)) * E;
			c.getContext('2d').drawImage(sprite, x, y, 10 ,10, 0, 0, 10, 10);
			this.shadows[e] = Canvas.createAlphaMask('#000000', c, 0, 0, 10, 10);
		}
	},

	load: function(onload) {
		onload();
		this.grid = new Grid(this.sw / E, this.sh / E);
		//this.add(Lava.new(3, this.grid.r - 1));
		var i = 0;
		for (var j = 1; j < 3; j++) {
			for (i = 0; i < this.grid.c; i++) {
				this.add(Earth.new(i, this.grid.r - j));
			}
		}

		this.add(Eye.new());

		G.get(0, this.grid.r - 2).replace(Grass);
		this.add(Plants.new(0, this.grid.r - 3));
		G.get(1, this.grid.r - 2).replace(Ice);
		G.get(1, this.grid.r - 1).replace(Ice);

		this.add(Earth.new(3, this.grid.r - 3));
		this.add(Earth.new(4, this.grid.r - 3));
		this.add(Grass.new(5, this.grid.r - 3));
		this.add(Plants.new(5, this.grid.r - 4));

		this.add(Fire.new(2, this.grid.r - 3));
		this.add(Water.new(6, this.grid.r - 3));
		this.add(Water.new(7, this.grid.r - 3));

		G.get(6, this.grid.r - 2).replace(Rock);
		G.get(7, this.grid.r - 2).replace(Rock);

		this.add(Grass.new(4, this.grid.r - 4));
		this.add(Plants.new(4, this.grid.r - 5));

		// update grid:
		var c = null;
		this.grid.empty();
		var l = this.entities.length;
		for (i = 0; i < l; i++) {
			c = this.entities[i];
			//c.update(0);
			//this.grid.set(c.x, c.y, c.type);
		}

		this.dx = 0;

		this.ent = Canvas.get(G.width, G.height);
		this.ent2 = Canvas.get(G.width, G.height);

		this._initShadows();
	},

	// debug
	onclick: function(x, y) {
		//console.log('click tile', x, y);
		x = ~~(((x) / G.scale) / E);
		y = ~~((y / G.scale) / E);
		
		var tr = -1;
		var l = this.entities.length;
		var e = null;
		for (var i = 0; i < l; i++) {
			e = this.entities[i];
			if (e.x === x && e.y === y) {
				this.remove(e);
				break;
			}
		}
	},

	get: function(x, y) {
		var l = this.entities.length, c = null;
		for (var i = 0; i < l; i++) {
			c = this.entities[i];
			if (c.x === x && c.y === y) {
				return c;
			}
		}
		return null;
	},

	displayCount: function(x, y, v) {
		console.log('displayCount', x, y, v);
		var c = document.createElement('div');
		c.innerHTML = '+ ' + v;
		c.style.fontSize = '20px';
		c.style.position = "absolute";
		c.style.left = x + "px";
		c.style.top = y + "px";
		c.style.color = 'white';
		document.$('gameContent').appendChild(c);
		setTimeout(function() {
			document.$('gameContent').removeChild(c);
		}, 800);
	},

	update: function(dt) {

		if (this.gameOver === true) {
			return;
		}

		var i = 0;

		// levels up?
		var cl = null;
		for (i = this.level; i < this.levels.length - 1; i++) {
			cl = this.levels[i];
			if (ElementFactory.c > cl.elementCount) {
				//console.log('UP', 'current', ElementFactory.c, 'limit', cl.elementCount);
				this.level = i + 1;
				break;
			}
		}
		cl = this.levels[this.level];
		this.ceDelay = cl.elementSpeed;
		
		if (this._cleanRequested) {
			this._cleanRequested = false;
			this._cleanEntities();
		}

		var l = this.entities.length;
		var c = null;

		// update grid:
		this.grid.empty();
		for (i = 0; i < l; i++) {
			c = this.entities[i];
			this.grid.set(c.x, c.y, c.type);
		}

		for (i = 0; i < l; i++) {
			c = this.entities[i];
			c.update(dt);
		}

		// update to know if some block must be changed
		if ((this.collideDelay -= dt) < 0) {
			this.collideDelay = 0.2;
			var t = 0;
			for (i = 0; i < l; i++) {
				c = this.entities[i];
				if (!c.selected) {
					t = this.grid.get(c.x, c.y + 1);
					// test the entity above each one:
					if (t !== 0) {
						var ne = this.get(c.x, c.y + 1);
						if (ne) {
							c.collide(ne);	
						}
					}
				}
			}	
		}
		
		if (this.requestElement > 0) {
			this.requestElement -= dt;
			if (this.requestElement <= 0) {
				if (this.ce) {
					this.ce.free();
					this.ce = null; // next frame a new element will be spawn
				}

				var polygon = [];
				var el = null, cost = 0, x = 0, y = 0;
				var chain = this.grid.getChain();
				for (i = 0; i < chain.length; i++) {
					for (var j = 0; j < chain[i].length; j++) {
						if (chain[i][j] === 1) {
							el = this.get(j, i);
							if (el) {
								polygon.push({x: j, y: i});
								el.selected = true;
								cost += el.cost;
							} 
						}
					}
				}

				if (cost > 0) {
					var ct = null;
					if (polygon.length === 1) {
						ct = polygon[0];
					} else {
						var region = new Region(polygon);
						ct = region.centroid();
						if (isNaN(ct.x) || isNaN(ct.y)) {
							ct = polygon[0];
						}
 					}
					this.displayCount(ct.x * E * G.scale, ct.y * E * G.scale, cost);
					G.score += cost;
				}
			}
		}		

		if (this.ce) this.ce.gravity = (Input.keys.d) ? 20: 0;

		if (this.requestElement <= 0) {
			// current element:
			if (this.ce === null) {
				//this.ce = this.add(ElementFactory.getRandom(~~(Math.random() * 10), 0));
				this.ce = this.add(ElementFactory.getRandom(4 + ~~(Math.random() * 1), 0));
				this.ce.free();
			}

			if (this.ce._toRemove === true) {
				this.requestElement = cl.elementSpeed * 2;
				this.ce.free();
				this.ce = null;
			} 

			if (this.ce && this.ce.gravity === 0) {

				var dx = this.dx;
				this.dx = 0;
				if (Input.keys.r) {
					dx = 1;
				} else if (Input.keys.l) {
					dx = -1;
				}

				if ((this.delay -= dt) <= 0) {
					this.delay = this.ceDelay;
					
					// check if move is possible
					if (this.grid.get(this.ce.x + dx, this.ce.y + 1) > 0 || this.ce.y === G.grid.r - 1) {
						if (this.grid.get(this.ce.x, this.ce.y + 1) > 0) {
							// we can't move down
							if (this.ce.y === 0) {
								// GAME OVER
								this.gameOver = true;
								document.$('gameOver').style.display = "block";
								
							} else {
								this.dx = 0;
								this.requestElement = cl.elementSpeed * 2;
							}
							//var a = new Audio("hurt.wav");
							//a.volume = 0.5;
							//a.play();

						} else {
							this.ce.cy += 1;//0.5;
						}
					} else {
						this.ce.cx += dx;
						this.ce.cy += 1;// 0.5;
					}	
					
									
				} else {
					this.dx = dx;
				}
			}
		}

		level.innerHTML = "LEVEL " + (this.level + 1);
		score.innerHTML = this.score;
	},
	
	render: function() {
		this.context.clearRect(0, 0, this.width, this.height);
		this.context.fillStyle = this.color;
		this.context.fillRect(0, 0, this.width, this.height);

		var e = this.ent.getContext('2d');
		e.clearRect(0, 0, this.width, this.height);

		var e2 = this.ent2.getContext('2d');
		e2.clearRect(0, 0, this.width, this.height);
		e2.globalAlpha = 0.4;

		// draw shadows:
		var et = null, s = null;
		var l = this.entities.length;
		for (var i = 0; i < l; i++) {
			et = this.entities[i];
			et.render(e);
			if (et.blink === 0.1) {
				s = this.shadows[et._type];
				if (s) {
					e2.drawImage(s, ~~et.cx * E, ~~et.cy * E);
				}
			}
		}

		this.context.drawImage(this.ent2, -4, 0);
		this.context.drawImage(this.ent, 0, 0);
	},

	// ENGINE PART
	add: function(e) {
		this.entities.push(e);
		return e;
	},

	_cleanEntities: function() {
		var newEntities = [];
		var l = this.entities.length;
		for (var i = 0; i < l; i++) {
			if (this.entities[i]._toRemove !== true) {
				newEntities.push(this.entities[i]);
			}
		}
		this.entities = newEntities;
	},

	remove: function(e) {
		this._cleanRequested = true;
		e._toRemove = true;
	}
};