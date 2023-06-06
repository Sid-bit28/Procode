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
            const idd = action.payload.id;
            const direction = action.payload.up || action.payload.down;
            const index = state.order.findIndex((id) => id === idd);
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
            //assumption: action.payload = {id, type}
            const id = nanoid();
            let content = '';
            if (action.payload.type1) {
                content = "console.log('Hello Welcome!')"
            } else {
                content = "# Hello Welcome!"
            }
            const newCell = {
                id,
                content,
                type: action.payload.type1 || action.payload.type2
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
            const { id, value } = action.payload;
            state.data[id].content = value;
        }
    },
});

export const { moveCell, deleteCell, updateCell, insertCellBefore } = cellSlice.actions;
export const cellReducer = cellSlice.reducer;