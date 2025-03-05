import { mockUserData } from '../../../pages/Cap/tests/mockData';

export const naviData = {
  className: 'test-nav',
  sidebarMenuData: [],
  sidebarMenuItemsPosition: 'left',
  showSecondaryTopBar: false,
  topbarMenuData: [
    {
      label: 'Test Menu',
      key: 'test',
      link: '/test',
    },
  ],
  userData: mockUserData,
  history: {
    push: jest.fn(),
    location: {
      pathname: '/test',
    },
  },
  intl: {
    formatMessage: jest.fn((msg) => msg.defaultMessage || msg),
  },
  logout: jest.fn(),
  settingsUrl: '/settings',
  orgSettingsUrl: 'https://test.com/settings',
};
