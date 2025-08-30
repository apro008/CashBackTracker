module.exports = function (api) {
  api.cache(true);

  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // other plugins go here (if any)
      'react-native-reanimated/plugin', // 👈 must be last
    ],
  };
};
