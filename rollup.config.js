import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import nodeGlobals from 'rollup-plugin-node-globals';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default [{
  input: ['src/index.tsx'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      plugins: ['@babel/plugin-transform-react-jsx', '@babel/plugin-transform-react-jsx-self',
        '@babel/plugin-proposal-object-rest-spread'],
    }),
    commonjs({
      include: ['src', 'src/hooks', 'node_modules/**'],
    }),
    nodeResolve({
      mainFields: ['main'],
      browser: true,
      preferBuiltins: true,
    }),
    json(),
    builtins(),
    nodeGlobals(),
    typescript({ objectHashIgnoreUnknownHack: false }),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
},
];
