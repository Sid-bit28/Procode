import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import './text-editor.css';

function TextEditor() {
    const ref = useRef(null);
    const [value, setValue] = useState("# Hello");
    const [editing, setEditing] = useState(false);


    useEffect(() => {
        const listener = (event) => {
            if (ref.current && event.target && ref.current.contains(event.target)) {
                return;
            }
            setEditing(false);
        }
        document.addEventListener('click', listener, { capture: true });
        return () => {
            document.removeEventListener('click', listener, { capture: true });
        };
    }, []);

    if (editing) {
        return <div ref={ref}>
            <MDEditor value={value} onChange={setValue} />
        </div>
    }
    return <div className='card' onClick={() => setEditing(true)}>
        <div>
            <div className="wmde-markdown-var"> </div>
            <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    </div>
}

export default TextEditor;