import { Request, Response } from "express";
import connection from "../database/connection";
import bcrypt from "bcrypt"


export default class CredentialsController {

    async update(request: Request, response: Response) {
        const { id } = request.params
        const {currentPassword, newPassword} = request.body

        const user = await connection('users')
            .where({ id }).first()

        if (!user) {
            return response.status(404).json({
                'error': `User with id #${id} not found.`
            })
        }
        console.log(currentPassword, user)
        if (bcrypt.compareSync(currentPassword, user.password)) {
            const password = bcrypt.hashSync(newPassword, 10);

            await connection('users')
                .where({ id })
                .update({password})
            delete user.password
            return response.json({ user })
        }
        return response.status(401).json({
            'error': 'Wrong password'
        })
    }
}