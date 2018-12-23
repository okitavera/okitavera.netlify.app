import path from "path";
import webpack from "webpack";
import metadata from "./data/manifest/metadata.json";
import TerserPlugin from "terser-webpack-plugin";

var config = {
  mode: "production",
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      disqusdata: JSON.stringify(metadata.disqus)
    })
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        terserOptions: {
          output: {
            comments: false
          }
        }
      })
    ]
  }
};

var inline = Object.assign({}, config, {
  entry: {
    FontLoader: "./assets/js/FontLoader.js"
  },
  output: {
    path: path.resolve(__dirname, "./modules/comps/generated"),
    filename: "[name].js"
  }
});

var external = Object.assign({}, config, {
  entry: {
    Okitavera: "./assets/js/Okitavera.js",
    FontLoaderData: "./assets/js/FontLoaderData.js",
    FontLoaderFallback: "./assets/js/FontLoaderFallback.js"
  },
  output: {
    path: path.resolve(__dirname, `${metadata.site.output}/assets/js`),
    filename: "[name].js"
  }
});

module.exports = [inline, external];
