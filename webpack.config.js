const path = require("path");
const webpack = require("webpack");
const metadata = require("./manifest/metadata.json");
const TerserPlugin = require("terser-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");

const inline = {
  entry: {
    Critical: "./assets/js/Critical.js"
  },
  output: {
    path: path.resolve(__dirname, "./views/modules/virtual"),
    filename: "[name].js"
  }
};

const external = {
  entry: {
    okitavera: "./assets/js/Okitavera.js"
  }
};

const polyfills = {
  entry: {
    "polyfills/ScrollBehaviour": "./assets/js/polyfills/ScrollBehaviour.js"
  }
};

const conf = {
  mode: "production",
  plugins: [
    new HardSourceWebpackPlugin(),
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus)
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

const esl = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets"),
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName: "legacy"
          }
        }
      }
    ]
  }
};

const esm = {
  module: {
    rules: [
      {
        test: /\.m?js$/,
        include: path.resolve(__dirname, "assets"),
        use: {
          loader: "babel-loader?cacheDirectory",
          options: {
            envName: "modern"
          }
        }
      }
    ]
  }
};
const eslDest = {
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].js"
  }
};

const esmDest = {
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js/`),
    filename: "[name].mjs"
  }
};

module.exports = [
  { ...conf, ...esl, ...inline },
  { ...conf, ...esl, ...eslDest, ...external },
  { ...conf, ...esl, ...eslDest, ...polyfills },
  { ...conf, ...esm, ...esmDest, ...external }
];
