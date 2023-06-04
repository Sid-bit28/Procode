import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localforage from 'localforage';

const fileCache = localforage.createInstance({
    name: 'filecache',
});

export const unpkgPathPlugin = (inputCode: string) => {
    return {
        name: 'unpkg-path-plugin',
        setup(build: esbuild.PluginBuild) {

            // Resolve the file in esbuild https://esbuild.github.io/api/
            build.onResolve({ filter: /.*/ }, async (args: any) => {
                console.log('onResolve', args);
                if (args.path === 'index.js') {
                    return { path: args.path, namespace: 'a' };
                }
                if (args.path.includes('./') || args.path.includes('../')) {
                    return {
                        namespace: 'a',
                        path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/').href
                    };
                }
                return {
                    namespace: 'a',
                    path: `https://unpkg.com/${args.path}`
                }
            });

            // Load the file on esbuild https://esbuild.github.io/api/
            build.onLoad({ filter: /.*/ }, async (args: any) => {
                console.log('onLoad', args);
                if (args.path === 'index.js') {
                    return {
                        loader: 'jsx',
                        contents: inputCode,
                    };
                }
                // check if it is in indexDB
                const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(args.path);
                if (cachedResult) {
                    return cachedResult;
                }

                const response = await axios.get(args.path);
                const escapedChar = response.data.replace(/\n/g, '').replace(/"/g, '\\"').replace(/'/g, "\\'");


                // css fails to load!! https://esbuild.github.io/content-types/#css
                const fileType = args.path.match(/.css$/) ? 'css' : 'jsx';
                const contents = (fileType === 'css' ? `const style = document.createElement('style');style.innerText='${escapedChar}';document.head.appendChild(style);` : response.data);

                const result: esbuild.OnLoadResult = {
                    loader: 'jsx',
                    contents: contents,
                    resolveDir: new URL('./', response.request.responseURL).pathname
                };
                await fileCache.setItem(args.path, result);
                return result;
            });
        },
    };
};