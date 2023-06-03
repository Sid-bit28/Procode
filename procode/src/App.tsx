import { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm'; // use * when exporting or importing everything from a file.

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const ref = useRef<any>(); // for reference

    const handleClick = async () => {
        if (!ref.current) {
            return;
        }
        // console.log(ref.current);
        const result = await ref.current.transform(input, {
            loader: 'jsx',
            target: 'es2015'
        });
        setCode(result.code);
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
        </div>
    );
}

export default App;