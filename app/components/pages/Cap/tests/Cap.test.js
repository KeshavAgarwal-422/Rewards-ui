import { configureStore } from '@capillarytech/vulcan-react-sdk/utils';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import loginReducer from '../../Login/reducer';
import { Cap } from '../Cap';

import { mockUserData } from './mockData';

jest.setTimeout(20000);

export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

jest.mock('@capillarytech/vulcan-react-sdk/components/Translations', () => ({
  useTranslations: () => ({ locale: 'en', changeLocale: jest.fn() }),
  TranslationsProvider: ({ children }) => children,
}));

jest.mock('react-router-dom', () => {
  const actualData = jest.requireActual('react-router-dom');
  return {
    ...actualData,
    useHistory: () => ({
      push: jest.fn(),
    }),
    withRouter: (Component) => Component,
  };
});

const history = createMemoryHistory();
const store = configureStore({}, { [`rewards-catalog-login-reducer`]: loginReducer }, history);

const initializeComponent = (props) => {
  history.push('/');

  const actions = {
    getAllUsers: jest.fn(),
    getEMFStatus: jest.fn(),
    getUserGroupV2Status: jest.fn(),
    getBulkConfigStatus: jest.fn(),
    getCustomLabels: jest.fn(),
    getTimeZone: jest.fn(),
    getTopbarMenuData: jest.fn(),
    getOrganizationData: jest.fn(),
    getUserData: jest.fn(),
    getPrograms: jest.fn(),
    getLastSyncTime: jest.fn(),
    getOrgKpiConfig: jest.fn(),
    getProgramFilterType: jest.fn(),
    getMappedEntities: jest.fn(),
    getSenderDetails: jest.fn(),
    getAllSenderDetails: jest.fn(),
    clearTopbarMenuData: jest.fn(),
    removeMessageFromQueue: jest.fn(),
    addMessageToQueue: jest.fn(),
    changeOrg: jest.fn(),
    logout: jest.fn(),
    getSupportVideosConfig: jest.fn(),
    getSupportedLocales: jest.fn(),
  };
  const isoLangToLocizeLangMapping = new Map([['en', 'en']]);

  const propsObj = {
    topbarMenuData: [],
    sidebarMenuData: [],
    actions,
    match: {
      path: '/',
      url: '/',
      params: {},
      isExact: true,
    },
    userData: mockUserData,
    orgData: {
      fetchingUserdata: 'SUCCESS',
      fetchUserStatusCode: null,
      orgID: 781,
    },
    intl: { formatMessage: jest.fn() },
    history,
    isoLangToLocizeLangMapping,
    store,
    ...props,
  };

  const routePath = props?.historyPush || '/';
  history.push(routePath);

  return render(
    <Provider store={store}>
      <IntlProvider messages={{}} locale="en" defaultLocale="en">
        <Router history={history}>
          <Route path={routePath}>
            <Cap {...propsObj} />
          </Route>
        </Router>
      </IntlProvider>
    </Provider>,
  );
};

describe('<Cap /> page', () => {
  it('should render Cap component correctly', async () => {
    initializeComponent();
    await waitFor(
      () => {
        expect(screen.getByText(/This will be your listing page/i)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });

  it('should render settings page when route is /settings', async () => {
    initializeComponent({
      historyPush: '/settings',
      userData: {
        ...mockUserData,
        user: {
          ...mockUserData.user,
          accessibleFeatures: [],
          accessiblePermissions: ['ADMIN_ACCESS'],
        },
      },
    });
    await waitFor(() => {
      expect(screen.queryByText(/This will be your listing page/i)).not.toBeInTheDocument();
    });
  });

  it('should render access forbidden page when user does not have required permissions', async () => {
    initializeComponent({
      historyPush: '/accessForbidden',
      userData: {
        ...mockUserData,
        user: {
          ...mockUserData.user,
          accessiblePermissions: [],
        },
      },
    });

    await waitFor(
      () => {
        expect(screen.getByText(/Access Forbidden/i)).toBeInTheDocument();
      },
      { timeout: 5000 },
    );
  });
});
