import { prefix } from '../app-config';
__webpack_public_path__ =
  new URL(((document || {}).currentScript || {}).src || window.location).origin + `${prefix}/`;

import { VulcanSDKSetup } from '@capillarytech/vulcan-react-sdk/utils';

import { appName, i18n as i18nConfig, appType, isHostedOnPlatform } from '../app-config';

import { publicPath } from './config/path';
import { getLocizeMessage, getUserData } from './services/api';

VulcanSDKSetup({
  publicPath,
  api: {
    translations: getLocizeMessage,
    auth: getUserData,
  },
  i18nConfig,
  appType,
  appName,
  isHostedOnPlatform,
});
