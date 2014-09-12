/* global jsfxr */
/*
	Code adapted from: http://codepen.io/jackrugile/blog/arcade-audio-for-js13k-games
*/

var aa;
(function(){
	function ArcadeAudio() {
		this.sounds = {};
	}

	ArcadeAudio.prototype.add = function( key, count, settings ) {
		this.sounds[ key ] = [];
		settings.forEach( function( elem, index ) {
			this.sounds[ key ].push( {
				tick: 0,
				count: count,
				pool: []
			} );
			for( var i = 0; i < count; i++ ) {
				var audio = new Audio();
				audio.src = jsfxr( elem );
				this.sounds[ key ][ index ].pool.push( audio );
			}
		}, this );
	};

	ArcadeAudio.prototype.play = function( key ) {
		var sound = this.sounds[ key ];
		var soundData = sound.length > 1 ? sound[ Math.floor( Math.random() * sound.length ) ] : sound[ 0 ];
		soundData.pool[ soundData.tick ].play();
		if (soundData.tick < soundData.count - 1) {
			soundData.tick++;
		} else {
			soundData.tick = 0;
		}
	};

	aa = new ArcadeAudio();
	aa.add('hurt', 1, [[0,,0.0399,,0.2989,0.2385,,-0.5403,,,,,,0.3776,,,,,1,,,,,0.5]]);
	aa.add('step', 1, [[1,,0.039,,0.1409,0.4706,,-0.6868,,,,,,0.5661,,,,,1,,,,,0.5]]);
	aa.add('shake', 5,	[[3,,0.3774,0.3842,0.2146,0.0436,,,,,,,,,,,,,1,,,,,0.5]]);
})();