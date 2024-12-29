import { pluginModuleFederation } from "@module-federation/rsbuild-plugin";
import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  html: {
    template: "./src/index.html",
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: "remote3",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/app.tsx",
      },
      dts: false,
      shared: ["react", "react-dom"],
    }),
  ],
  source: {
    entry: {
      index: "./src/index.tsx",
    },
    tsconfigPath: "./tsconfig.app.json",
  },
  server: {
    port: 4203,
  },
  output: {
    copy: [{ from: "./src/favicon.ico" }, { from: "./src/assets" }],
    target: "web",
    distPath: {
      root: "dist",
    },
  },
});
