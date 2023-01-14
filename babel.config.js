// const path = require('path')

// function resolveAliasPath(relativeToBabelConf) {
//   const resolvedPath = path.relative(process.cwd(), path.resolve(__dirname, relativeToBabelConf));
//   return `./${resolvedPath.replace('\\', '/')}`;
// }

// module.exports = resolveAliasPath

module.exports = function getBabelConfig(api) {
  const useESModules = api.env(['legacy', 'modern', 'stable', 'rollup']);

  const presets = [
    [
      '@babel/preset-env',
      {
        bugfixes: true,
        browserslistEnv: process.env.BABEL_ENV || process.env.NODE_ENV,
        debug: process.env.IA_BUILD_VERBOSE === 'true',
        modules: useESModules ? false : 'commonjs',
        shippedProposals: api.env('modern'),
      }
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ]

  const plugins = [
    [
      'babel-plugin-styled-components',
      {}
    ]
  ];

  return {
    assumptions: {
      noDocumentAll: true,
    },
    presets,
    plugins,
    ignore: [/@babel[\\|/]runtime/], // Fix a Windows issue.
  }
}
