import express from "express";
import UsersController from "./controllers/UsersController";

const server = express();

server.use(express.json())

const usersController = new UsersController()

server.post('/users', usersController.create)
server.get('/users', usersController.list)
server.get('/users/:id', usersController.show)
server.put('/users/:id', usersController.update)
server.delete('/users/:id', usersController.delete)

export default server