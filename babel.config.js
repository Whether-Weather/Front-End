module.exports = function (api) {
    api.cache(true);
  
    const presets = [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
          // Exclude Mapbox GL JS from the transpilation process
          exclude: ['@mapbox/mapbox-gl'],
        },
      ],
      '@babel/preset-react',
    ];
  
    return {
      presets,
    };
  };
  