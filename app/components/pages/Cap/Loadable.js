/**
 *
 * Asynchronously loads the component for Cap
 *
 */

import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import { loadable } from '@capillarytech/cap-ui-utils';
import React, { Suspense } from 'react';
const LoadableComponent = loadable(() => import('./Cap'));

const CapLoadable = () => (
  <Suspense fallback={<CapSpin />}>
    <LoadableComponent />
  </Suspense>
);

export default CapLoadable;
