var env = process.env.NODE_ENV || 'dvl';
var config = require('./properties.json');
var envConfig = config[env];
Object.keys(envConfig).forEach(key => process.env[key] = envConfig[key]);