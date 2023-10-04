import express from "express";
import path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { createCellsRouter } from "./routes/cells";

export const serve = (
    port: number,
    filename: string,
    dir: string,
    useproxy: boolean
) => {
    const app = express();

    app.use(createCellsRouter(filename, dir));
    if (useproxy) {
        app.use(
            createProxyMiddleware({
                target: `http://127.0.0.1:3000`,
                ws: true,
                logLevel: "silent",
            })
        );
    } else {
        const packagePath = require.resolve(
            "@pro_coder_notebook/local-client/build/index.html"
        );
        app.use(express.static(path.dirname(packagePath)));
    }

    return new Promise<any>((resolve: any, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
