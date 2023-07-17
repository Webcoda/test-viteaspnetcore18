// add the beginning of your app entry
import 'vite/modulepreload-polyfill'
import { addInitialPluginsAndHydrate } from './utils/conditioner'

///////////////////////////////
// Dynamic Lazy Load Modules //
///////////////////////////////
addInitialPluginsAndHydrate(document.documentElement)
console.log('🚀 main.ts: test changes')
