import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { useDispatch } from 'react-redux';
import { updateCell } from '../store';

function CodeCell({ cell }) {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(cell.content);
            setCode(output.code);
            setErr(output.error);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [cell.content]);


    const handleChange = (value) => {
        const id = cell.id;
        dispatch(updateCell({ id, value }));
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