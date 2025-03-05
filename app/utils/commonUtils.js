import { Auth } from '@capillarytech/cap-ui-utils';
import { gtmInitializer } from '@capillarytech/vulcan-react-sdk/utils';
import isEmpty from 'lodash/isEmpty';
import { v4 as uuidv4 } from 'uuid';

import appConfig from '../../app-config';
import { ENABLE_REWARDS_CATALOG } from '../components/pages/App/constants';

const { gtm: { useGTM, trackingId } = {}, appName } = appConfig;

export const pushDataToGTM = (eventType, eventObject = {}, userData) => {
  if (useGTM) {
    if (!isEmpty(eventType)) {
      const gtmInstance = gtmInitializer({
        gtmTrackingId: trackingId,
        appName: appName,
        userDetails: userData,
      });
      gtmInstance.push(eventType, eventObject);
    }
  }
};

/* export const isRewardsCatalogFeatureEnabled = Auth.hasFeatureAccess.bind(
  null,
  ENABLE_REWARDS_CATALOG,
); */

export const isRewardsCatalogFeatureEnabled = () => true;

export function generateUniqueId(digits = 4) {
  const uuid = uuidv4().replace(/-/g, ''); // remove the hyphens
  return uuid.slice(0, digits);
}
