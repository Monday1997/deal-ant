import path from 'path'
import { Transform } from 'stream'
import { dest, series, src } from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import autoprefixer from 'gulp-autoprefixer'
import postcss from 'postcss'
import cssnano from 'cssnano'
const distThemeChalk = '../../dist/deal-ant/themeChalk'
/**
 * using `postcss` and `cssnano` to compress CSS
 * @returns
 */
function compressWithCssnano() {
  const processor = postcss([
    cssnano({
      preset: [
        'default',
        {
          // avoid color transform
          colormin: false,
          // avoid font transform
          minifyFontValues: false,
        },
      ],
    }),
  ])
  return new Transform({
    objectMode: true,
    transform(chunk, _encoding, callback) {
      const file = chunk as Vinly
      if (file.isNull()) {
        callback(null, file)
        return
      }
      if (file.isStream()) {
        callback(new Error('Streaming not supported'))
        return
      }
      const cssString = file.contents!.toString()
      processor.process(cssString, { from: file.path }).then((result) => {
        file.contents = Buffer.from(result.css)
        callback(null, file)
      })
    },
  })
}
function comScss() {
  const sass = gulpSass(dartSass)
  return src('./src/index.scss')
    .pipe(sass.sync())
    .pipe(autoprefixer({ cascade: false }))
    .on('data', (data) => {
      let content = data.contents.toString()
      if (content) {
        content = content.replaceAll('./fonts', '../fonts')
        data.contents = Buffer.from(content)
      }
    })
    .pipe(compressWithCssnano())
    .pipe(dest('./dist/css'))
}
function copyAll() {
  return src('./dist/**').pipe(dest(distThemeChalk))
}
function copyfonts() {
  return src('./src/fonts/**', { encoding: false }).pipe(dest(path.resolve(themeChalk, 'fonts')))
}
export default series(copyfonts, comScss, copyAll)
