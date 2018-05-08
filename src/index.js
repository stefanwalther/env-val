const glob = require('glob');
const path = require('path');
const Joi = require('joi');
const DEFAULT_ENVAL_CONFIG = {
  CONFIG_DIR: path.join(__dirname, 'config')
};

class EnvVal {

  /**
   * @typedef {object} EnvValOptions
   * @property {string} CONFIG_DIR - The directory to load the configuration files from.
   */

  /**
   * Create a new EnvVal instance.
   *
   * @param {EnvValOptions} envValOpts - Options for for env-val.
   * @constructor
   */
  constructor(configOverrides = {}, envValOpts = {}) {

    this._envValOptions = Object.assign(DEFAULT_ENVAL_CONFIG, envValOpts);
    this._configOverrides = configOverrides;
    this.configStore = {};
    this._schemas = [];

  }

  /**
   * Initializes the configuration objects.
   * @public
   */
  init() {

    this._loadConfigs();
    this.setConfigs(this._configOverrides);
    return this;
  }

  /**
   * Set custom configs, based on the schemes already loaded.
   */
  setConfigs(customConfig) {

    const mergedSchemas = this._mergeSchemas(this._schemas);
    const {error, value: envVars} = Joi.validate(customConfig, mergedSchemas, {allowUnknown: true, stripUnknown: true});
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    Object.assign(this.configStore, envVars);
  }

  /**
   * Load values & schemas from the given config directory.
   *
   * @description The config directory is set in the constructor: envValOpts.CONFIG_DIR
   *
   * @private
   */
  _loadConfigs() {

    let pattern = path.join(this._envValOptions.CONFIG_DIR, '/**/*.js');

    glob.sync(pattern).map(file => { // eslint-disable-line array-callback-return
      const {values, schema} = require(file);
      this._schemas.push(schema);
      Object.assign(this.configStore, values);
    });
  }

  /**
   *
   * @returns {*}
   * @private
   */
  _mergeSchemas() {
    let mergedSchema = Joi.object();
    this._schemas.forEach(schema => {
      mergedSchema = mergedSchema.concat(schema);
    });
    return mergedSchema;
  }

}

module.exports = EnvVal;
