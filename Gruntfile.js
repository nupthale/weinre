module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		watch: {
			livereload:{
				options:{
					livereload:true
				},
				files:[
					'static/*.html'
				]
			},
			markdown:{
				files:['static/*.md'],
				tasks:['markdown']
			}
		},
		weinre: {
			dev: {
				options: {
					httpPort: 8082,
					boundHost: '-all-'
					// boundHost:'10.68.124.177'
				}
			}
		},
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				//change this to '0.0.0.0' to access the server from outside
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function(connect) {
						return [
							connect.static('static')
						];
					}
				}
			}
		},
		concurrent: {
			dist: ['weinre','watch']
		},
		markdown:{
			all:{
				files:[
				{
					expand:true,
					src:'static/*.md',
					dest:'static/',
					ext:'.html'
				}]
			}
		}
	});

	grunt.registerTask('default', ['connect','concurrent']);
};