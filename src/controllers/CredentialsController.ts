import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import connection from "../database/connection";
import bcrypt from "bcrypt"
import settings from "../../settings"
import { getLoggedUser } from "../lib/auth";


export default class CredentialsController {

    async login(request: Request, response: Response) {
        const { username, password } = request.body
        const user = await connection('users')
        .where({ username }).first()
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return response.status(401).json({
                error: 'Wrong username or password!'
            })
        }
        const token = jwt.sign({id: user.id}, settings.JWT_SECRET, { expiresIn: '2d' })
        return response.json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                name: user.name
            },
            token,
        })
    }

    async update(request: Request, response: Response) {
        const id = parseInt(request.params.id)
        const {currentPassword, newPassword} = request.body

        const loggedUser = await getLoggedUser(request, {includePassword: true})

        if (!loggedUser || loggedUser.id !== id) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }

        if (bcrypt.compareSync(currentPassword, loggedUser.password)) {
            const password = bcrypt.hashSync(newPassword, 10);

            await connection('users')
                .where({ id })
                .update({password})
            delete loggedUser.password
            return response.json({ user: loggedUser })
        }
        return response.status(401).json({
            'error': 'Wrong password'
        })
    }
}