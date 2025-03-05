const { appName } = require('../../../app-config');

const generateHash = require('./generateHash');
const appNameHash = () => `${appName}-${generateHash(appName, 6)}`;
module.exports = appNameHash;
