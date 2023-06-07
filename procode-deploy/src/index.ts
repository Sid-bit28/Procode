#!/usr/bin/env node
import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send("Hi There!");
});

app.listen(3005, () => {
    console.log('Listening to port 3005');
});