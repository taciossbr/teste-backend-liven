import { Request, Response } from "express";
import connection from "../database/connection";


export default class AddressController {
    async create(request: Request, response: Response) {
        const {userId} = request.params
        const {country, state, city, neighbourhood,
        street, zipCode, houseNumber, complement } = request.body

        const [id] = await connection('addresses').insert({
            country, state, city, neighbourhood,
            street, zipCode, houseNumber, complement, userId
        }).returning('id')

        return response.json({
            country, state, city, neighbourhood,
            street, zipCode, houseNumber, complement,
            id, userId
        })
    }


    async show(request: Request, response: Response) {
        const { userId, id } = request.params
        
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
        const { userId } = request.params
        const { country } = request.query

        let addressesQuery = connection('addresses')
            .where({userId})

        if (country) {
            addressesQuery = addressesQuery.where({country})
        }

        const addresses = await addressesQuery

        return response.json(addresses)
    }

    async delete(request: Request, response: Response) {
        const { id, userId } = request.params

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
        const { id, userId } = request.params

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

        return response.json({ ...address, ...request.body })
    }
}