import { useSelector } from "react-redux";
import CellListItem from "./cell-list-item";
import AddCell from "./add-cell";
import { Fragment } from "react";

function CellList() {
    const cells = useSelector(({ cells: { loading, error, order, data } }) => {
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
        <div>
            {renderedCells}
            <AddCell nextCellId={null} />
        </div>
    );
}

export default CellList;