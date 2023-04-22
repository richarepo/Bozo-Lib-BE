import Joi from "joi";

const searchQuerySchema = Joi.object({
  query: Joi.string().required().min(3)
});

const bookIDsSchema = Joi.object({
  "bookIDs": Joi.array().items(Joi.string().regex(/^\S+$/).length(12)).min(1).required()
});

export const searchQueryValidation = (query) => searchQuerySchema.validate(query, {abortEarly: false});
export const bookIDSValidation = (query) => bookIDsSchema.validate(query, {abortEarly: false});