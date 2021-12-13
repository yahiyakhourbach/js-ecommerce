const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
   
  entry: {
    main: path.resolve(__dirname, 'src/index.js'),
      
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
      
    clean: true
  },
    
  devtool: 'inline-source-map',
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    open: true,
    hot: true,
    compress: true,
    port: 8080,
  },
  // loader
  module: {

    rules: [{
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'] 
    },
    {
      test: /\.html$/i,
      exclude: [/node_modules/],
      use: [{ loader: 'html-loader' }]
    }]
  },
  // plugins
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src/index.html')
  }),
  new CopyPlugin({
    patterns: [{
      from: path.resolve(__dirname, 'src/images'),
      to: path.resolve(__dirname, 'dist/images')
    }]
  })

  ],
  mode: 'development'
};
