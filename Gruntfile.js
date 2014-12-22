module.exports = function(grunt) {
	'use strict';

	var isDevelopmentRun = !grunt.option('prod');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			files: ['src/**/*.js']
		},
		clean: {
			install: ['lib/'],
			css:['test/css/'],
			coverage: ['coverage/']
		},

		karma: {
			unit: {
				configFile: 'karma.unit.conf.js',
				singleRun: !isDevelopmentRun,
				autoWatch: isDevelopmentRun,
				browsers: ['PhantomJS'],
				coverageReporter: {
					reporters: [
						{
							type: 'html',
							dir: 'coverage'
						}, {
							type: 'text-summary'
						}
					]
				}
			}
		},
		stylus: {
			compile: {
				files: {
					'test/css/test.css': ['lib/dropdown/src/styl/dropdown.styl','test/styl/selectbox.styl','src/styl/combobox.styl','test/styl/dropdown.styl','test/styl/combobox.styl' ]
				}
			}
		},
		shell: {
			bower_install: {
				command: 'node node_modules/bower/bin/bower install --force-latest'
			}
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			files: ['src/**/*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-interactive-shell');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-stylus');
	grunt.loadNpmTasks('grunt-karma');
	grunt.loadNpmTasks('grunt-jscs-checker');

	grunt.registerTask('install', ['clean:install', 'shell:bower_install']);
	grunt.registerTask('check_style', ['jscs', 'jshint']);
	grunt.registerTask('test_unit', ['clean:coverage', 'clean:css', 'stylus:compile', 'karma:unit']);
	grunt.registerTask('test', ['check_style', 'test_unit']);
	grunt.registerTask('build', ['install', 'test']);
	grunt.registerTask('default', ['build']);
};