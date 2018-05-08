const EnvVal = require('./../../../src/index');

const schema = EnvVal.joi.object({

  ENV_VAL_LOGGER_LEVEL: EnvVal.joi
    .string()
    .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),

  ENV_VAL_LOGGER_ENABLED: EnvVal.joi
    .boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)

}).required();

const {error, value: values} = EnvVal.joi.validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  schema,
  values
};
