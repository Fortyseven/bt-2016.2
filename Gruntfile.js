'use strict';

module.exports = function(grunt) {

    // var config = {
    //     path_js: "scripts/"
    // };

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // jshint: {
        //     options: {
        //         reporter: require('jshint-stylish')
        //     },
        //     build: ['src/' + config.path_js + '**/*.js']
        // },
        clean: {
            dist: {
                options: {
                    force: true
                },
                files: [{
                    dot: true,
                    src: [
                        'dist/{,*/}*',
                        '!dist/.git{,*/}*'
                    ]
                }]
            }
        },

        copy: {
            assets: {
                files: [{
                    expand: true,
                    flatten: false,
                    dot: true,
                    cwd: 'src/assets/',
                    dest: 'dist/assets/',
                    src: ['**/*.*']
                }]
            },
            fonts: {
                files: [{
                    expand: true,
                    flatten: false,
                    dot: true,
                    cwd: 'src/styles/fonts/',
                    dest: 'dist/styles/fonts/',
                    src: ['**/*.*']
                }]
            },
			scripts: {
                files: [{
                    expand: true,
                    flatten: false,
                    dot: true,
                    cwd: 'src/scripts/',
                    dest: 'dist/scripts/',
                    src: ['**/*.*']
                }]
            }
        },

        less: {
            build: {
                files: {
                    'dist/styles/main.css': 'src/styles/main.less',
                    'dist/styles/desktop/desktop.css': 'src/styles/desktop/desktop.less',
                    'dist/styles/mobile/mobile.css': 'src/styles/mobile/mobile.less',
                }
            }
        },

        cssmin: {
            build: {
                files: {
                    'dist/styles/main.min.css': 'dist/styles/main.css'
                }
            }
        },

        uglify: {
            options: {
                banner: '/* <%= pkg.name =%> is a butt <%= grunt.template.today("yyyy-mm-dd) %> */\n'
            },
            // build: {
            //     files: {
            //         'dist/' + config.path_js + '/main.js'
            //     }
            // }
        },

        twigRender: {
            options: {

            },
            main: {
                files: [{
                    data: "src/views/data/data.json",
                    expand: true,
                    cwd: "src/views/pages/",
                    src: ["**/*.twig", "!**/_*.twig"],
                    dest: "dist/",
                    ext: ".html"
                }]
            }
        },

        watch: {
            styles: {
                files: ['src/**/*.less', ],
                tasks: ['less', 'cssmin', 'copy']
            },
            pages: {
                files: ['src/**/*.twig', ],
                tasks: ['twigRender:main', 'copy']
            },

        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-twig-render');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    /******** Register Tasks *************/
    grunt.registerTask('default', ['clean', 'less', 'cssmin', 'twigRender:main', 'copy']);

};
