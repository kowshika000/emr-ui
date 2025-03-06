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
            emr_billing: "emr_billing@https://emr-billing-child1.web.app/remoteEntry.js",
            emr_ip: "emr_ip@https://emr-ip-child2.web.app/remoteEntry.js",
            emr_doctor: "emr_doctor@https://emr-doctor-child3.web.app/remoteEntry.js",
            emr_bedAndWard:"emr_bedAndWard@https://emr-bedward-child4.web.app/remoteEntry.js",
            emr_nurse: "emr_nurse@https://emr-nurse-child5.web.app/remoteEntry.js",
            emr_lab: "emr_lab@https://emr-lab-child6.web.app/remoteEntry.js",
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
