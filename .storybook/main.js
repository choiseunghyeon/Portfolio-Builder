const path = require("path");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async config => {
    console.log(config);

    config.plugins.push(
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, "../tsconfig.json"),
      })
    );
    // config.resolve.alias = {
    //   ...config.resolve.alias,
    //   // ...resolveTsconfigPathsToAlias({
    //   //   targetBasePath: path.join(__dirname, "../"),
    //   // }),
    //   // 절대 경로 추가
    //   // components: path.resolve(__dirname, "../components"),
    //   // styles: path.resolve(__dirname, "../styles"),
    //   // pages: path.resolve(__dirname, "../pages"),
    // };
    return config;
  },
};
