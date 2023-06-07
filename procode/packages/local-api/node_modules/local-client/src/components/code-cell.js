import { useState, useEffect } from 'react';
import bundle from '../bundler';
import CodeEditor from './code-editor';
import Preview from './preview';
import Resizable from './resizable';
import { useDispatch, useSelector } from 'react-redux';
import { updateCell } from '../store';

function CodeCell({ cell }) {
    const dispatch = useDispatch();
    const [code, setCode] = useState('');
    const [err, setErr] = useState('');

    const completeCode = useSelector((state) => {
        const { data, order } = state.cells;
        const orderedCells = order.map(id => data[id]);
        const completeCode = [];
        for (let c of orderedCells) {
            if (c.type === 'code') {
                completeCode.push(c.content);
            }
            if (c.id === cell.id) {
                break;
            }
        }
        return completeCode;
    });


    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(completeCode.join('\n'));
            setCode(output.code);
            setErr(output.error);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [completeCode.join('\n')]);


    const handleChange = (value) => {
        const id = cell.id;
        dispatch(updateCell({ id, value }));
    };

    return (
        <Resizable direction='vertical'>
            <div style={{ height: '95%', display: 'flex', flexDirection: 'row' }}>
                <Resizable direction='horizontal'>
                    <CodeEditor onChange={handleChange} />
                </Resizable>
                <Preview code={code} status={err} />
            </div >
        </Resizable>
    );
}

export default CodeCell;