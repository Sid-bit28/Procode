import './add-cell.css';
import { useDispatch } from 'react-redux';
import { insertCellBefore } from '../store';

function AddCell({ nextCellId }) {
    const dispatch = useDispatch();
    const type1 = "code";
    const type2 = "text";
    const handleClickCode = () => {
        console.log("clickedcode");
        dispatch(insertCellBefore({ nextCellId, type1 }));
    }
    const handleClickText = () => {
        console.log("clickedtext");
        dispatch(insertCellBefore({ nextCellId, type2 }));
    }
    return <div>
        <button onClick={handleClickCode}>Code</button>
        <button onClick={handleClickText}>Text</button>
    </div >
}

export default AddCell;