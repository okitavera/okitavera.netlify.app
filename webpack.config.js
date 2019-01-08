const path = require("path");
const webpack = require("webpack");
const metadata = require("./data/manifest/metadata.json");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const config = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets"),
        use: {
          loader: "babel-loader?cacheDirectory"
        }
      }
    ]
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus),
      buildstamp: JSON.stringify(Date.now())
    })
  ],
  output: {
    pathinfo: false
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};

const external = {
  entry: {
    Critical: "./assets/js/Critical.js",
    Okitavera: "./assets/js/Okitavera.js",
    FontLoaderData: "./assets/js/FontLoaderData.js",
    FontLoaderFallback: "./assets/js/FontLoaderFallback.js"
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js`),
    filename: "[name].js"
  }
};

module.exports = [{ ...config, ...external }];
