/* global Me */
function Grid(c, r) {
	console.log('New grid', c, r);
	this.cells = [];
	this.c = c;
	this.r = r;

	// init cells:
	this.empty();

	this.chain =  /((?!00)\d{1,2}.)\1{2,9}/g;
}

Grid.prototype = {
	get: function(x, y) {
		if ((x < 0 || x >= this.c) || (y < 0 || y >= this.r)) return 1;
		else return this.cells[y][x] * 1;
	},
	set: function(x, y, value) {
		/* if ((x < 0 || x >= this.c) || (y < 0 || y >= this.r)) return 1; */
		this.cells[y][x] = value < 10 ? '0' + value: value + '';
	},
	del: function(x, y) {
		this.cells[y][x] = '00';	
	},
	empty: function(data) {
		data = data || this.cells;
		for (var j = 0; j < this.r; j++) {
			data[j] = [];
			for (var k = 0; k < this.c; k++) {
				data[j][k] = '00';
			}
		}
	},

	_isChainAllowed: function(chain) {
		var tk = chain.replace('.', '') * 1;
		return Me.g.indexOf(tk) === -1;
	},

	getChain: function() {
		var r = null;
		var rslt = null;
		var t = '';
		var lm = 0;
		var i, j = 0;
		
		var chain = [];
		this.empty(chain);

		// horizontal
		for (j = 0; j < this.r; j++) {
			r = this.cells[j];
			t = r.join('.') + '.';
			
			while ((rslt = this.chain.exec(t)) !== null) {
				if (this._isChainAllowed(rslt[1])) {
					lm = rslt[0].match(/\./g).length; // how many cells founds:
					for (i = 0; i < lm; i++) {
						chain[j][i + rslt.index / 3] = 1;
					}	
				}
			}
		}

		try {
			// vertical
			for (i = 0; i < this.c; i++) {
				t = '';
				for (j = 0; j < this.r; j++) {
					t += this.cells[j][i] + '.';
				}

				while ((rslt = this.chain.exec(t)) !== null) {
					if (this._isChainAllowed(rslt[1])) {
						lm = rslt[0].match(/\./g).length; // how many cells founds:
						for (j = 0; j < lm; j++) {
							chain[j + rslt.index / 3][i] = 1;
						}
					}
				}
			}
		} catch (e) {
			console.log(e);
		}
		


		/*
		// diagonal
		var l = this.c * this.r;
		for (i = 0; i < l; i++) {
			var c = i;
			j = this.r - 1;
			t = '';
			while (j >= 0 && c >= 0) {
				var st = this.cells[j][c];
				if (st === undefined) st = 0;
				t += st + '.';
				j--;
				c--;
			}

			while ((rslt = this.chain.exec(t)) !== null) {
				lm = rslt[0].match(/\./g).length; // how many cells founds:
				r = (this.r - 1) - rslt.index / 2;
				c = i - rslt.index / 2;
				for (j = 0; j < lm; j++) {
					chain[r][c] = 1;
					r--;
					c--;
				}
			}
		}
		*/


		return chain;
	}
};