module.exports = {
  entry: './demo/index.jsx',
  output: {
    filename: './demo/bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: function (filePath) {
          // node_modules中@urc域下的模块需要被打包进来
          return (/node_modules/.test(filePath) && !/@urc/.test(filePath));
        },
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0']
          }
        }
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  }
};
