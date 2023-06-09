import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import CellList from "./components/cell-list";
import { useEffect, useContext } from "react";
import * as esbuild from "esbuild-wasm";
import cellContext from "./context/cellContext";

function App() {
    const { fetchCells, postCells } = useContext(cellContext);

    useEffect(() => {
        esbuild.initialize({
            worker: true,
            wasmURL: "./esbuild.wasm",
        });
    }, []);

    useEffect(() => {
        fetchCells();
    }, [fetchCells]);

    const handleClick = () => {
        postCells();
    };

    return (
        <div>
            <div className="columns">
                <div className="column is-12">
                    <div className="is-flex is-flex-direction-row">
                        <h4 className="mr-1 has-text-light is-size-2 is-family-code has-text-weight-bold">
                            PROCODE
                        </h4>
                    </div>
                </div>
            </div>
            <button className="button button-primary" onClick={handleClick}>
                Save
            </button>
            <CellList />
        </div>
    );
}

export default App;
