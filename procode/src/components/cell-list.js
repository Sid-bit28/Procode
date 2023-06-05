import { useSelector } from "react-redux";
import CellListItem from "./cell-list-item";

function CellList() {
    let cells;
    useSelector((state) => {
        cells = state.cells.order.map((id) => {
            return state.cells.data[id];
        });
    });
    console.log(cells);

    const renderedCells = cells.map((cell) => {
        return <CellListItem key={cell.id} cell={cell} />
    })
    return (
        <div>{renderedCells}</div>
    );
}

export default CellList;