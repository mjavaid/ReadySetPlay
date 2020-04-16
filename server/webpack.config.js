const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: path.join(path.resolve(__dirname), 'server.ts'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.js' ]
  },
}
