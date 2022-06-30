const path = require("path")
// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
// const resolveTsconfigPathsToAlias = require("./resolve-tsconfig-path-to-webpack-alias")
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async config => {
    console.log(config)

    // config.plugins.push(
    //   new TsconfigPathsPlugin({
    //     configFile: path.resolve(__dirname, "../tsconfig.json"),
    //   })
    // )
    config.resolve.alias = {
      ...config.resolve.alias,
      // ...resolveTsconfigPathsToAlias({
      //   targetBasePath: path.join(__dirname, "../"),
      // }),
      // 절대 경로 추가
      "@pages": path.resolve(__dirname, "../pages"),
      "@components": path.resolve(__dirname, "../components"),
      "@container": path.resolve(__dirname, "../container"),
      "@store": path.resolve(__dirname, "../store"),
      "@type": path.resolve(__dirname, "../type"),
      "@lib": path.resolve(__dirname, "../lib"),
      "@constants": path.resolve(__dirname, "../constants"),
    }
    return config
  },
}
