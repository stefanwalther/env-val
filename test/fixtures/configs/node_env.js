const EnvVal = require('./../../../src/index');

const schema = EnvVal.joi.object({

  NODE_ENV: EnvVal.joi
    .string()

}).required();

const {error, value: envVars} = EnvVal.joi.validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const values = envVars;

module.exports = {
  schema,
  values
};
