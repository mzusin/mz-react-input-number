import fs from 'fs';
import path from 'path';

const packageJson = fs.readFileSync(path.join(process.cwd(), './package.json'), 'utf-8');
let version = '1.0.0';

try {
    const parsed = JSON.parse(packageJson);
    version = parsed.version;
} catch (ex) {}

export const settings = {
    entryPoints: ['./src/core/index.ts'],
    bundle: true,
    sourcemap: 'linked', // external
    define: { 'process.env.NODE_ENV': `'production'` }, // dev, production
    minify: true,
    target: ['es6'],
    outfile: './dist/mz-react-input-number.min.js',
    plugins: [],
    banner: {
        js: `/* 
MZ React Input Number v${ version }
https://github.com/mzusin/mz-react-input-number
MIT License      
Copyright (c) 2023-present, Miriam Zusin          
*/`,
    },
};