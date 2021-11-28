import { Request, Response } from "express";
import connection from "../database/connection";
import bcrypt from "bcrypt"
import { getLoggedUser } from "../lib/auth";


export default class UsersController {
    async create(request: Request, response: Response) {
        const { username, name, email, password: unhashedPassword } = request.body
        const user = await connection('users')
            .where({ username })
            .orWhere({ email })
            .first()

        if (user) {
            return response.status(403).json({
                'error': 'There is already an user with this username or email'
            })
        }

        const password = bcrypt.hashSync(unhashedPassword, 10);

        const id = await connection('users').insert({
            username, name, email, password,
        }).returning('id')

        const userCreated = await connection('users')
            .select(['users.id', 'users.name', 'users.username', 'users.email'])
            .where({id})
            .first()

        return response.status(201).json(userCreated)
    }

    async show(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== id) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }
        const addresses = await connection('addresses')
            .where({userId: id})

        return response.json({...loggedUser, addresses})
    }

    async delete(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== id) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        await connection('users')
            .where({ id })
            .del()

        await connection('addresses')
            .where({ userId: id })
            .del()

        return response.status(204).send()
    }


    async update(request: Request, response: Response) {
        const id = parseInt(request.params.id)

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== id) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        await connection('users')
            .where({ id })
            .update(request.body)
        
        const userUpdated = await connection('users')
            .select(['users.id', 'users.name', 'users.username', 'users.email'])
            .where({id})
            .first()

        return response.json({ userUpdated })
    }
}