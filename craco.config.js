// parentApp/craco.config.js
const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "emr_ui",
          filename: "remoteEntry.js",
          remotes: {
            emr_billing: "emr_billing@http://localhost:3001/remoteEntry.js",
            emr_ip: "emr_ip@http://localhost:3002/remoteEntry.js",
            emr_bedAndWard:
              "emr_bedAndWard@http://localhost:3003/remoteEntry.js",
            emr_doctor: "emr_doctor@http://localhost:3004/remoteEntry.js",
            emr_lab:"emr_lab@http://localhost:3005/remoteEntry.js"
          },
          exposes: {
            "./Store": "./src/Redux/store.jsx",
          },
          shared: {
            ...deps,
            react: { singleton: true, requiredVersion: deps["react"] },
            "react-dom": {
              singleton: true,
              requiredVersion: deps["react-dom"],
            },
            "react-router-dom": {
              singleton: true,
              requiredVersion: deps["react-router-dom"],
            },
            "@reduxjs/toolkit": {
              singleton: true,
              requiredVersion: deps["@reduxjs/toolkit"],
            },
            "react-redux": {
              singleton: true,
              requiredVersion: deps["react-redux"],
            },
          },
        })
      );
      return webpackConfig;
    },
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3001", // Proxy API requests to the child app
        changeOrigin: true,
        pathRewrite: { "^/api": "" },
      },
      "/remoteEntry.js": {
        target: "http://localhost:3001",
        changeOrigin: true,
      },
    },
  },
};
