/*
* 初始化项目 执行``` grunt ```
* 优化项目 执行 ```  grunt build ```
* 开发测试 执行 ``` grunt server ``` 
* 单独监听sass 执行 ``` grunt listen ```
* */
module.exports = function(grunt) {
	// 项目配置
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		//复制文件
		copy: {
			main: {
				expand: true,
				cwd: 'src/',
				src: '**/*.js',
				dest: 'build/js',
				flatten: true,
				filter: 'isFile',
			},
		},
		//合并文件
		concat: {
			css: {
				src: 'build/css/**.css',
				dest: 'build/css/main.css'
			},
			js: {
				src: 'build/js/**.js',
				dest: 'build/js/main.js'
			}
		},
		connect: {
			server: {
				options: {
					port: 4000,
					base: '.',
					//当前目录
					hostname: '127.0.0.1',
					livereload: true,
					open: 'http://127.0.0.1:4000/index.htm',
				}
			}
		},
		watch: {
			css: {
				files: 'src/**/*.css',
				tasks: ['connect', 'concat', 'cssmin'],
				options: {
					livereload: true,
				}
			},
			js: {
				files: 'src/**/*.js',
				tasks: ['concat', 'uglify'],
				options: {
					livereload: true,
				}
			},
			sass: {
				files: 'src/**/*.scss',
				//如果有compass框架
				tasks: ['compass:dev'],
				options: {
					livereload: true,
				}
			},
			//监听所有文件
			allWtach: {
				files: ['src/**/*.scss', 'src/**/*.js'],
				tasks: ['compass:dev', 'copy'],
				options: {
					livereload: true,
				},
			},
		},
		//sass
		sass: {
			dist: {
				files: {
					'build/css/main.css': 'src/**/*.scss',
				},
				tasks: ['compass:dev'],
			},
		},
		compass: { // Task
			dev: { // Another target
				options: {
					sassDir: 'src/sass',
					cssDir: 'build/css/',
					environment: 'production',
					outputStyle: 'expanded'
				}
			},
			dist: { // 一个子任务
				options: { // 任务的设置
					sassDir: 'src/sass',
					cssDir: 'build/css/',
					environment: 'production'
				}
			},
		},
		//压缩js
		uglify: {
			build: {
				src: 'build/js/main.js',
				dest: 'build/js/main.min.js'
			}
		},
		//压缩css
		cssmin: {
			build: {
				src: 'build/css/main.css',
				dest: 'build/css/main.min.css'
			}
		},

	});

	// 加载提供"uglify"任务的插件
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-compass');
	//node服务器
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// 默认任务
	grunt.registerTask('default', ['compass', 'copy']);

	//优化任务
	grunt.registerTask('build', ['concat', 'cssmin', 'uglify']);

	//开启一个node服务器监听css js 
	grunt.registerTask('server', ['connect', 'watch:allWtach']);
	 
	//完成预览
	grunt.registerTask('ok', ['connect','watch']);

	//监听sass
	grunt.registerTask('listen', ['connect', 'watch:sass']);
}
