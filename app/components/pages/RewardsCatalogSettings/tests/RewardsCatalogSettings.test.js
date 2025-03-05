import '@testing-library/jest-dom';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { configureStore } from '@capillarytech/vulcan-react-sdk/utils';
import { IntlProvider } from 'react-intl';

import initialState from '../../../../initialState';
import { actionTypes } from '../../Cap/constants';
import { RewardsCatalogSettings, mapDispatchToProps } from '../RewardsCatalogSettings';
import loginReducer from '../../Login/reducer';

jest.setTimeout(20000);
export const delay = (ms) => new Promise((res) => setTimeout(res, ms));

jest.mock('react-router-dom', () => {
  const actualData = jest.requireActual('react-router-dom');
  return {
    ...actualData,
    useHistory: () => ({
      push: jest.fn(),
    }),
    withRouter: (Component) => Component,
    Switch: ({ children }) => children,
    Route: ({ render }) => render(),
  };
});

describe('<RewardsCatalogSettings />', () => {
  const mockProps = {
    capActions: {
      getSidebarMenuData: jest.fn(),
      clearSidebarMenuData: jest.fn(),
    },
    match: {
      path: '/rewards-catalog/ui/settings',
    },
    history: {
      push: jest.fn(),
    },
  };

  const renderWithRouter = (component) => {
    let history = createMemoryHistory();
    let initialReducer = {
      [`${CURRENT_APP_NAME}-login-reducer`]: loginReducer,
    };
    const store = configureStore(initialState, initialReducer, history);

    return render(
      <Provider store={store}>
        <BrowserRouter>
          <IntlProvider>{component}</IntlProvider>
        </BrowserRouter>
      </Provider>,
    );
  };

  let originalLocation;
  beforeEach(() => {
    originalLocation = window.location;
    delete window.location;
    window.location = {
      pathname: '',
      assign: jest.fn(),
    };
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
    window.location = originalLocation;
  });

  it('should render without crashing', () => {
    renderWithRouter(<RewardsCatalogSettings {...mockProps} />);
    expect(document.querySelector('.ant-row')).toBeInTheDocument();
  });

  it('should call getSidebarMenuData on mount', () => {
    renderWithRouter(<RewardsCatalogSettings {...mockProps} />);
    expect(mockProps.capActions.getSidebarMenuData).toHaveBeenCalled();
  });

  it('should call clearSidebarMenuData on unmount', () => {
    const { unmount } = renderWithRouter(<RewardsCatalogSettings {...mockProps} />);
    unmount();
    expect(mockProps.capActions.clearSidebarMenuData).toHaveBeenCalled();
  });

  it('should redirect to default categories path if on default settings path', () => {
    window.location = { pathname: '/rewards-catalog/ui/settings' };
    expect(window.location.pathname).toBe('/rewards-catalog/ui/settings');

    renderWithRouter(<RewardsCatalogSettings {...mockProps} />);
    expect(mockProps.history.push).toHaveBeenCalled();
  });

  it('should render route components with correct heading prop', async () => {
    window.location = { pathname: '/rewards-catalog/ui/settings/categories' };
    expect(window.location.pathname).toBe('/rewards-catalog/ui/settings/categories');

    const mockPropsWithCategories = {
      ...mockProps,
      match: {
        path: '/rewards-catalog/ui/settings/categories',
      },
    };

    renderWithRouter(<RewardsCatalogSettings {...mockPropsWithCategories} />);
    await waitFor(
      () => {
        expect(screen.getAllByText('Custom fields')[0]).toBeInTheDocument();
      },
      { timeout: 10000 },
    );
  });

  it('should bind the correct actions to dispatch', () => {
    const dispatch = jest.fn();
    const boundProps = mapDispatchToProps(dispatch);
    boundProps.capActions.getSidebarMenuData();
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.GET_SIDEBAR_MENU_DATA_REQUEST,
    });
    boundProps.capActions.clearSidebarMenuData();
    expect(dispatch).toHaveBeenCalledWith({
      type: actionTypes.CLEAR_SIDEBAR_MENU_DATA,
    });
  });
});
