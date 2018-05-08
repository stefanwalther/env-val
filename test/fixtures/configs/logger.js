const joi = require('joi');

const schema = joi.object({

  ENV_VAL_LOGGER_LEVEL: joi
    .string()
    .allow(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),

  ENV_VAL_LOGGER_ENABLED: joi
    .boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)

}).required();

const {error, value: envVars} = joi.validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

// Const values = {
//   LOGGER: envVars
// };
const values = envVars;

module.exports = {
  schema,
  values
};
