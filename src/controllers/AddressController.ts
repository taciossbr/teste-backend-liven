import { Request, Response } from "express";
import connection from "../database/connection";
import { getLoggedUser } from "../lib/auth";


export default class AddressController {
    async create(request: Request, response: Response) {
        const userId = parseInt(request.params.userId)
        const {country, state, city, neighbourhood,
        street, zipCode, houseNumber, complement } = request.body

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== userId) {
            return response.status(404).json({
                'error': `User with id #${userId} not found.`
            })
        }

        const [id] = await connection('addresses').insert({
            country, state, city, neighbourhood,
            street, zipCode, houseNumber, complement, userId
        }).returning('id')

        const address = await connection('addresses')
            .where({id}).first()

        return response.json(address)
    }


    async show(request: Request, response: Response) {
        const { id } = request.params
        const userId = parseInt(request.params.userId)

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== userId) {
            return response.status(404).json({
                'error': `User with id #${userId} not found.`
            })
        }
        
        const address = await connection('addresses')
            .where({ id, userId }).first()
        if (!address) {
            return response.status(404).json({
                'error': `Address with id #${id} not found.`
            })
        }
        
        return response.json(address)
    }
    
    async list(request: Request, response: Response) {
        const userId = parseInt(request.params.userId)
        const { country } = request.query

        const loggedUser = await getLoggedUser(request)
        console.log(loggedUser, userId)

        if (!loggedUser || loggedUser.id !== userId) {
            return response.status(404).json({
                'error': `User with id #${userId} not found.`
            })
        }

        let addressesQuery = connection('addresses')
            .where({userId: userId.toString()})

        if (country) {
            addressesQuery = addressesQuery.where({country})
        }

        const addresses = await addressesQuery

        return response.json(addresses)
    }

    async delete(request: Request, response: Response) {
        const userId = parseInt(request.params.userId)
        const { id } = request.params

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== userId) {
            return response.status(404).json({
                'error': `User with id #${userId} not found.`
            })
        }

        const address = await connection('addresses')
            .where({ id, userId }).first()
        if (!address) {
            return response.status(404).json({
                'error': `Address with id #${id} not found.`
            })
        }

        await connection('addresses')
            .where({ id })
            .del()

        return response.status(204).send()
    }


    async update(request: Request, response: Response) {
        const userId = parseInt(request.params.userId)
        const { id } = request.params

        const loggedUser = await getLoggedUser(request)

        if (!loggedUser || loggedUser.id !== userId) {
            return response.status(404).json({
                'error': `User with id #${userId} not found.`
            })
        }

        const address = await connection('addresses')
            .where({ id, userId }).first()

        if (!address) {
            return response.status(404).json({
                'error': `Address with id #${id} not found.`
            })
        }

        await connection('addresses')
            .where({ id })
            .update(request.body)
        
        const addressUpdated = await connection('addresses')
            .where({id}).first()

        return response.json(addressUpdated)
    }
}