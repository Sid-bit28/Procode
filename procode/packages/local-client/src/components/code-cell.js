import { useState, useEffect } from "react";
import bundle from "../bundler";
import CodeEditor from "./code-editor";
import Preview from "./preview";
import Resizable from "./resizable";
import { useContext } from "react";
import cellContext from "../context/cellContext";

function CodeCell({ cell }) {
    const [code, setCode] = useState("");
    const [err, setErr] = useState("");

    const { data, order, updateCell } = useContext(cellContext);

    const orderedCells = order.map((id) => data[id]);
    const completeCode = [];
    for (let c of orderedCells) {
        if (c.type === "code") {
            completeCode.push(c.content);
        }
        if (c.id === cell.id) {
            break;
        }
    }

    useEffect(() => {
        const timer = setTimeout(async () => {
            const output = await bundle(completeCode.join("\n"));
            setCode(output.code);
            setErr(output.error);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [completeCode.join("\n")]);

    const handleChange = (value) => {
        updateCell(cell.id, value);
    };

    return (
        <Resizable direction="vertical">
            <div
                style={{ height: "95%", display: "flex", flexDirection: "row" }}
            >
                <Resizable direction="horizontal">
                    <CodeEditor cell={cell} onChange={handleChange} />
                </Resizable>
                <Preview code={code} status={err} />
            </div>
        </Resizable>
    );
}

export default CodeCell;
