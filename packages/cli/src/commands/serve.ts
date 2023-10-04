import { Command } from "commander";
import { serve } from "@pro_coder_notebook/local-api";
import path from "path";

const isproduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
    .command("serve [filename]")
    .description("Open a file for editing")
    .option("-p, --port <number>", "port to run server on", "4005")
    .action(async (filename = "MyBook.js", options: { port: string }) => {
        try {
            const dir = path.join(process.cwd(), path.dirname(filename));
            await serve(
                parseInt(options.port),
                path.basename(filename),
                dir,
                !isproduction
            );
            console.log(
                `Welcome User, Please Navigate to http://localhost:${options.port}`
            );
        } catch (err: any) {
            if (err.code === "EADDRINUSE") {
                console.log(
                    "Port is already in use. Please try again with a different port"
                );
            } else {
                console.log("Here is the error", err.message);
            }
            process.exit(1);
        }
    });
