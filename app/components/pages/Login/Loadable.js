/**
 *
 * Asynchronously loads the component for Login
 *
 */

import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import { loadable } from '@capillarytech/cap-ui-utils';
import React, { Suspense } from 'react';

const LoadableComponent = loadable(() => import('./Login'));

const ListRewardsLoadable = () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);

export default ListRewardsLoadable;
