const path = require("path")
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")

// const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin")
// const resolveTsconfigPathsToAlias = require("./resolve-tsconfig-path-to-webpack-alias")
module.exports = {
  stories: ["../**/*.stories.mdx", "../**/*.stories.@(js|jsx|ts|tsx)"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials", "@storybook/addon-interactions"],
  framework: "@storybook/react",
  core: {
    builder: "@storybook/builder-webpack5",
  },
  webpackFinal: async (config, { configType }) => {
    config.resolve.plugins = [new TsconfigPathsPlugin()]
    return config
  },
}
