import { loadable } from '@capillarytech/cap-ui-utils';

import ListRewards from '../ListRewards/Loadable';

const routes = [
  {
    exact: true,
    path: `/`,
    component: ListRewards,
  },
  {
    path: `/settings`,
    component: loadable(() => import('../RewardsCatalogSettings')),
  },
  {
    exact: true,
    path: `/accessForbidden`,
    component: loadable(() => import('@capillarytech/vulcan-react-sdk/components/AccessForbidden')),
  },
];

export default routes;
