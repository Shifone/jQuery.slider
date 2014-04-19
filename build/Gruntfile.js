module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),
		banner:'/*! \n * <%= pkg.description %>\n * Author:<%= pkg.author.name %>\n * Website:<%= pkg.author.homepage %>\n * Version:<%= pkg.version %> \n * Date:<%= grunt.template.today("yyyy-mm-dd") %> \n * License:<%= pkg.licenses.url %> \n */\n',
		
		concat: {
			options: {
				stripBanners: true
				//banner : '<%= banner %>'
			},
			shifone: {
				src: ['<%= pkg.baseDir %>/css/src/animate.css','<%= pkg.baseDir %>/css/src/jquery.slider.css'],
				dest: 'tmp/jquery.slider.css'
			}
		},
		
		clean: {
			options: {
				force:true
			},
			build: {
				src: ["<%= pkg.baseDir %>js/lib/**.js","<%= pkg.baseDir %>css/**.css"]
			}
		},
		
		jshint: {
			all: ['<%= pkg.baseDir %>js/src/jquery.slider.js']
		},
		
		uglify : {
			shifone:{
				options : {
					preserveComments: false,
					//sourceMap: "<%= pkg.baseDir %>js/lib/client.min.map",
					//sourceMappingURL: "client.min.map",
					report: "min",
					beautify: {
							ascii_only: true
					},
					compress: {
						hoist_funs: false,
						loops: false,
						unused: false
					},
					banner : '<%= banner %>'
				},
				
				files:{
					'<%= pkg.baseDir %>js/lib/jquery.slider.min.js':'<%= pkg.baseDir %>js/src/jquery.slider.js'
				}
			},
			others:{
				files:{
					'<%= pkg.baseDir %>js/lib/jquery-1.11.0.min.js':'<%= pkg.baseDir %>js/src/jquery-1.11.0.js'
				}
			}
			
		},
		cssmin: {
			shifone: {
				options: {
					banner : '<%= banner %>'
				},
				files: {
					'<%= pkg.baseDir %>css/jquery.slider.css':'tmp/jquery.slider.css'
				}
			}
		}
	});
	
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	//grunt.loadNpmTasks('grunt-contrib-copy');
	//grunt.loadNpmTasks('grunt-contrib-htmlmin');

	// 默认任务
	grunt.registerTask('default', ['concat','clean','jshint','uglify','cssmin']);
}; 
