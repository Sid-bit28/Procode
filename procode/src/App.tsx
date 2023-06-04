import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm'; // use * when exporting or importing everything from a file.
import { unpkgPathPlugin } from './plugins/unpkg-plugin';

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const ref = useRef<any>(); // for reference

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

        console.log(resultt);
        setCode(resultt.outputFiles[0].text);
    };

    const startService = async () => {
        ref.current = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        });
        // console.log(service);
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
            <iframe src='/test.html'></iframe>
        </div>
    );
}

export default App;