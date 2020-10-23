import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [{
  input: 'src/index.tsx',
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
    babel(),
    commonjs(),
    typescript({ objectHashIgnoreUnknownHack: false }),
  ],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
}, {
  input: 'src/hooks/index.tsx',
  output: [
    {
      file: 'build/hooks/index.tsx',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    babel(),
    commonjs(),
    typescript({ objectHashIgnoreUnknownHack: false }),
  ],
  external: ['react', 'react-dom'],
},
];
