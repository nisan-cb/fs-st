const gulp = require('gulp');
const clean = require('gulp-clean');
const rename = require('gulp-rename');
const { exec } = require('child_process');


// Removes previous dist
gulp.task('clean', () => {
    return gulp.src('./build', { allowEmpty: true })
        .pipe(clean());
});


// Initial ts compile
gulp.task('tsc', cb => {
    exec('tsc', () => cb());
});

// Watch ts files and recompile
gulp.task('tsc-w', () => {
    const tsc = exec('tsc -w --preserveWatchOutput --pretty');

    tsc.stdout.on('data', data => console.log(data));
    tsc.stderr.on('data', data => console.error(data));

    tsc.on('close', code => console.log(`tsc exited with code ${code}`));
});

// Start express
gulp.task('express', () => {
    const tsc = exec('nodemon --watch ./src ./src/server.ts');
    tsc.stdout.on('data', data => console.log(data));
    tsc.stderr.on('data', data => console.error(data));
});

// copy-server-files to deploy folder
gulp.task('copy-server-files', () => {
    return gulp.src([
        './package.json',
        './package-lock.json',
        './Procfile',
    ])
        .pipe(gulp.dest('../deploy'));
});

// Build server
gulp.task('build', gulp.series(
    'clean',
    'tsc',
    'copy-server-files'
));


// Run all (without express)
gulp.task('dev', gulp.series(
    // 'build',
    gulp.parallel(
        'tsc-w',
    ),
));

// Run all together
gulp.task('default', gulp.series(
    // 'build',
    gulp.parallel(
        'tsc-w',
        'express',
    ),
));
