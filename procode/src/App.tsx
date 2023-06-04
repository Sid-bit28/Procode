import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm'; // use * when exporting or importing everything from a file.
import { unpkgPathPlugin } from './plugins/unpkg-plugin';
import CodeEditor from './components/code-editor';

function App() {
    const [input, setInput] = useState('');
    const ref = useRef<any>(); // for reference
    const iframe = useRef<any>();

    const handleClick = async () => {
        if (!ref.current) {
            return;
        }

        iframe.current.srdoc = html;

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
                    try{
                        eval(event.data);
                    } catch (err) {
                        const root = document.querySelector('#root');
                        root.innerHTML = '<div style="color: red;"><h4> RunTime Error </h4>' + err + '</div>'  
                        console.error(err); 
                    }
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

    const handleChange = (value: string) => {
        setInput(value);
    };

    return (
        <div>
            <CodeEditor onChange={handleChange} />
            <textarea onChange={e => setInput(e.target.value)} value={input}></textarea>
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
            {/* testing iframes */}
            <iframe title='mdkd' ref={iframe} sandbox="allow-scripts" srcDoc={html} />
        </div >
    );
}

export default App;