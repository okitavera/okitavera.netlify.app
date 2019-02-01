const path = require("path");
const webpack = require("webpack");
const metadata = require("./manifest/metadata.json");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const conf = {
  mode: "production",
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus)
    })
  ],
  stats: "none",
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
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets")
      }
    ]
  }
};

const inline = {
  ...conf,
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName: "legacy"
          }
        }
      }
    ]
  },
  entry: {
    Critical: "./assets/js/Critical.js"
  },
  output: {
    path: path.resolve(__dirname, "./views/modules/virtual"),
    filename: "[name].js"
  }
};

const internal = {
  ...conf,
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName: "legacy"
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].js"
  },
  entry: {
    Okitavera: "./assets/js/Okitavera.js",
    "polyfills/ScrollBehaviour": "./assets/js/polyfills/ScrollBehaviour.js"
  }
};

const mInternal = {
  ...conf,
  module: {
    rules: [
      {
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName: "modern"
          }
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].mjs"
  },
  entry: {
    Okitavera: "./assets/js/Okitavera.js"
  }
};

module.exports = [{ ...inline }, { ...internal }, { ...mInternal }];
