import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import pkg from './package.json';

export default [{
  input: 'src/index.js',
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
  ],
  external: ['react', 'react-dom'],
}, {
  input: 'src/hooks/index.js',
  output: [
    {
      file: 'build/hooks/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [
    babel(),
    commonjs(),
  ],
  external: ['react', 'react-dom'],
},
];
