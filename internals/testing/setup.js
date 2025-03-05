import registerRequireContextHook from 'babel-plugin-require-context-hook/register';

const { appName } = require('../../app-config');

registerRequireContextHook();

HTMLCanvasElement.prototype.getContext = jest.fn(); // for this error : Not implemented: HTMLCanvasElement.prototype.getContext

global.CURRENT_APP_NAME = appName;
