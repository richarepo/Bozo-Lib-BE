import Joi from "joi";

const signupschema = Joi.object({
  "name": Joi.string().custom(str => /^(?=.*[a-zA-Z])\S+(?:\s\S+)*$/.test(str)),
  "email": Joi.string().email().required(),
  "password": Joi.string().alphanum().required().length(8),
  "confirmPassword": Joi.string().alphanum().required().valid(Joi.ref('password')),
});

const signinschema = Joi.object({
  "email": Joi.string().email().required(),
  "password": Joi.string().alphanum().required(),
});

export const signupValidation = (data) => signupschema.validate(data, {abortEarly: false});
export const signinValidation = (data) => signinschema.validate(data, {abortEarly: false});