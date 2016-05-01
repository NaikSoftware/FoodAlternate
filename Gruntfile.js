module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            contents: ['public/javascript/*', 'public/stylesheets/*']
        },
        browserify: {
            dist: {
                options: {
                    transform: [["babelify", {presets: ['es2015', 'react']}]]
                },
                files: {
                    'public/javascript/bundle.js': 'client/javascript/**/*.js*'
                }
            }
        },
        uglify: {
            options: {
                compress: true
            },
            compress: {
                files: [{
                    expand: true,
                    cwd: 'public/javascript/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'public/javascript/',
                    ext: '.min.js'
                }]
            }
        },
        cssmin: {
            options: {
                compress: true
            },
            compress: {
                files: [{
                    expand: true,
                    cwd: 'client/stylesheets/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'public/stylesheets/',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: '\n'
            },
            concat_js: {
                src: ['public/javascript/**/*.min.js'],
                dest: 'public/javascript/bundle.min.js'
            },
            concat_css: {
                src: ['public/stylesheets/**/*.min.css'],
                dest: 'public/stylesheets/bundle.min.css'
            }
        },
        processhtml: {
            html_edit: {
                files: {
                    '(unused)templates/index.html': 'templates/index.html',
                    '(unused)templates/header.html': 'templates/header.html'
                }
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks("grunt-browserify");
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('prod', ['clean', 'browserify', 'uglify', 'cssmin', 'concat']);
};