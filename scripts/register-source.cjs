// Compile application modules for static rendering, using the same React sources.
const path = require('node:path')
const babel = require('@babel/core')
const sourceRoot = path.resolve(__dirname, '../src') + path.sep
const originalJsLoader = require.extensions['.js']

const load = (module, filename) => {
  if (!filename.startsWith(sourceRoot)) return originalJsLoader(module, filename)
  const result = babel.transformFileSync(filename, {
    babelrc: false,
    configFile: false,
    presets: [
      ['@babel/preset-env', { targets: { node: 'current' } }],
      ['@babel/preset-react', { runtime: 'automatic' }]
    ]
  })
  module._compile(result.code, filename)
}

require.extensions['.js'] = load
require.extensions['.jsx'] = load
require.extensions['.css'] = () => {}
