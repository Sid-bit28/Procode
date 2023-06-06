import { useDispatch } from "react-redux";
import { moveCell, deleteCell } from "../store";
import './action-bar.css';

function ActionBar(id) {
    const dispatch = useDispatch();
    return <div className="action-bar">
        <button className="button is-primary is-small" onClick={() => dispatch(moveCell(id, 'up'))}>
            <span className="icon">
                <i className="fas fa-arrow-down"></i>
            </span>
        </button>
        <button className="button is-primary is-small" onClick={() => dispatch(moveCell(id, 'down'))}>
            <span className="icon">
                <i className="fas fa-arrow-up"></i>
            </span>
        </button>
        <button className="button is-primary is-small" onClick={() => dispatch(deleteCell(id))}>
            <span className="icon">
                <i className="fas fa-times"></i>
            </span>
        </button>
    </div>
}

export default ActionBar;