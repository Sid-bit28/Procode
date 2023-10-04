import "./action-bar.css";
import { useContext } from "react";
import cellContext from "../context/cellContext";

function ActionBar({ id }) {
    const { moveCell, deleteCell } = useContext(cellContext);
    const handleClickDown = () => {
        moveCell(id, "down");
    };
    const handleClickUp = () => {
        moveCell(id, "up");
    };
    const handleClickDelete = () => {
        deleteCell(id);
    };
    return (
        <div className="action-bar">
            <button
                className="button is-primary is-small"
                onClick={handleClickDown}
            >
                <span className="icon">
                    <i className="fas fa-arrow-down"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={handleClickUp}
            >
                <span className="icon">
                    <i className="fas fa-arrow-up"></i>
                </span>
            </button>
            <button
                className="button is-primary is-small"
                onClick={handleClickDelete}
            >
                <span className="icon">
                    <i className="fas fa-times"></i>
                </span>
            </button>
        </div>
    );
}

export default ActionBar;
