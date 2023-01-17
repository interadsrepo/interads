import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import nodeGlobals from 'rollup-plugin-node-globals'
import pkg from '../package.json'

const input = './src/index.ts'
const globals = {}
const babelOptions = {
  exclude: /node_modules/,
  babelHelpers: 'runtime',
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, '../babel.config.js')
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/
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
      name: 'InteradsUtil',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      commonjs(commonjsOptions),
      babel(babelOptions),
      nodeGlobals(),
    ]
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
      name: 'InteradsUtil',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      commonjs(commonjsOptions),
      babel(babelOptions),
      nodeGlobals(),
    ]
  },
  {
    input,
    output: {
      file: "lib/umd/index.umd.js",
      format: 'umd',
      name: 'InteradsUtil',
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