"use strict";

const Joi = require("joi");

const weather_schema = Joi.object({
    name: Joi.string()
})
  
module.exports = {
    weather_schema
}