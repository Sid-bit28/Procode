import { useState } from 'react';
import bundle from './bundler';
import CodeEditor from './components/code-editor';
import 'bulmaswatch/solar/bulmaswatch.min.css';
import Preview from './components/preview';

function App() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');

    const handleClick = async () => {
        const output = await bundle(input);
        setCode(output);
    };

    const handleChange = (value: string) => {
        setInput(value);
    };

    return (
        <div>
            <CodeEditor onChange={handleChange} />
            <div>
                <button onClick={handleClick}>Submit</button>
            </div>
            <Preview code={code} />
        </div >
    );
}

export default App;