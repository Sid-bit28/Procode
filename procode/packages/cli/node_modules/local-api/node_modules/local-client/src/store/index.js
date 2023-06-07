import { configureStore } from "@reduxjs/toolkit";
import { cellReducer, moveCell, deleteCell, insertCellBefore, updateCell } from "./slices/cellSlice";


const store = configureStore({
    reducer: {
        cells: cellReducer,
    },
});

export { store, moveCell, deleteCell, insertCellBefore, updateCell };
