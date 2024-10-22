import mdContainer from 'markdown-it-container'
import createDemoContainer from './demo.ts'
export const mdPlugin = (md) => {
  md.use(mdContainer, 'demo', createDemoContainer(md))
}
