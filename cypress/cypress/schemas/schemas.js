const Joi = require("joi");

//schema parcial
const weather_schema = Joi.object().keys({
    name: Joi.string(),
    id: Joi.number(),
    cod: Joi.number(),
    timezone: Joi.number(),
    dt: Joi.number(),
    visibility: Joi.number(),
    base: Joi.string()
})
  
module.exports = {
    weather_schema
}