module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      devPath: 'css',
      distPath: 'dist'
    },
    // 参考http://nomospace.com/posts/r.js-example.build.js.html
    requirejs : {
      build : {
        options : {
          addDir :　'',
          baseUrl : '',
          dir : './build',
          paths : {
            'avalon' : './vendor/avalon/avalon.mobile.shim',
            'mmRequest' : './vendor/avalon/mmRequest.modern',
            'mmPromise' : './vendor/avalon/mmPromise',
            'mmRouter' : './vendor/avalon/mmRouter',
            'mmHistory' : './vendor/avalon/mmHistory',
            'text' : './vendor/require/text',
            'domReady' : './vendor/require/domReady',
            'css' : './vendor/require/css',
            'app' : './app',
            'index' : './view/index.html',
          },
          shim: {
            avalon : {
              exports : 'avalon'
            }
          },
          module: [{
            name : 'app'
          }]
        }
      } 
    },

    banner: '/*!\n' + 
            ' * =======================================\n' +
            ' * crab v<%= pkg.version %> (<%= pkg.homepage %>)\n' +
            ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * v<%= pkg.version %>\n' +
            ' * ==============================\n' +
            ' */\n',

    clean: {
      dist: '<%= meta.distPath %>'
    },

    less: {
      development:{
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: '<%= pkg.name %>.css.map',
          sourceMapFilename: '<%= meta.devPath %>/<%= pkg.name %>.css.map',
          banner: '<%= banner %>'
        },
        files: {
          '<%= meta.devPath %>/<%= pkg.name%>.css': 'css/less/app.less'
        }
      },
      page : {
        expand: true,
        cwd: 'css/less/page/',
        src: '*.less',
        dest: 'css/dev/',
        ext: '.css'
      }
    },

    cssmin: {
      development: {
        files: {
          '<%= meta.distPath %>/css/<%= pkg.name %>.css': '<%= meta.devPath %>/<%= pkg.name %>.css'
        }
      }
    },

    copy: {
      fonts: {
        expand: true,
        src: 'css/fonts/*',
        dest: '<%= meta.distPath%>'
      }
    },

    csslint: {
      options: {
        csslintrc:'css/less/.csslintrc'
      },
      src: '<%= meta.distPath %>/<%= pkg.name %>.css',
      docs: {
        options: {
          ids: false
        },
        src: '<%= meta.distPath %>/docs.css'
      }
    },
    watch: {
      client: {
        files: ['*.html','css/*.css'],
        options: {
          livereload: true
        }
      },
      less: {
        files: 'css/less/**/*.less',
        tasks: 'less'
      }
    }

  });

  require('load-grunt-tasks')(grunt, {scope: 'devDependencies'});
  require('time-grunt')(grunt);

  grunt.registerTask('dev', ['less']);
  grunt.registerTask('live', ['watch']);

}