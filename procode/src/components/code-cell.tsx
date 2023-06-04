import { useState } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';

function CodeCell() {
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
        <Resizable direction='vertical'>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor onChange={handleChange} />
                </Resizable>
                <Preview code={code} />
            </div >
        </Resizable>
    );
}

export default CodeCell;