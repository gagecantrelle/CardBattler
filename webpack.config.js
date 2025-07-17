const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'development',
  stats: {
    excludeModules: /node_modules/,
  },
  entry: path.resolve(__dirname, './Client/index.tsx'),
  output: { filename: "bundle.js", path: path.join(__dirname, './Client/dist'),  publicPath: '/'},
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: [{
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
          },
        },
      ],
      exclude: /node_modules/,
      },
      {
          test: /\.css$/i,
          include: path.resolve(__dirname, 'Client'),
          use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
      test: /\.(png|jpe?g|gif|svg)$/i,
      type: 'asset/resource', 
    },
    ]
  },  
  plugins: [
    new HtmlWebpackPlugin({template: path.join(__dirname, "./Client/index.html")}),
  ]
};