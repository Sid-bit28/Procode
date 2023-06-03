import { useState, useEffect } from 'react';
import * as esbuild from 'esbuild-wasm';

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const handleClick = () => {
        console.log("click");
    };

    const startService = async () => {
        const service = await esbuild.startService({
            worker: true,
            wasmURL: './esbuild.wasm'
        });
        // console.log(service);
    };

    // Bs ek baar run kr na bhai
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