import { pluginReact } from '@rsbuild/plugin-react';
import { defineConfig } from '@rsbuild/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  html: {
    template: './src/index.html',
  },
  plugins: [
    pluginReact(),
    pluginModuleFederation({
      name: 'host',
      shareStrategy: 'loaded-first',
      shared: ['react', 'react-dom'],
    }),
  ],

  source: {
    entry: {
      index: './src/index.tsx',
    },
    tsconfigPath: './tsconfig.app.json',
  },
  server: {
    port: 4200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers':
        'X-Requested-With, content-type, Authorization',
    },
  },
  output: {
    copy: [{ from: './src/favicon.ico' }, { from: './src/assets' }],

    target: 'web',
    distPath: {
      root: 'dist',
    },
  },
});