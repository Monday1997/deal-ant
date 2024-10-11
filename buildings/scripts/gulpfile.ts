import { series } from 'gulp'
import { rollup } from 'rollup'
export default series(testRoolup)
async function testRoolup() {
  await rollup({
    input: './a.js',
    output: {
      file: 'bundle.js',
      format: 'cjs',
    },
  })
}
