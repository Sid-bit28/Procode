import "./add-cell.css";
import { useContext } from "react";
import cellContext from "../context/cellContext";

function AddCell() {
    const { insertCellBefore } = useContext(cellContext);

    const handleClickCode = () => {
        insertCellBefore("code");
    };

    const handleClickText = () => {
        insertCellBefore("text");
    };

    return (
        <div className="add-cell">
            <div className="add-buttons">
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={handleClickCode}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Code</span>
                </button>
                <button
                    className="button is-rounded is-primary is-small"
                    onClick={handleClickText}
                >
                    <span className="icon is-small">
                        <i className="fas fa-plus"></i>
                    </span>
                    <span>Text</span>
                </button>
            </div>
            <div className="divider"></div>
        </div>
    );
}

export default AddCell;