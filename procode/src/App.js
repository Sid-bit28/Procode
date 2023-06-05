import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CellList from './components/cell-list';
import { useDispatch } from 'react-redux';
import { insertCellBefore } from './store';

function App() {
    const dispatch = useDispatch();
    dispatch(insertCellBefore("code"));
    dispatch(insertCellBefore("text"));
    return (
        <div>
            <CellList />
        </div>
    );
}

export default App;