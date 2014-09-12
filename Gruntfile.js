module.exports = function(grunt) {
	'use strict';

	// Project configuration.
	grunt.initConfig({
		// Metadata.
		pkg: grunt.file.readJSON('package.json'),
		banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
			'<%= grunt.template.today("yyyy-mm-dd") %>\n' +
			'<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
			'* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
			' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
		// Task configuration.
		clean: {
			files: ['dist']
		},
		concat: {
			options: {
				// separator: ';',
				 stripBanners: true
			},
			dist: {
				src: ['src/**/*.js'],
				dest: 'dist/genesis.min.js'
			},
		},
		uglify: {
			mangle: {eval: true, sort: true, toplevel: true},
    		squeeze: {dead_code: true, join_vars: true, booleans: true},
    		codegen: {quote_keys: true},
			
			dist: {
				files: {
					'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
				}
			},
		},
		jshint: {
			options: {
				jshintrc: true
			},
			gruntfile: {
				src: 'Gruntfile.js'
			},
			src: {
				src: ['src/**/*.js']
			},
			test: {
				src: ['test/**/*.js']
			},
		},
		watch: {
			gruntfile: {
				files: '<%= jshint.gruntfile.src %>',
				tasks: ['jshint:gruntfile']
			},
			src: {
				files: '<%= jshint.src.src %>',
				tasks: ['jshint:src', 'qunit']
			},
			test: {
				files: '<%= jshint.test.src %>',
				tasks: ['jshint:test', 'qunit']
			},
		},
		removelogging: {
			dist: {
				src: "dist/genesis.min.js",
				dest: "dist/genesis.min.js",

				options: {
					// see below for options. this is optional.
				}
			}
		},
		copy: {
			main: {
				files: [
					{expand: true, cwd: 'src/view/', src: ['*'], dest: 'dist/', filter: 'isFile'},
					//{expand: true, cwd: 'src/view/css/', src: ['*'], dest: 'dist/'},
					{expand: true, cwd: 'libs/', src: ['*'], dest: 'dist/'},
					{expand: true, cwd: 'assets/', src: ['triangle.png'], dest: 'dist/'},
					{expand: true, cwd: 'assets/', src: ['sprite.png'], dest: 'dist/', rename: function(dest, src) {
				        return dest + 'sprite.png';
				    }},
					{expand: true, cwd: 'assets/', src: ['hurt.wav'], dest: 'dist/'}
				]
			}
		}
	});

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks("grunt-remove-logging");
	grunt.loadNpmTasks('grunt-contrib-copy');

	// Default task.
	grunt.registerTask('default', ['jshint', 'clean', 'concat', 'copy']);
	grunt.registerTask('prod', ['jshint', 'clean', 'concat', 'removelogging', 'uglify', 'copy']);

};
