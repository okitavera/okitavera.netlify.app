import path from "path";

var config = {
  mode: "production",
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
    FontLoaderFallback: "./assets/js/FontLoaderFallback.js"
  },
  output: {
    path: path.resolve(__dirname, "./dist/assets/js"),
    filename: "[name].js"
  }
});

module.exports = [inline, external];
