import path from "path";

var config = {
  mode: "development",
  resolve: {
    alias: {
      manifest: path.resolve(__dirname, "./data/manifest")
    }
  },
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
  }
};

var inline = Object.assign({}, config, {
  entry: {
    compromiseFontStrategy: "./assets/js/compromiseFontStrategy.js"
  },
  output: {
    path: path.resolve(__dirname, "./modules/comps/generated"),
    filename: "[name].js"
  }
});

var external = Object.assign({}, config, {
  entry: {
    bundle: "./assets/js/okitavera.js",
    fallback: "./assets/js/compromiseFallback.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets/js"),
    filename: "[name].js"
  },
  devtool: "source-map"
});

module.exports = [inline, external];
