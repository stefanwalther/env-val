const EnvVal = require('./../../');
const path = require('path');

describe('Unit Tests', () => {
  describe('Ctor initializes', () => {
    it('and exposes some props & methods', () => {
      let config = new EnvVal();
      expect(config).to.have.property('_configOverrides');
      expect(config).to.have.property('_envValOptions');
      expect(config).to.have.property('configStore');
      expect(config).to.have.property('_schemas');

      expect(config).to.have.property('init').to.be.a('function');
      expect(config).to.have.property('_loadConfigs').to.be.a('function');
      expect(config).to.have.property('setConfigs').to.be.a('function');
    });
  });

  describe('_envValOptions', () => {
    it('contains a default value for CONFIG_DIR', () => {
      let config = new EnvVal();
      expect(config._envValOptions).to.have.a.property('CONFIG_DIR');
    });

    it('can be changed', () => {
      const customDir = path.join(__dirname, '../fixtures/configs');
      let config = new EnvVal({}, {CONFIG_DIR: customDir});
      expect(config._envValOptions).to.have.a.property('CONFIG_DIR').to.be.equal(customDir);
    });
  });

  describe('init()', () => {
    it('loads config files', () => {
      let config = new EnvVal({}, {CONFIG_DIR: path.join(__dirname, '../fixtures/no-configs')}).init();
      expect(config).to.have.a.property('configStore').to.exist;
      expect(config.configStore).to.not.have.property('ENV_VAL_LOGGER_LEVEL');
    });

    it('loads config files from a custom directory', () => {
      const customDir = path.join(__dirname, '../fixtures/configs');
      process.env.NODE_ENV = 'foo';
      let config = new EnvVal({}, {CONFIG_DIR: customDir}).init();
      expect(config).to.have.a.property('configStore').to.exist;
      expect(config.configStore).to.have.property('ENV_VAL_LOGGER_LEVEL').to.be.a('string').to.equal('info');
      expect(config.configStore).to.have.property('ENV_VAL_LOGGER_ENABLED').to.be.a('boolean').to.equal(true);
      expect(config.configStore).to.have.property('NODE_ENV').to.be.a('string').to.equal('foo');
    });

    it('allows to overwrite some configs', () => {
      const customDir = path.join(__dirname, '../fixtures/configs');
      let config = new EnvVal({
        ENV_VAL_LOGGER_LEVEL: 'warn',
        ENV_VAL_LOGGER_ENABLED: false
      }, {CONFIG_DIR: customDir}).init();
      expect(config).to.have.a.property('configStore').to.exist;
      expect(config.configStore).to.have.property('ENV_VAL_LOGGER_LEVEL').to.be.a('string').to.equal('warn');
      expect(config.configStore).to.have.property('ENV_VAL_LOGGER_ENABLED').to.be.a('boolean').to.equal(false);
    });

    it('throws an error if configs violate the schema (valid strings)', () => {
      const customDir = path.join(__dirname, '../fixtures/configs');
      try {
        let config = new EnvVal({ENV_VAL_LOGGER_LEVEL: 'foo'}, {CONFIG_DIR: customDir}).init();
        expect(config.configStore).to.have.property('ENV_VAL_LOGGER_LEVEL').to.be.a('string').to.equal('foo');
      } catch (e) {
        expect(e).to.have.property('message').to.deep.contain('"ENV_VAL_LOGGER_LEVEL" fails because');
      }
    });
  });

  describe('configs', () => {
    it('exposed the property configStore', () => {
      let config = new EnvVal();
      expect(config).to.have.property('configStore');
    });
  });
});
