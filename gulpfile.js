var gulp       = require('gulp'), // Подключаем Gulp
	scss         = require('gulp-sass'), //Подключаем Scss пакет,
	browserSync  = require('browser-sync'), // Подключаем Browser Sync
	concat       = require('gulp-concat'), // Подключаем gulp-concat (для конкатенации файлов)
	uglify       = require('gulp-uglifyjs'), // Подключаем gulp-uglifyjs (для сжатия JS)
	cssnano      = require('gulp-cssnano'), // Подключаем пакет для минификации CSS
	rename       = require('gulp-rename'), // Подключаем библиотеку для переименования файлов
	del          = require('del'), // Подключаем библиотеку для удаления файлов и папок
	imagemin     = require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
	pngquant     = require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
	cache        = require('gulp-cache'), // Подключаем библиотеку кеширования
	autoprefixer = require('gulp-autoprefixer');// Подключаем библиотеку для автоматического добавления префиксов
	livereload = require('gulp-livereload');

gulp.task('scss', function(){ // Создаем таск scss
	return gulp.src('app/scss/**/*.scss') // Берем источник
		.pipe(scss()) // Преобразуем scss в CSS посредством gulp-scss
		.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true })) // Создаем префиксы
		.pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
		.pipe(browserSync.reload({stream: true})) // Обновляем CSS на странице при изменении
});

gulp.task('browser-sync', function() { // Создаем таск browser-sync
	browserSync({ // Выполняем browserSync
		server: { // Определяем параметры сервера
			baseDir: 'dist' // Директория для сервера - app
		},
		notify: false // Отключаем уведомления
	});
});

gulp.task('scripts', function() {
	return gulp.src([ // Берем JS файл
		'app/js/**.js'
		])
		.pipe(gulp.dest('dist/js')); // Выгружаем в папку dist/js
});

gulp.task('css-libs', ['scss'], function() {
	return gulp.src('app/css/style.css') // Выбираем файл для минификации
		.pipe(cssnano()) // Сжимаем
		.pipe(rename({suffix: '.min'})) // Добавляем суффикс .min
		.pipe(gulp.dest('dist/css')); // Выгружаем в папку  dist/css
});

gulp.task('watch', ['build', 'browser-sync'], function() {
	// gulp.watch('app/scss/**/*.scss', ['scss']); // Наблюдение за scss файлами в папке scss
	gulp.watch('app/scss/**/*.scss', ['build']); // Наблюдение за scss файлами в папке scss
	// gulp.watch('app/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
	gulp.watch('app/*.html', ['build']); // Наблюдение за HTML файлами в корне проекта
	// gulp.watch('app/js/**/*.js', browserSync.reload);   // Наблюдение за JS файлами в папке js
	gulp.watch('app/js/**/*.js', ['build']);   // Наблюдение за JS файлами в папке js
});

gulp.task('clean', function() {
	return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
	return gulp.src('app/img/**/*') // Берем все изображения из app
		// .pipe(cache(imagemin({ // С кешированием
		.pipe(imagemin({ // Сжимаем изображения без кеширования
			interlaced: true,
			progressive: true,
			svgoPlugins: [{removeViewBox: false}],
			use: [pngquant()]
		 }))/**/
		.pipe(gulp.dest('dist/img')); // Выгружаем на продакшен
});

gulp.task('build', ['clean', 'css-libs', 'img', 'scss', 'scripts'], function() {

	var buildCss = gulp.src('app/css/**/*')// Переносим css в продакшен
	.pipe(gulp.dest('dist/css'))

	var buildFonts = gulp.src('app/fonts/**/*') // Переносим шрифты в продакшен
	.pipe(gulp.dest('dist/fonts'))

	var buildJs = gulp.src('app/js/**/*') // Переносим скрипты в продакшен
	.pipe(gulp.dest('dist/js'))

	var buildHtml = gulp.src('app/*.html') // Переносим HTML в продакшен
	.pipe(gulp.dest('dist'));

	browserSync.reload()

});

gulp.task('clear', function (callback) {
	return cache.clearAll();
})

gulp.task('default', ['watch']);
