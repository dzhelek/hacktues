module.exports = {
    "noImplicitAny": false,
    entry: "./index.js",
    mode: "development",
    module: {
          rules: [{
              test: /\.md$/,
              use: [
                  {
                      loader: "html-loader"
                  },
                  {
                      loader: "markdown-loader",
                      // optional options
                      /*
                      options: {
                          renderer
                      }
                      */
                  }
              ]
          }]
      },
      output: {
          filename: "bundle.js"
      },
  };
