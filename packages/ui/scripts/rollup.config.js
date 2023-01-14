import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import nodeGlobals from 'rollup-plugin-node-globals'
// import terser from '@rollup/plugin-terser'
import pkg from '../package.json'

const input = './src/index.ts'
const globals = {
  react: 'React',
  'react-dom': 'ReactDom'
}
const babelOptions = {
  exclude: /node_modules/,
  // runtimeHelpers: true,
  babelHelpers: 'bundled',
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, '../../../babel.config.js')
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
  namedExports: {
    '../../node_modules/react/jsx-runtime.js': ['jsx', 'jsxs'],
    '../../node_modules/react-is/index.js': [
      'ForwardRef',
      'isFragment',
      'isLazy',
      'isMemo',
      'Memo',
      'isValidElementType',
    ],
  },
}
const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
};

export default  [
  {
    input,
    output: {
      file: pkg.main,
      format: 'cjs',
      name: 'InteradsUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
    ]
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      name: 'InteradsUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
    ]
  },
  {
    input,
    output: {
      file: pkg.browser,
      format: 'iife',
      name: 'InteradsUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
    ]
  }
]