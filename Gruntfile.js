module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      devPath: 'dev',
      distPath: 'publish/<%= pkg.version %>'
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
          sourceMapFilename: '<%= meta.devPath %>/static/css/<%= pkg.name %>.css.map',
          banner: '<%= banner %>'
        },
        files: {
          '<%= meta.devPath %>/static/css/<%= pkg.name%>.css': '<%= meta.devPath %>/static/less/app.less'
        }
      },
      page : {
        expand: true,
        cwd: 'static/less/page/',
        src: '*.less',
        dest: '<%= meta.devPath %>/static/css/',
        ext: '.css'
      }
    },

    // cssmin: {
    //   development: {
    //     files: {
    //       '<%= meta.distPath %>/css/<%= pkg.name %>.css': '<%= meta.devPath %>/<%= pkg.name %>.css'
    //     }
    //   }
    // },

    copy: {
      fonts: {
        expand: true,
        src: '<%= meta.devPath %>/static/fonts/*',
        dest: '<%= meta.distPath%>/static/fonts'
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
    // 参考http://nomospace.com/posts/r.js-example.build.js.html
    requirejs : {
      build : {
        options : {
          appDir :　'./<%= meta.devPath %>',
          baseUrl : './',
          dir : './<%= meta.distPath %>',
          paths : {
            'avalon' : './vendor/avalon/avalon.mobile.shim',
            'mmRequest' : './vendor/avalon/mmRequest.modern',
            'mmPromise' : './vendor/avalon/mmPromise',
            'mmRouter' : './vendor/avalon/mmRouter',
            'mmHistory' : './vendor/avalon/mmHistory',
            'text' : './vendor/require/text',
            'domReady' : './vendor/require/domReady',
            'css' : './vendor/require/css',

            //view
            'index' : './views/index.html',
            'news' : './views/news.html',
            'pro' : './views/pro.html',
            'home' : './views/home.html',
            'login' : './views/login.html',
            'sginIn' : './views/sginIn.html',
            'newCon' : './views/newCon.html',
            'proCon' : './views/proCon.html',

            //entry
            'app' : './app',

            //contraller
            'indexCtrl' : './static/js/controller/index',
            'newsCtrl' : './static/js/controller/news',
            'proCtrl' : './static/js/controller/pro',
            'newConCtrl' : './static/js/controller/newCon',
            'proConCtrl' : './static/js/controller/proCon',
            'homeCtrl' : './static/js/controller/home',
            'loginCtrl' : './static/js/controller/login',            

            'md5' : './static/js/widget/md5',
            'slider' : './static/js/widget/sliders'
          },
          shim: {
            avalon : {
              exports : 'avalon'
            }
          },
          optimizeCss : 'standard.keepLines',
          modules: [{
            name : 'app',
            include : ['text','slider']
          },{
            name : 'indexCtrl',
            exclude : ['avalon','text','slider']
          }
          ]
        }
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