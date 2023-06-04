import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm'; // use * when exporting or importing everything from a file.
import { unpkgPathPlugin } from './plugins/unpkg-plugin';

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const ref = useRef<any>(); // for reference
    const iframe = useRef<any>();

    const handleClick = async () => {
        if (!ref.current) {
            return;
        }

        const resultt = await ref.current.build({
            entryPoints: ['index.js'],
            bundle: true,
            write: false,
            plugins: [unpkgPathPlugin(input)],
            define: {
                'process.env.NODE_ENV': '"production"',
                global: 'window',
            }
        })

        // setCode(resultt.outputFiles[0].text);
        iframe.current.contentWindow.postMessage(resultt.outputFiles[0].text, '*');
    };

    const html = `
    <html>
        <head></head>
        <body>
            <div id="root"></div>
            <script>
                window.addEventListener('message', (event) => {
                // console.log(event.data);
                eval(event.data);
                }, false);
            </script>
        </body>
    </html>`;

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        });
    };

    // Bs ek baar run krna hai
    useEffect(() => {
        startService();
    }, []);

    return (
        <div>
            <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
            <pre>{code}</pre>
            {/* testing iframes */}
            <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div>
    );
}

export default App;