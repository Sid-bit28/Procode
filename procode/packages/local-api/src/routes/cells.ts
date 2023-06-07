import express from 'express';
import fs from 'fs/promises';
import path from 'path';

interface Cell {
    id: string;
    content: string;
    type: 'text' | 'code';
}

export const createCellsRounter = (filename: string, dir: string) => {
    const router = express.Router();
    router.use(express.json);

    const fullPath = path.join(dir, filename);
    router.get('/cells', async (req, res) => {
        try {
            const result = await fs.readFile(fullPath, { encoding: 'utf-8' });
            res.send(JSON.parse(result));
        } catch (err: any) {
            if (err.code === 'ENOENT') {
                await fs.writeFile(fullPath, '[]', 'utf-8');
                res.send([]);
            } else {
                throw err;
            }
        }
        // bug : file exist maybe na kre
        // stackoverflow solution:

    });


    router.post('/cells', async (req, res) => {
        const { cells } = req.body;
        await fs.writeFile(fullPath, JSON.stringify(cells), 'utf-8');
        res.send({ status: "ok" });
    });

    return router;
};