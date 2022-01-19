const path =require("path");
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
module.exports = {
  mode : "development",
  entry :"./src/main.ts",
  devServer: {
    port : "8080",
    hot : true,
  },
  output : {
    path : path.resolve(__dirname,"dist"),
    filename : "vue_bundle.js",
    clean : true
  },
  devtool : 'source-map',
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
      template : './src/template.html'
    })
  ]
}