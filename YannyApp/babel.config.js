module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // Wrap NativeWind plugin under "assumable envs" so Expo Router doesn't choke
    env: {
      "react-native": {
        plugins: ["nativewind/babel"]
      },
    },
  };
};
