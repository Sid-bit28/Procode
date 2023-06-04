import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { useRef } from 'react';
import './code-editor.css';


function CodeEditor({ onChange }) {
    // change the value of the text by editing it and replacing it in the editor.... 
    // bda jhamela hai
    const editorRef = useRef(null);

    const handleClick = () => {
        const formatted = prettier.format(editorRef.current.getModel().getValue(), {
            parser: 'babel',
            plugins: [parser],
            useTabs: false,
            semi: true,
            singleQuotes: true
        });
        editorRef.current.getModel().setValue(formatted);
    };

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    const handleChange = (value, ev) => {
        onChange(value);
    };

    return (
        <div className='editor-wrapper'>
            <button className="button button-format is-primary is-small" onClick={handleClick}>Format</button>
            <MonacoEditor onMount={handleEditorDidMount} onChange={handleChange} defaultValue="// some comment" language='javascript' theme='vs-dark' height="100%" options={{ wordWrap: 'on', minimap: { enabled: false }, showUnused: false, folding: false, lineNumbersMinChars: 3, fontSize: 16, scrollBeyondLastLine: false, automaticLayout: true }} />
        </div>
    );
};

export default CodeEditor;