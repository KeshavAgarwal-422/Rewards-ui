import Bugsnag from '@bugsnag/js';
import { ErrorBoundaryDefault } from '@capillarytech/vulcan-react-sdk/components';
import { bugsnagInitializer } from '@capillarytech/vulcan-react-sdk/utils';
import React from 'react';

import appConfig from '../../../../app-config';
import routes from '../../pages/App/routes';

const useBugsnag = appConfig.bugsnag.useBugsnag;
const basename = appConfig.prefix;
let ErrorBoundary;

if (useBugsnag) {
  bugsnagInitializer({
    // eslint-disable-next-line no-undef
    apiKey: BUGSNAG_API_KEY,
    // eslint-disable-next-line no-undef
    appVersion: BUGSNAG_APP_VERSION,
    releaseStage: window.location.hostname,
    basename,
    routes,
  });
  ErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);
} else {
  ErrorBoundary = ErrorBoundaryDefault;
}

export default ErrorBoundary;
