var Input = {
	keys: {l: 0 , u: 0 , r: 0 , d: 0},
	onKey: function(d, e) {
		if (!e) e = window.e;
		var c = e.keyCode;
		if (e.charCode && c === 0) c = e.charCode;
		
		if (c === 37) this.keys.l = d; //left
		if (c === 38) this.keys.u = d; //up
		if (c === 39) this.keys.r = d; //rigth
		if (c === 40) this.keys.d = d; //down

		if (c === 32) this.keys.s = d; //space
	},
	onMouse: function(d, e) {
		if (!e) e = window.event;
		var c = false;
		if (e.which) c = (e.which === 1);
		else if (e.button) c = (e.button === 0);
		if (c) {
			this.mouse = d;
		}
	}
};

// setup the listeners:
document.onkeyup = function(e) { 
	Input.onKey(0, e);
};

document.onkeydown = function(e) { 
	Input.onKey(1, e); 
};

document.onmouseup = function(e){
	Input.onMouse(0, e);
};

document.onmousedown = function(e){
	Input.onMouse(1, e);
};
