import { useSelector } from "react-redux";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment, useEffect } from "react";
import './cell-list.css'

function CellList() {
    const cells = useSelector(({ cells: { order, data } }) => {
        const ok = order.map((id) => {
            return data[id];
        });
        return ok;
    });

    const renderedCells = cells.map((cell) => {
        return (
            <Fragment key={cell.id}>
                <AddCell nextCellId={cell.id} />
                <CellListItem cell={cell} />
            </Fragment>
        );

    });
    return (
        <div className="cell-list">
            {renderedCells}
            <div className={cells.length === 0 ? "force-vis" : ''}>
                <AddCell nextCellId={null} />
            </div>
        </div>
    );
}

export default CellList;