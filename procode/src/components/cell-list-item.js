import CodeCell from "./code-cell";
import TextEditor from "./text-editor";

function CellListItem({ cell }) {
    let child;
    if (cell.type === 'code') {
        child = <CodeCell />
    } else {
        child = <TextEditor />
    }
    return (
        <div>{child}</div>
    );
}

export default CellListItem;