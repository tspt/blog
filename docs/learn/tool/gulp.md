---
title: Gulp
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: tool,gulp
---

## Node 通配符

`*.less` 匹配当前文件所有 less 文件  
`**/*.less` 匹配当前目录及其子目录下的所有 less 文件  
`!demo.less` 非 demo.less 文件  
`*.+(scss|less)` 匹配当前目录的所有 scss 或 less 文件

## gulp.src(globs [, options])

类似于读取文件，返回符合匹配模式或者匹配模式的数组的文件  
**globs**  
类型：String 或 Array  
**options**  
options.buffer  
类型：Boolean，默认值为 true；设置为 false，将以 stream 方式返回 file.contents，处理大文件有用  
options.read  
类型：Boolean，默认值为 true；设置为 false，file.contents 返回 null，不会读取文件  
options.base  
类型：String，拼接在 glob 前

## gulp.dest(path [, options])

类似于输出文件，能被 pipe 进来，并且将会写文件，重新输出所有数据，如果文件夹不存在，将自动创建  
**path**  
类型：String 或 Function  
文件被写入输出目录；或函数返回相应路径。  
**options**  
options.cwd  
类型：String，默认值 process.cwd()，输出目录的 cwd 参数，只在所给的输出目录是相对路径时候有效  
options.mode  
类型：String，默认值 0777，定义所有在输出目录中所创建目录的权限

## gulp.task(name [, deps] [, fn])

创建一个任务  
**name**  
类型：String，任务名字  
**deps**  
类型：Array，一个包含任务列表的数组，这些任务会在你当前任务运行前完成。  
**fn**  
类型：Function，定义任务所要执行的主要操作

## gulp.watch(glob [, opts], tasks)

创建监听  
**glob**  
类型：String 或 Array，指定具体监控哪些文件的变动  
**opts**  
类型：Object，传给 gaze 的参数  
**tasks**  
类型：Array，需要在文件变动后执行一个或多个通过 gulp.task()创建的 task 名字

## gulp.watch(glob [, opts， cb])

创建监听  
**glob**  
类型：String 或 Array，指定具体监控哪些文件的变动  
**opts**  
类型：Object，传给 gaze 的参数  
**cb(event)**  
类型：Function，每次变动需要执行的 callback  
一个 event 对象，描述所监控到的变动  
event.type  
类型：String，发生的变动类型为 added，changed，deleted，renamed  
event.path  
类型：String，触发该事件的文件路径

## gulp-

**gulp-htmlmin**  
压缩 html：压缩 JavaScript、CSS，去掉页面空格、注释，删除多于属性等操作

```js
var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin'),
    minoptions = {
      minifyCSS: true,
      minifyURLS: true,
      minifyJS: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      removeScriptTypeAttributes: true
    };

gulp.task('htmlmin', function () {
  return gulp.src('src/pages/*.html)
    .pipe(htmlmin(minoptions))
    .pipe(gulp.dest('./dist/'));
});
```

**gulp-autoprefixer**  
设置前缀

```js
var gulp = require("gulp"),
  autoprefixer = require("gulp-autoprefixer");
gulp.task("autoprefixer", function () {
  return gulp
    .src("src/assets/css/*.css")
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions", "Android >= 4.0"],
        cascade: true,
        remove: true,
      })
    )
    .pipe(gulp.dest("./dist/css/"));
});
```

**gulp-clean-css**  
压缩 css 文件

```js
var gulp = require("gulp"),
  cleancss = require("gulp-clean-css");

gulp.task("cleancss", function () {
  return gulp
    .src("src/assets/css/*.css")
    .pipe(
      cleancss({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("./dist/css/"));
});
```

**gulp-less**  
编译 less 文件

```js
var gulp = require('gulp'),
    less = require('gulp-less');

gulp.task('less', function () {
  return gulp.src('src/assets/less/*.css)
    .pipe(less())
    .pipe(gulp.dest('./dist/less/'));
});
```

**gulp-babel**  
ES6 转为 ES5

```js
var gulp = require('gulp),
    babel = require('gulp-babel');

gulp.task('babel', function () {
  return gulp.src('src/assets/js/*.js)
    .pipe(babel({
      presets: ['@babel/preset-env']
    }))
    .pipe(gulp.dest('./dist/js/'));
});
```

**gulp-uglify**  
压缩 js 文件

```js
var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('compress', function () {
  return gulp.src('src/assets/js/*.js)
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js/'));
});
```

**gulp-imagemin**  
压缩图片

```js
var gulp = require("gulp"),
  imagemin = require("gulp-imagemin");

gulp.task("imagemin", function () {
  return gulp.src("src/assets/images/*").pipe(imagemin()).pipe(gulp.dest("./dist/images/"));
});
```

**gulp-if**  
判断语句

```js
var gulp = require('gulp'),
    gulpif = require('gulp-if),
    uglify = require('gulp-uglify);

var condition = Math.floor(Math.random() * 2);

gulp.task('uglify', functio () {
  return gulp.src('src/assets/js/*.js')
    .pipe(gulpif(condition, uglify()))
    .pipe(gulp.dest('./dist/js/'));
});
```

**gulp-concat**  
合并文件，指定合并后的文件名

```js
var gulp = require("gulp"),
  concat = require("gulp-concat");

gulp.task("concat", function () {
  return gulp.src("src/assets/js/*.js").pipe(concat("index.js")).pipe(gulp.dest("./dist/js/"));
});
```

**gulp-rename**  
重命名文件

```js
var gulp = require("gulp"),
  rename = require("gulp-rename");

gulp.task("rename", function () {
  return gulp.src("src/assets/js/index.js").pipe(rename("index.min.js")).pipe(gulp.dest("./dist/js/"));
});
```

**gulp-replace**  
替换文本

```js
var gulp = require("gulp"),
  replace = require("gulp-replace");

gulp.task("replace", function () {
  return gulp.src("src/assets/js/index.js").pipe(replace("myself", "herself")).pipe(gulp.dest("./dist/js/"));
});
```
