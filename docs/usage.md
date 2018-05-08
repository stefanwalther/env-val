
### Basic schema

Schemas are loaded by default from all files matching `**/*.js` in the directory `./config`.
Define a schema in `./config/logger.js`.

```js
// Load EnvVal to be able to get the exposed joi object.
const EnvVal = require('env-val');

const schema = EnvVal.joi.object({

  LOGGER_LEVEL: EnvVal.joi
    .string()
    .valid(['error', 'warn', 'info', 'verbose', 'debug', 'silly'])
    .default('info'),

  LOGGER_ENABLED: EnvVal.joi
    .boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)

}).required();

const {error, value: envVars} = EnvVal
                                .joi
                                .validate(process.env, schema, {allowUnknown: true, stripUnknown: true});
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const values = envVars;

module.exports = {
  schema,
  values
};

```

Basic initialization of `env-val`:

```js
const EnvVal = require('env-val');

let configs = new EnvVal().init();

console.log(configs.LOGGER_ENABLED); // => true
console.log(configs.LOGGER_LEVEL); // => 'info'

```

Override environment variables:

```js
const EnvVal = require('env-val');

let configs = new EnvVal({
  LOGGER_ENABLED: false,
  LOGGER_LEVEL: 'warn'
})
configs.init();

console.log(configs.LOGGER_ENABLED); // => false
console.log(configs.LOGGER_LEVEL); // => 'warn'
```

By default config files are loaded from the `./config` directory.
This can be customized by passing the `CONFIG_DIR` option to the constructor of _env-val_.

```js
const EnvVal = require('env-val');
const path = require('path');

let configs = new EnvVal({
  CONFIG_DIR: path.join(__dirname, 'my-custom-dir`
});

```