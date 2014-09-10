// http://www.html5canvastutorials.com/


/* global G, Stats, Canvas */
/* jshint unused: false */

var M = Math,
	E = 10,
	start = 0,
	Z = 0.1, // Zero
	sprite, startup, score, glasspane, level;

var MyElements = {};
MyElements.EMPTY = 0;
MyElements.WATER = 1;
MyElements.FIRE = 2;
MyElements.EARTH = 3;
MyElements.ROCK = 4;
MyElements.AIR = 5;
MyElements.GRASS = 6;
MyElements.PLANTS = 7;
MyElements.HEAD_PLANTS = 8;
MyElements.FLOWER = 9;
MyElements.LAVA = 10;
MyElements.ICE = 11;
MyElements.FIRE_BASE = 42;
MyElements.BURNED_PLANTS = 13;
MyElements.BURNED_GRASS = 14;
MyElements.CLOUD = 17;


// for random generation
MyElements.g = [
	MyElements.EARTH,
	MyElements.EARTH,
	MyElements.EARTH,
	MyElements.WATER,
	MyElements.WATER,
	MyElements.FIRE,
	MyElements.FIRE,
	MyElements.AIR
];

function tic(dt) {
  	var p = (dt - start) / 1000;
  	start = dt;

	window.stats.begin();
	G.update(p);
	G.render();
	window.requestAnimationFrame(tic);

	window.stats.end();
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
	addStats(); // debug
	
	level = document.getElementById('level');
	score = document.getElementById('score');

	sprite = document.getElementById('sprite');
	var canvas = document.getElementById('game');

	var glasspaneElement = document.getElementById('glasspane');
	G.glasspane = canvas.getContext("2d");

	G.width = canvas.width;
	G.height = canvas.height;
	G.scale = 4;

	// Add event listener for `click` events.
	canvas.addEventListener('click', function(event) {
        G.onclick(event.pageX, event.pageY);
    });

	G.context = canvas.getContext("2d");
	Canvas.pixelate(canvas);
	G.context.scale(G.scale, G.scale);

	G.load(function() {
		window.requestAnimationFrame(tic);
		G.sw = G.width / G.scale;
		G.sh = G.height / G.scale;
	});
};

