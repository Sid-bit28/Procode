import MDEditor from "@uiw/react-md-editor";
import { useState, useEffect, useRef } from "react";
import "./text-editor.css";
import { useContext } from "react";
import cellContext from "../context/cellContext";

function TextEditor({ cell }) {
    const { updateCell } = useContext(cellContext);

    const ref = useRef(null);
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        const listener = (event) => {
            if (
                ref.current &&
                event.target &&
                ref.current.contains(event.target)
            ) {
                return;
            }
            setEditing(false);
        };
        document.addEventListener("click", listener, { capture: true });
        return () => {
            document.removeEventListener("click", listener, { capture: true });
        };
    }, []);

    const handleChange = (event) => {
        const value = event;
        updateCell(cell.id, value);
    };
    if (editing) {
        return (
            <div ref={ref}>
                <MDEditor value={cell.content} onChange={handleChange} />
            </div>
        );
    }
    return (
        <div className="card text-editor" onClick={() => setEditing(true)}>
            <div className="card-content">
                <MDEditor.Markdown
                    source={cell.content || "# Welcome"}
                    style={{ whiteSpace: "pre-wrap" }}
                />
            </div>
        </div>
    );
}

export default TextEditor;
