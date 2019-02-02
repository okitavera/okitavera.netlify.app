const path = require("path");
const webpack = require("webpack");
const metadata = require("./manifest/metadata.json");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const JSConfig = {
  mode: "production",
  stats: "none",
  output: {
    pathinfo: false
  },
  plugins: [
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus)
    })
  ],
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

if (process.env.NODE_ENV !== "production")
  JSConfig.plugins.push(new HardSourceWebpackPlugin());

const babelEnv = (envName) => ({
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets"),
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName
          }
        }
      }
    ]
  }
});

const inline = {
  ...JSConfig,
  ...babelEnv("legacy"),
  entry: {
    Critical: "./assets/js/Critical.js"
  },
  output: {
    path: path.resolve(__dirname, "./views/modules/virtual"),
    filename: "[name].js"
  }
};

const internal = {
  ...JSConfig,
  ...babelEnv("legacy"),
  entry: {
    Okitavera: "./assets/js/Okitavera.js",
    "polyfills/ScrollBehaviour": "./assets/js/polyfills/ScrollBehaviour.js"
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].js"
  }
};

const mInternal = {
  ...JSConfig,
  ...babelEnv("modern"),
  entry: {
    Okitavera: "./assets/js/Okitavera.js"
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].mjs"
  }
};

module.exports = [inline, internal, mInternal];
