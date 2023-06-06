import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import './text-editor.css';
import { useDispatch } from "react-redux";
import { updateCell } from "../store";

function TextEditor({ cell }) {
    const dispatch = useDispatch();

    const id = cell.id;

    const ref = useRef(null);
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

    const handleChange = (event) => {
        const val = event | "";
        console.log(event);
        dispatch(updateCell({ id, val }));
    }
    if (editing) {
        return <div ref={ref}>
            <MDEditor value={cell.content} onChange={handleChange} />
        </div>
    }
    return <div className='card' onClick={() => setEditing(true)}>
        <div>
            <div className="wmde-markdown-var"> </div>
            <MDEditor.Markdown source={cell.content || "# Random"} style={{ whiteSpace: 'pre-wrap' }} />
        </div>
    </div>
}

export default TextEditor;