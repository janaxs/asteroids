var path = require("path");
module.exports = {
    entry: "./js-src/main.js",
    output: {
        path: path.join(__dirname, "."),
        filename: "asteroids.js"
    },
    module: {
        loaders: [
            {
                //test: /\.(js|jsx)$/,
                //exclude: /(node_modules|bower_components)/,
                test: path.join(__dirname, "js-src"),
                loader: "babel-loader",
                query: {
                    presets: ["es2015"]
                }
            }
        ]
    },
    resolve: {
      // tell webpack where to look for required files
      modulesDirectories: [
        "js-src"
      ],
  },
    devtool: "#inline-source-map"
};
