import { celebrate, Joi, Segments } from 'celebrate'

export const create = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        neighbourhood: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().regex(/\d{5}-\d{3}/).required(),
        houseNumber: Joi.string().required(),
        complement: Joi.string()
    })
})

export const show = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
    })
})
export const list = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required()
    }),
    [Segments.QUERY]: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        neighbourhood: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().regex(/\d{5}-\d{3}/).required(),
        
    })
})

export const remove = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
    })
})

export const update = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        userId: Joi.number().integer().required(),
        id: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        country: Joi.string().required(),
        state: Joi.string().required(),
        city: Joi.string().required(),
        neighbourhood: Joi.string().required(),
        street: Joi.string().required(),
        zipCode: Joi.string().regex(/\d{5}-\d{3}/).required(),
        houseNumber: Joi.string().required(),
        complement: Joi.string()
    })
})