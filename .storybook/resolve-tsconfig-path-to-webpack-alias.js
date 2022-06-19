const path = require("path")
// const fs = require("fs")
// const tsconfig = fs.readFileSync("../tsconfig.json", "utf8")
// import tsconfig from "../tsconfig.json"
// const tsconfig = require("../tsconfig.json")

/**
 * Resolve tsconfig.json paths to Webpack aliases
 * @param  {string} tsconfigPath           - tsconfig 경로
 * @param  {string} targetBasePath         - aliases 적용되는 경로
 * @return {object}                        - Webpack alias config
 */
function resolveTsconfigPathsToAlias({ tsconfigPath = "../tsconfig.json", targetBasePath = __dirname } = {}) {
  // const { paths } = require(tsconfigPath).compilerOptions
  const { paths } = tsconfig.compilerOptions

  const aliases = {}

  Object.keys(paths).forEach(item => {
    const key = item.replace("/*", "")
    const value = path.resolve(targetBasePath, paths[item][0].replace("/*", "").replace("*", ""))

    aliases[key] = value
  })
  console.log(aliases)
  return aliases
}

module.exports = resolveTsconfigPathsToAlias
