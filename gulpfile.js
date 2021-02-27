"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const imagemin = require("gulp-imagemin");
const imageminJpegtran = require('imagemin-jpegtran');
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const posthtml = require("gulp-posthtml");
const include = require("posthtml-include");
const del = require("del");
const rollup = require("gulp-better-rollup");

gulp.task("css", () => {
	return gulp
		.src("source/less/style.less")
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(less())
		.pipe(postcss([autoprefixer()]))
		.pipe(csso())
		.pipe(rename("style.min.css"))
		.pipe(sourcemap.write("."))
		.pipe(gulp.dest("build/css"))
		.pipe(server.stream());
});

gulp.task("server", () => {
	server.init({
		server: "build/",
		notify: false,
		open: true,
		cors: true,
		ui: false,
	});

	gulp.watch("source/less/**/*.less", gulp.series("css"));
	gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
	gulp.watch("source/*.html", gulp.series("html", "refresh"));
	gulp.watch(
		["source/js/main.js", "source/js/**/**/**/*.js"],
		gulp.series("js-main", "refresh")
	);
});

gulp.task("refresh", (done) => {
	server.reload();
	done();
});

gulp.task("images", () => {
	return gulp
		.src("source/img/**/*.{png,jpg,svg}")
		.pipe(
			imagemin([
				imagemin.optipng({ optimizationLevel: 3 }),
				imageminJpegtran(),
				imagemin.svgo(),
			])
		)

		.pipe(gulp.dest("source/img"));
});

gulp.task("webp", () => {
	return gulp
		.src("source/img/**/*.{png,jpg}")
		.pipe(webp({ quality: 90 }))
		.pipe(gulp.dest("source/img"));
});

gulp.task("sprite", () => {
	return gulp
		.src("source/img/icon-*.svg")
		.pipe(svgstore({ inlineSvg: true }))
		.pipe(rename("sprite_auto.svg"))
		.pipe(gulp.dest("build/img"));
});

gulp.task("html", () => {
	return gulp
		.src("source/*.html")
		.pipe(posthtml([include()]))
		.pipe(gulp.dest("build"));
});

gulp.task("copy", () => {
	return gulp
		.src(["source/fonts/**/*.{woff,woff2}", "source/img/**", "source//*.ico"], {
			base: "source",
		})
		.pipe(gulp.dest("build"));
});

gulp.task("js-main", () => {
	return (
		gulp
			.src("source/js/main.js")
			.pipe(sourcemap.init())
			.pipe(rollup({}, "iife"))
			.pipe(sourcemap.write(""))
			.pipe(gulp.dest("build/js"))
	);
});

gulp.task("clean", () => {
	return del("build");
});

gulp.task(
	"build",
	gulp.series("clean", "copy", "css", "sprite", "html", "js-main")
);
gulp.task("start", gulp.series("build", "server"));
