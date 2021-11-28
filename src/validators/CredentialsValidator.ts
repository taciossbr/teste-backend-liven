import { celebrate, Joi, Segments } from 'celebrate'

export const login = celebrate({
    [Segments.BODY]: Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
    })
})

export const update = celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().integer().required(),
    }),
    [Segments.BODY]: Joi.object().keys({
        currentPassword: Joi.string().required(),
        newPassword: Joi.string().required(),
    })
})
