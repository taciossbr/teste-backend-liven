import { celebrate, Joi, errors, Segments } from 'celebrate'

export const create = celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    })
})

export const update = celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().email().required()
    })
})