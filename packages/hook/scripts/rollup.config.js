import { existsSync } from 'fs';
import path from 'path'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import babel from '@rollup/plugin-babel'
import nodeGlobals from 'rollup-plugin-node-globals'
import nodePolyfill from 'rollup-plugin-polyfill-node'
import replace from '@rollup/plugin-replace';


function resolveNestedImport(packageFolder, importee) {
  const folder = importee.split('/')[2];
  const resolvedFilename = path.resolve(
    __dirname,
    `../../../packages/${packageFolder}/src/${folder}/index`,
  );

  const resolvedTs = `${resolvedFilename}.ts`;

  if (existsSync(resolvedTs)) {
    return resolvedTs;
  }

  return `${resolvedFilename}.js`;
}

const nestedFolder = {
  resolveId: (importee) => {
    if (importee.indexOf('@mui/util/') === 0) {
      return resolveNestedImport('util', importee);
    }

    return undefined;
  },
};

const input = './src/index.ts'
const globals = {
  react: 'React',
  'react-dom': 'ReactDom',
}

const babelOptions = {
  exclude: /node_modules/,
  babelHelpers: 'runtime',
  extensions: ['.js', '.ts', '.tsx'],
  configFile: path.resolve(__dirname, '../../../babel.config.js'),
}
const commonjsOptions = {
  ignoreGlobal: true,
  include: /node_modules/,
}
const nodeOptions = {
  extensions: ['.js', '.tsx', '.ts'],
}

function onwarn(warning) {
  if (
    warning.code === 'UNUSED_EXTERNAL_IMPORT' &&
    warning.source === 'react' &&
    warning.names.filter((identifier) => identifier !== 'useDebugValue').length === 0
  ) {
    // only warn for
    // import * as React from 'react'
    // if (__DEV__) React.useDebugValue()
    // React.useDebug not fully dce'd from prod bundle
    // in the sense that it's still imported but unused. Downgrading
    // it to a warning as a reminder to fix at some point
    console.warn(warning.message);
  } else {
    throw Error(warning.message);
  }
}


export default [
  {
    input,
    onwarn,
    output: {
      file: 'lib/umd/index.js',
      format: 'umd',
      name: 'InteradsUI',
      globals,
    },
    external: Object.keys(globals),
    plugins: [
      nodeResolve(nodeOptions),
      nestedFolder,
      babel(babelOptions),
      commonjs(commonjsOptions),
      nodeGlobals(),
      nodePolyfill(),
      replace({ preventAssignment: true, 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
  },
]
