import CodeCell from "./code-cell";
import TextEditor from "./text-editor";
import ActionBar from "./action-bar";
import "./cell-list-item.css";

function CellListItem({ cell }) {
    let child;
    if (cell.type === "code") {
        child = (
            <>
                <div className="action-bar-wrapper">
                    <ActionBar id={cell.id} />
                </div>
                <CodeCell cell={cell} />
            </>
        );
    } else {
        child = (
            <>
                <TextEditor cell={cell} />
                <ActionBar id={cell.id} />
            </>
        );
    }
    return <div className="cell-list-item">{child}</div>;
}

export default CellListItem;
