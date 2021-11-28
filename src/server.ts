import express from "express";
import { errors } from "celebrate";
import AddressController from "./controllers/AddressController";
import CredentialsController from "./controllers/CredentialsController";
import UsersController from "./controllers/UsersController";
import { loginRequired } from "./middleware/auth";
import * as UsersValidator from "./validators/UsersValidator"
import * as CredentialsValidator from "./validators/CredentialsValidator"
import * as AddressValidator from "./validators/AddressValidator"

const server = express();

server.use(express.json())


const usersController = new UsersController()
const credentialsController = new CredentialsController()
const addressesController = new AddressController()

server.post('/users', UsersValidator.create, usersController.create)
server.get('/users/:id', loginRequired, UsersValidator.show, usersController.show)
server.put('/users/:id', loginRequired, UsersValidator.update, usersController.update)
server.delete('/users/:id', loginRequired, UsersValidator.remove, usersController.delete)

server.put('/users/:id/credentials', loginRequired, CredentialsValidator.update, credentialsController.update)
server.post('/login', CredentialsValidator.login, credentialsController.login)

server.post('/users/:userId/address/', loginRequired, AddressValidator.create, addressesController.create)
server.get('/users/:userId/address/', loginRequired, AddressValidator.list, addressesController.list)
server.put('/users/:userId/address/:id', loginRequired, AddressValidator.update, addressesController.update)
server.delete('/users/:userId/address/:id', loginRequired, AddressValidator.remove, addressesController.delete)
server.get('/users/:userId/address/:id', loginRequired, AddressValidator.show, addressesController.show)

server.use(errors())

export default server