import { nanoid } from "nanoid";
import { createContext, useCallback, useState } from "react";
import axios from "axios";

const cellContext = createContext();
function Provider({ children }) {
    const [order, setOrder] = useState([]);
    const [data, setData] = useState({});

    //for fetching data
    const fetchCells = useCallback(async () => {
        const response = await axios.get("/cells");
        const updatedOrder = response.data.map((cell) => cell.id);
        const updatedData = {};
        for (let i = 0; i < updatedOrder.length; i++) {
            updatedData[updatedOrder[i]] = response.data[i];
        }
        setData(updatedData);
        setOrder(updatedOrder);
    }, []);

    // for saving data
    const postCells = async () => {
        const saveCells = order.map((id) => data[id]);
        const response = await axios.post("/cells", {
            cells: saveCells,
        });
        return response;
    };

    //Move Cell
    const moveCell = (id, dir) => {
        const index = order.findIndex((idd) => idd === id);
        const targetIndex = dir === "up" ? index - 1 : index + 1;
        const updatedOrder = [...order];
        if (!(targetIndex < 0 || targetIndex > order.length - 1)) {
            updatedOrder[index] = updatedOrder[targetIndex];
            updatedOrder[targetIndex] = id;
        }
        setOrder(updatedOrder);
    };

    //Delete Cell
    const deleteCell = (id) => {
        Object.filter = function (obj) {
            let result = {};
            for (let key in obj) {
                if (obj.hasOwnProperty(key) && key !== id) {
                    result[key] = obj[key];
                }
            }
            return result;
        };
        const updatedData = Object.filter(data);
        const updatedOrder = order.filter((idd) => {
            return idd !== id;
        });
        setData(updatedData);
        setOrder(updatedOrder);
    };

    //Insert Cell
    const insertCellBefore = (type) => {
        const newId = nanoid();
        let content;
        if (type === "text") {
            content = "# Welcome";
        } else if (type === "code") {
            content =
                'import React from "react";\nimport { createRoot } from "react-dom/client";\n\nconst el = document.getElementById("root");\nconst root = createRoot(el);\n\nroot.render(<h1> Hello! </h1>);';
        }
        const newCell = {
            id: newId,
            content,
            type,
        };
        const updatedOrder = [...order, newId];
        const updatedData = {
            ...data,
            [newId]: newCell,
        };
        setData(updatedData);
        setOrder(updatedOrder);
    };

    //Update Cell
    const updateCell = (id, value) => {
        const updatedData = {
            ...data,
            [id]: {
                ...data[id],
                content: value,
            },
        };
        setData(updatedData);
    };

    const valueToShare = {
        moveCell,
        deleteCell,
        insertCellBefore,
        updateCell,
        order,
        data,
        fetchCells,
        postCells,
    };

    return (
        <cellContext.Provider value={valueToShare}>
            {children}
        </cellContext.Provider>
    );
}

export { Provider };
export default cellContext;
