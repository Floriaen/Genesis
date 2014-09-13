// http://www.html5canvastutorials.com/


/* global G, Stats, Canvas */
/* jshint unused: false */

var M = Math,
	E = 10,
	start = 0,
	Z = 0.1, // Zero
	sprite, startup, score, glasspane, level;

document.$ = document.getElementById;

var Me = {};
Me.EMPTY = 0;
Me.WATER = 1;
Me.FIRE = 2;
Me.EARTH = 3;
Me.ROCK = 4;
Me.AIR = 5;
Me.GRASS = 6;
Me.PLANTS = 7;
Me.HEAD_PLANTS = 8;
Me.FLOWER = 9;
Me.LAVA = 10;
Me.ICE = 11;
Me.FIRE_BASE = 42;
Me.BURNED_PLANTS = 13;
Me.BURNED_GRASS = 14;
Me.CLOUD = 17;


// for random generation
Me.g = [
	Me.EARTH,
	Me.WATER,
	Me.WATER,
	Me.WATER,
	Me.FIRE,
	Me.FIRE,
	Me.FIRE,
	Me.AIR,
	Me.AIR
];

function tic(dt) {
	var p = (dt - start) / 1000;
	start = dt;

	//window.stats.begin();
	G.update(p);
	G.render();
	window.requestAnimationFrame(tic);
	//window.stats.end();
}

function addStats() {
	window.stats = new Stats();
	window.stats.setMode(0); // 0: fps, 1: ms

	// Align top-left
	window.stats.domElement.style.position = 'absolute';
	window.stats.domElement.style.left = '300px';
	window.stats.domElement.style.top = '0px';

	document.body.appendChild(window.stats.domElement);
}

window.onload = function() {
	//addStats(); // debug
	
	level = document.getElementById('level');
	score = document.getElementById('score');

	sprite = document.getElementById('sprite');
	var canvas = document.getElementById('game');

	var glasspaneElement = document.getElementById('glasspane');
	G.glasspane = canvas.getContext("2d");

	G.width = canvas.width;
	G.height = canvas.height;
	G.scale = 4;

	G.context = canvas.getContext("2d");
	Canvas.pixelate(canvas);
	G.context.scale(G.scale, G.scale);

	G.sw = G.width / G.scale;
	G.sh = G.height / G.scale;
	G.load(function() {
		window.requestAnimationFrame(tic);
		G.gameOver = true;
	});
};

