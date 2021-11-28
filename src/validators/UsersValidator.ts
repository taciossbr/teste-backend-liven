import { celebrate, Joi, Segments } from 'celebrate'

export const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
})

export const show = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
})

export const remove = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
})

export const update = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
})