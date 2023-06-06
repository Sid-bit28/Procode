import 'bulmaswatch/superhero/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'
import CellList from './components/cell-list';

function App() {
    return (
        <div>
            <div className='columns'>
                <div className="column is-12">
                    <div className='is-flex is-flex-direction-row'>
                        <h4 className='mr-1 has-text-light is-size-2 is-family-code has-text-weight-bold'> PROCODE </h4>
                    </div>
                </div>
            </div>
            <CellList />
        </div>
    );
}

export default App;