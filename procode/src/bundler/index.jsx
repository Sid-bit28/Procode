import * as esbuild from 'esbuild-wasm'; // use * when exporting or importing everything from a file.
import { unpkgPathPlugin } from './plugins/unpkg-plugin';

let service;
const arrow = async (rawCode) => {
    if (!service) {
        service = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        });
    }

    try {
        const result = await service.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(rawCode)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        });
        return {
            code: result.outputFiles[0].text,
            error: ''
        }
    } catch (err) {
        return {
            code: '',
            error: err.message
        }
    }
};

export default arrow;