import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

function CodeCell() {
    const [input, setInput] = useState('');
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(input);
            setCode(output.code);
            setErr(output.error);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [input]);


    const handleChange = (value) => {
        setInput(value);
    };

    return (
        <Resizable direction='vertical'>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor onChange={handleChange} />
                </Resizable>
                <Preview code={code} status={err} />
            </div >
        </Resizable>
    );
}

export default CodeCell;