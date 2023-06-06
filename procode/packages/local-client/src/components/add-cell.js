import './add-cell.css';
import { useDispatch } from 'react-redux';
import { insertCellBefore } from '../store';

function AddCell({ nextCellId }) {
    const dispatch = useDispatch();
    const type1 = "code";
    const type2 = "text";
    const handleClickCode = () => {
        dispatch(insertCellBefore({ nextCellId, type1 }));
    }
    const handleClickText = () => {
        dispatch(insertCellBefore({ nextCellId, type2 }));
    }
    return <div className='add-cell'>
        <div className="add-buttons">
            <button className='button is-rounded is-primary is-small' onClick={handleClickCode}>
                <span className='icon is-small'>
                    <i className="fas fa-plus"></i>
                </span>
                <span>Code</span>
            </button>
            <button className='button is-rounded is-primary is-small' onClick={handleClickText}>
                <span className='icon is-small'>
                    <i className="fas fa-plus"></i>
                </span>
                <span>Text</span>
            </button>
        </div>
        <div className="divider"></div>
    </div >
}

export default AddCell;