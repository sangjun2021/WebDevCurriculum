const path =require("path");
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
  mode : "production",
  entry :"./src/main.ts",
  output : {
    path : path.resolve(__dirname,"dist"),
    filename : "vue_bundle.js",
    clean : true
  },
  resolve : {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      alias :{
        "@" : path.resolve(__dirname,"src")
      }
  },
  module : {
    rules : [
      {
        test : /\.vue$/,
        use : 'vue-loader'
      },
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        },
        exclude: /node_modules/,
      },
      {
        test : /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  plugins : [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template : './src/index.html'
    })
  ]
}