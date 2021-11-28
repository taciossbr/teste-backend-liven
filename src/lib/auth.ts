import { Request } from "express";
import jwt from 'jsonwebtoken'
import settings from "../../settings";
import connection from "../database/connection";

interface JWTData {
    id: Number
}

interface GetLoggetUserOptions {
    includePassword: Boolean
}

export async function getLoggedUser(req: Request, options?: GetLoggetUserOptions) {
    const authorization = req.header('Authorization')
    if (!authorization) {
        return null
    }
    const [authType, authPayload] = authorization.split(' ')
    if (authType != 'Bearer') {
        return null
    }
    try {
        const authData = <JWTData> jwt.verify(authPayload, settings.JWT_SECRET)
        
        const userId = authData.id

        if (options?.includePassword) {
            const user = await connection('users')
                .where({ id: userId }).first()
            return user

        } else {
            const user = await connection('users')
                .select(['users.id', 'users.name', 'users.username', 'users.email'])
                .where({ id: userId }).first()
            return user
        }

    } catch {
        return null
    }

    
}