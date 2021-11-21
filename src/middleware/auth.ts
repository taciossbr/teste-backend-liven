import { Request, response, Response } from 'express';
import jwt from 'jsonwebtoken'
import settings from '../../settings';


export async function loginRequired(request: Request, response: Response, next: Function) {
    const [method, data] = request.headers.authorization?.split(' ') || []
    if (method === 'Bearer') {
        try {
            jwt.verify(data, settings.JWT_SECRET)
            next()
        } catch (err) {
            return response.status(401).json({
                error: 'Could not authenticate you'
            })
        }
    } else {
        return response.status(401).json({
            error: 'Could not authenticate you'
        })
    }
}