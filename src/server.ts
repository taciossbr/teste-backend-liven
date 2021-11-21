import express from "express";
import AddressController from "./controllers/AddressController";
import CredentialsController from "./controllers/CredentialsController";
import UsersController from "./controllers/UsersController";
import { loginRequired } from "./middleware/auth";

const server = express();

server.use(express.json())

const usersController = new UsersController()
const credentialsController = new CredentialsController()
const addressesController = new AddressController()

server.post('/users', usersController.create)
server.get('/users', loginRequired, usersController.list)
server.get('/users/:id', loginRequired, usersController.show)
server.put('/users/:id', loginRequired, usersController.update)
server.delete('/users/:id', loginRequired, usersController.delete)
server.put('/users/:id/credentials', loginRequired, credentialsController.update)

server.post('/login', credentialsController.login)

server.post('/users/:userId/address/', addressesController.create)
server.get('/users/:userId/address/', addressesController.list)
server.put('/users/:userId/address/:id', addressesController.update)
server.delete('/users/:userId/address/:id', addressesController.delete)
server.get('/users/:userId/address/:id', addressesController.show)

export default server