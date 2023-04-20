import Joi from "joi";

const signupschema = Joi.object({
  "email": Joi.string().email().required(),
  "password": Joi.string().alphanum().required(),
  "confirmPassword": Joi.string().alphanum().required().valid(Joi.ref('password')),
});

const signinschema = Joi.object({
  "email": Joi.string().email().required(),
  "password": Joi.string().alphanum().required(),
});

export const signupValidation = (data) => signupschema.validate(data, {abortEarly: false});
export const signinValidation = (data) => signinschema.validate(data, {abortEarly: false});