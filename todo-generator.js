const gulp = require('gulp');
const todo = require('gulp-todo');

async function doit() {
  return new Promise((resolve, reject) => {
    console.log('Circling through all files, this may take a while...');
    console.time('TODO generation time');
    gulp.src(['**/*.js', '**/**/*.js', '**/**/**/*.js', '*.js', '!node_modules', '!node_modules/**'])
      .pipe(todo())
      .on('error', reject)
      .pipe(gulp.dest('./'))
      .on('end', resolve);
  });
}

doit().then(() => {
  console.log('Finished, created TODO.md');
  console.timeEnd('TODO generation time');
});
