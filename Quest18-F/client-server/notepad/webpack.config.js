const path =require("path");
const HtmlWebpackPlugin  = require('html-webpack-plugin');
const {VueLoaderPlugin} = require('vue-loader');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const option = {
  name: 'notepad pwa app',
  short_name: 'notepad',
  icons: [
    {
      src: './images/lighthouse.png',
      type: 'image/png',
      sizes: '512x512',
    },
  ],
  start_url: './',
  background_color: '#ffffff',
  display: 'standalone',
  theme_color: '#ffffff',
}
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
      template : './src/template.html'
    }),
    new WebpackManifestPlugin({
      generate : ()=>option
    }),
    new CopyPlugin({
      patterns: [
        { from: "images", to: "images" },
      ],
    })
  ]
}