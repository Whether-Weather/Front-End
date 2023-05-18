module.exports = function (api) {
    api.cache(true);
  
    const presets = [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
      '@babel/preset-react',
    ];
  
    const plugins = [
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
          absoluteRuntime: '@babel/runtime',
        },
      ],
    ];
  
    return {
      presets,
      plugins,
    };
  };
  