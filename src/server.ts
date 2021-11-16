import express from "express";

const server = express();

server.get('/', (req, res) => {
    return res.json({
        message: 'hello, world'
    })
})

export default server