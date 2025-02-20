const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    code: './src/code.ts', // Entry point for your TypeScript code
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.js'], // Resolve both TypeScript and JavaScript files
  },
  devtool: 'source-map', // Enable source maps for better debugging experience
  module: {
    rules: [
      {
        test: /\.ts$/, // Process TypeScript files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.js$/, // Add this rule to process JavaScript files using Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { 
                "useBuiltIns": "usage",
                "corejs": 3
              }
            ] // Use preset-env to support legacy environments
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: './src/ui.html', to: 'ui.html' }, // Copy the HTML file for plugin UI
      ],
    }),
  ],
  optimization: {
    minimize: false, // Disable minification during debugging
  },
};
