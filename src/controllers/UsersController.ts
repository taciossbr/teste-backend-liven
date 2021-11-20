import { Request, Response } from "express";
import connection from "../database/connection";
import bcrypt from "bcrypt"


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

        return response.status(201).json({
            id, username, name, email
        })
    }

    async show(request: Request, response: Response) {
        const { id } = request.params

        const user = await connection('users')
            .select(['users.id', 'users.name', 'users.username', 'users.email'])
            .where({ id }).first()
        if (!user) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        return response.json(user)
    }

    async list(request: Request, response: Response) {

        const users = await connection('users')
            .select(['users.id', 'users.name', 'users.username', 'users.email'])

        return response.json(users)
    }

    async delete(request: Request, response: Response) {
        const { id } = request.params

        const user = await connection('users')
            .where({ id }).first()
        if (!user) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        await connection('users')
            .where({ id })
            .del()

        return response.status(204).send()
    }


    async update(request: Request, response: Response) {
        const { id } = request.params

        const user = await connection('users')
            .select(['users.id', 'users.name', 'users.username', 'users.email'])
            .where({ id }).first()

        if (!user) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        await connection('users')
            .where({ id })
            .update(request.body)

        return response.json({ ...user, ...request.body })
    }
}