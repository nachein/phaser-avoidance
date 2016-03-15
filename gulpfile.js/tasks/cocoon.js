'use strict';

module.exports = function (gulp, $, config) {

  var files = config.files,
      dirs = config.dirs,
      sequence = require('run-sequence');

  gulp.task('copy-www', function(){
    return gulp.src([files.dist])
      .pipe(gulp.dest(dirs.distCocoonWWW));
  });
  gulp.task('copy-cocoonjs', function(){
    return gulp.src([files.cocoon])
      .pipe(gulp.dest(dirs.distCocoon));
  });

  // gulp.task('cocoon', ['dist:clean', 'dist:assets', 'dist:phaser', 'dist:scripts'], function(done){
  //   gulp.start([
  //     'copy-www',
  //     'copy-cocoonjs'
  //   ], done);
  // });

  gulp.task('cocoon', function(cb){
    sequence('dist:clean',
      'dist:assets',
      'dist:phaser',
      'dist:scripts',
      ['copy-www', 'copy-cocoonjs'],
      cb);
  });

}