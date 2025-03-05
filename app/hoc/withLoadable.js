import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import { loadable } from '@capillarytech/cap-ui-utils';
import React, { Suspense } from 'react';

const withLoadable = (importFunc, FallbackComponent = CapSpin) => {
  const LoadableComponent = loadable(importFunc);

  const WithLoadable = (props) => (
    <Suspense fallback={<FallbackComponent />}>
      <LoadableComponent {...props} />
    </Suspense>
  );

  WithLoadable.displayName = `withLoadable(${importFunc.name || 'Component'})`;

  return WithLoadable;
};

export default withLoadable;
