import MonacoEditor from '@monaco-editor/react';
import prettier from 'prettier';


function CodeEditor({ onChange }) {
    return <MonacoEditor onChange={(value, ev) => onChange(value)} defaultValue="// some comment" language='javascript' theme='vs-dark' height="500px" options={{ wordWrap: 'on', minimap: { enabled: false }, showUnused: false, folding: false, lineNumbersMinChars: 3, fontSize: 16, scrollBeyondLastLine: false, automaticLayout: true }} />
};

export default CodeEditor;