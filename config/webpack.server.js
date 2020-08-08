const path = require(`path`)
const nodeExternals = require(`webpack-node-externals`)

module.exports = {
  mode: process.env.NODE_ENV === `development` ? `development` : `production`,

  target: `node`,

  entry: {
    server: path.resolve(__dirname, `../server/index`),
  },

  output: {
    path: path.resolve(__dirname, `../server-build`),
    filename: `index.js`,
  },

  externals: [nodeExternals()],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: `babel-loader`,
      },
    ],
  },
}
