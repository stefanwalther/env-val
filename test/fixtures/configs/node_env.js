const joi = require('joi');

const schema = joi.object({

  NODE_ENV: joi
    .string()

}).required();

const {error, value: envVars} = joi.validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const values = envVars;

module.exports = {
  schema,
  values
};
