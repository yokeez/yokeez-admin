const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './style/default.less'), 'utf8')
);

const withAntdLess = require('next-plugin-antd-less');

const nextConfig = {
  distDir: '.next',
  webpack: (config, { isServer }) => {
    // Add tsconfig paths
    config.resolve.plugins = config.resolve.plugins || [];
    config.resolve.plugins.push(new TsconfigPathsPlugin());

    // Handle Ant Design styles
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      config.externals = [
        ...config.externals,
        ({ context, request }, callback) => {
          if (antStyles.test(request)) {
            return callback(null, 'null-loader');
          }
          callback();
        }
      ];
    }

    // Add Less support
    config.module.rules.push({
      test: /\.less$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
        {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true,
              modifyVars: themeVariables,
            },
            webpackImporter: false,
          },
        },
      ],
    });

    // Add CSS support
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    });

    return config;
  },
};

module.exports = nextConfig;
