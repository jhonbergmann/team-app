module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@': './src',
            '@assets': './src/assets',
            '@components': './src/components',
            '@screens': './src/screens',
            '@storage': './src/storage',
            '@theme': './src/theme',
            '@utils': './src/utils',
          },
        },
      ],
    ],
  }
}
