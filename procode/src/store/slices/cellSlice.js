import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

const cellSlice = createSlice({
    name: 'cell',
    initialState: {
        loading: false,
        error: null,
        order: [],
        data: {}
    },
    reducers: {
        moveCell(state, action) {
            //assumption: action.payload = {id, direction}
            const { direction } = action.payload;
            const index = state.order.findIndex((id) => id === action.payload.id);
            const targetIndex = direction === 'up' ? index - 1 : index + 1;
            if (!(targetIndex < 0 || targetIndex > state.order.length - 1)) {
                state.order[index] = state.order[targetIndex];
                state.order[targetIndex] = action.payload.id;
            }
        },
        deleteCell(state, action) {
            //assumption: action.payload = id
            delete state.data[action.payload];
            state.order = state.order.filter(id => id !== action.payload);
        },
        insertCellBefore(state, action) {
            //assumption: action.payload = {type}
            const newCell = {
                content: '',
                type: action.payload,
                id: nanoid()
            };
            state.data[newCell.id] = newCell;
            const index = state.order.findIndex((id) => id === action.payload.id);
            if (index < 0) {
                state.order.push(newCell.id);
            } else {
                state.order.splice(index, 0, newCell.id);
            }
        },
        updateCell(state, action) {
            //assumption: action.payload = {id, content}
            const { id, content } = action.payload;
            state.data[id].content = content;
        }
    },
});

export const { moveCell, deleteCell, updateCell, insertCellBefore } = cellSlice.actions;
export const cellReducer = cellSlice.reducer;