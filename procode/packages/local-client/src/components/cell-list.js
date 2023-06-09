import { useContext } from "react";
import cellContext from "../context/cellContext";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";
import "./cell-list.css";

function CellList() {
    const { order, data } = useContext(cellContext);

    const cells = order.map((id) => {
        return data[id];
    });

    const renderedCells = cells.map((cell) => {
        return (
            <Fragment key={cell.id}>
                <AddCell />
                <CellListItem cell={cell} />
            </Fragment>
        );
    });
    return (
        <div className="cell-list">
            {renderedCells}
            <div className={cells.length === 0 ? "force-vis" : ""}>
                <AddCell />
            </div>
        </div>
    );
}

export default CellList;
