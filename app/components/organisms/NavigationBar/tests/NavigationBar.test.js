import '@testing-library/jest-dom';
import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';

import { NavigationBar } from '../NavigationBar';

import { naviData } from './mockData';

jest.setTimeout(10000);

jest.mock('../../../../utils/commonUtils', () => ({
  isRewardsCatalogFeatureEnabled: () => true,
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

const renderWithIntl = (component) => {
  return render(
    <BrowserRouter>
      <IntlProvider messages={{}} locale="en">
        {component}
      </IntlProvider>
    </BrowserRouter>,
  );
};

describe('<NavigationBar />', () => {
  const mockProps = naviData;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  it('should render without crashing', () => {
    renderWithIntl(<NavigationBar {...mockProps} />);
    expect(document.querySelector('.test-nav')).toBeInTheDocument();
  });

  it('should handle settings icon click when settings is enabled', async () => {
    const historyPushMock = jest.fn();
    const mockPropsWithSettings = {
      ...mockProps,
      history: {
        ...mockProps.history,
        push: historyPushMock,
        location: {
          pathname: '/settings',
        },
      },
    };

    renderWithIntl(<NavigationBar {...mockPropsWithSettings} />);

    const settingsIcon = document.querySelector('.navigation-setting-icon');
    expect(settingsIcon).toBeInTheDocument();

    await userEvent.click(settingsIcon);
    expect(historyPushMock).toHaveBeenCalledWith('/settings');
  });

  it('should handle top menu click', async () => {
    renderWithIntl(<NavigationBar {...mockProps} />);

    const menuItem = screen.getByText('Test Menu');
    expect(menuItem).toBeInTheDocument();

    await userEvent.click(menuItem);
    expect(mockProps.history.push).toHaveBeenCalledWith('/test');
  });
});
