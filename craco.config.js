const { ModuleFederationPlugin } = require("webpack").container;
const deps = require("./package.json").dependencies;

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      webpackConfig.plugins.push(
        new ModuleFederationPlugin({
          name: "emr_ui",
          filename: "remoteEntry.js",
          remotes: {
            emr_billing: isProduction
              ? "emr_billing@https://emr-billing-child1.web.app/remoteEntry.js"
              : "emr_billing@http://localhost:3001/remoteEntry.js",
            emr_ip: isProduction
              ? "emr_ip@https://emr-ip-child2.web.app/remoteEntry.js"
              : "emr_ip@http://localhost:3002/remoteEntry.js",
            emr_doctor: isProduction
              ? "emr_doctor@https://emr-doctor-child3.web.app/remoteEntry.js"
              : "emr_doctor@http://localhost:3004/remoteEntry.js",
            emr_bedAndWard: isProduction
              ? "emr_bedAndWard@https://emr-bedward-child4.web.app/remoteEntry.js"
              : "emr_bedAndWard@http://localhost:3003/remoteEntry.js",
            emr_nurse: isProduction
              ? "emr_nurse@https://emr-nurse-child5.web.app/remoteEntry.js"
              : "emr_nurse@http://localhost:3006/remoteEntry.js",
            emr_lab: isProduction
              ? "emr_lab@https://emr-lab-child6.web.app/remoteEntry.js"
              : "emr_lab@http://localhost:3005/remoteEntry.js",
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
};
