const {src, dest, task, series, watch, parallel} = require("gulp");
const rm = require("gulp-rm");
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const browserSync = require("browser-sync").create();
const reload = browserSync.reload
const sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
//const px2rem = require('gulp-smile-px2rem');
const gcmq = require('gulp-group-css-media-queries');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
//const svgo = require("gulp-svgo")
//const svgSprite = require("gulp-svg-sprite");
const gulpif = require('gulp-if');
const env = process.env.NODE_ENV;

sass.compiler = require("node-sass");

task("clean", () => {    
    return src("dist/**/*", {read: false}).pipe(rm());
});

task("copy:html", () => {
    return src("src/*.html")
    .pipe(dest("dist"))
    .pipe(reload({stream:true}));    
});


const styles =[
    "node_modules/normalize.css/normalize.css",
    "src/css/components/main.scss"
]

task("styles", () => {
    return src(styles)
    .pipe(sourcemaps.init())
    .pipe(gulpif(env == "dev", sourcemaps.init()))
    .pipe(concat('main.min.scss'))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    //.pipe(px2rem())
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(gcmq())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/css/components'))
    .pipe(reload({stream: true}));
});

const libs = [
   // "node_modules/jquery/dist/jquery.js",
    "src/js/*.js"
]

task("scripts", ()=> {
    return src (libs)
    .pipe(sourcemaps.init())
    .pipe(concat('main.js', {newLine: ";"}))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(dest('dist/js'))
    .pipe(reload({stream: true}));
});

//

task("icons", () => {
    return src("src/img/*.*")
    .pipe(dest('dist/img'))
    .pipe(reload({stream:true}));    
});

task("decoration", () => {
    return src("src/img/decoration/*.*")
    .pipe(dest('dist/img/decoration'))
    .pipe(reload({stream:true}));    
});

task("icon", () => {
    return src("src/img/icons/*.*")
    .pipe(dest('dist/img/icons'))
    .pipe(reload({stream:true}));    
});

task("product", () => {
    return src("src/img/product/*.*")
    .pipe(dest('dist/img/product'))
    .pipe(reload({stream:true}));    
});

task("product_icon", () => {
    return src("src/img/product/icons/*.*")
    .pipe(dest('dist/img/product/icons'))
    .pipe(reload({stream:true}));    
});

task("reviews", () => {
    return src("src/img/reviews/*.*")
    .pipe(dest('dist/img/reviews'))
    .pipe(reload({stream:true}));    
});

task("socials", () => {
    return src("src/img/socials/*.*")
    .pipe(dest('dist/img/socials'))
    .pipe(reload({stream:true}));    
});

task("team", () => {
    return src("src/img/team/*.*")
    .pipe(dest('dist/img/team'))
    .pipe(reload({stream:true}));    
});


/*task("icons", () => {
    return src("src/img/*.*")
     .pipe(
         svgo({
             plugins: [
                 {
                     removeAttrs: {attrs: "(fill|stroke|with|height|data.*)"}
                 }
             ]
         })
         )
         .pipe(svgSprite({
             mode: {
                 symbol: {
                     sprite: "../sprite.svg"
                 }
             }
         }))
         .pipe(dest("dist/images/icons"));
});*/

task("server", ()=> {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});

watch ("./src/css/**/*.scss", series ("styles"));
watch ("./src/*.html", series ("copy:html"));
watch("./src/js/*.js",series ("scripts"));
//watch("./src/img/*.svg",series ("icons"));
task("default",
 series("clean", 
  parallel("copy:html", "styles", "scripts","icons"),
  "decoration",'icon',"product","product_icon","reviews",'socials','team'
  , "server")
  );