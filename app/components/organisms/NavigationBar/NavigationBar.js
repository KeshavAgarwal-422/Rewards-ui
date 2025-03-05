/**
 * NavigationBar
 */
import CapNavigation from '@capillarytech/cap-ui-library/CapNavigation';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import { NotFoundPage } from '@capillarytech/vulcan-react-sdk/components';
import { withStyles, localStorageApi } from '@capillarytech/vulcan-react-sdk/utils';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useMemo, useCallback, Suspense } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Switch, withRouter } from 'react-router-dom';

import appConfig from '../../../../app-config';
import { isRewardsCatalogFeatureEnabled } from '../../../utils/commonUtils';
import RenderRoute from '../../atoms/RenderRoute';
import componentRoutes from '../../pages/App/routes';
import { getSettingsMenuData } from '../../pages/Cap/constants';

import * as constants from './constants';
import messages from './messages';
import styles from './style';

const { DEFAULT_MODULE } = constants;

export const getDefaultActiveKey = () => {
  const path = location.pathname?.replace('/rewards-catalog/ui', '') || '';
  const menuData = getSettingsMenuData();
  const matchedRoute = menuData?.find((item) => item?.link && path.includes(item.link));
  return matchedRoute ? matchedRoute.key : 'categories';
};

export const NavigationBar = ({
  className,
  sidebarMenuData,
  sidebarMenuItemsPosition,
  showSecondaryTopBar,
  topbarMenuData = [],
  userData,
  secondaryTopBarActionHandler,
  intl: { formatMessage = () => {} } = {},
  ...props
}) => {
  const onTopMenuClick = ({ link }) => props.history.push(link);

  const isSettingsEnabled = isRewardsCatalogFeatureEnabled();

  const isSettingsPage = props?.history?.location?.pathname?.includes('settings') ?? false;

  const topbarMenuDataModified = useMemo(
    () =>
      topbarMenuData.map((menu) => ({
        ...menu,
        onClickHandler: onTopMenuClick,
      })),
    [topbarMenuData],
  );

  const getDropdownMenu = () => [
    {
      label: formatMessage(messages.orgSettings),
      key: formatMessage(messages.orgSettings),
      onClickHandler: onOrgSettingsClick,
    },
    {
      label: formatMessage(messages.logout),
      key: formatMessage(messages.logout),
      onClickHandler: props.logout,
    },
  ];
  const onOrgSettingsClick = () => {
    const { orgSettingsUrl } = props;
    if (orgSettingsUrl) {
      window.open(orgSettingsUrl, '_blank');
    }
  };

  const getTopbarIcons = () => [
    {
      iconType: 'notifications',
      key: 'notifications',
      onClickHandler: onNotificationIconClick,
    },
    {
      iconType: 'help',
      key: 'help',
      onClickHandler: onHelpIconClick,
    },
    {
      iconType: 'settings',
      key: 'settings',
      placement: 'bottomRight',
      className: 'navigation-setting-icon',
      toolTip: !isSettingsEnabled && formatMessage(messages.noProductSetting),
      onClickHandler: !isSettingsEnabled ? () => {} : onSettingsIconClick,
    },
  ];

  const onNotificationIconClick = () => {
    const { notificationUrl } = props;
    if (notificationUrl) {
      props.history.push(notificationUrl);
    }
  };

  const onHelpIconClick = () => {
    const { helpUrl } = props;
    if (helpUrl) {
      window.open(helpUrl, '_blank');
    }
  };

  const onSettingsIconClick = () => {
    const { settingsUrl } = props;
    if (settingsUrl) {
      props?.history?.push(settingsUrl);
    }
  };

  const changeOrgEntity = (orgId) => {
    const selectedOrg = localStorageApi.loadItem('orgID');
    if (selectedOrg !== orgId) {
      props.changeOrg(orgId);
    }
  };

  const sidebarMenuItemClick = (item) => {
    const { history } = props;
    history.push(item.link, { code: item.key });
  };

  const topbarIcons = getTopbarIcons();
  const dropdownMenuProps = getDropdownMenu();

  const renderSuspenseBlock = useCallback(
    () => (
      <Suspense fallback={<CapSpin />}>
        <Switch>
          {componentRoutes.map((routeProps) => (
            <RenderRoute {...routeProps} key={routeProps.path} />
          ))}
          <RenderRoute component={NotFoundPage} />
        </Switch>
      </Suspense>
    ),
    [],
  );

  return (
    <div className={className}>
      {appConfig?.useNavigationComponent ? (
        <CapNavigation
          className={classNames('rewards-catalog-settings-container', {
            'on-settings-page': isSettingsPage,
          })}
          showContent
          userData={userData}
          loadStorageItem={localStorageApi.loadItem}
          changeOrgEntity={changeOrgEntity}
          topbarMenuData={topbarMenuDataModified}
          topbarSelectedMenuData={[DEFAULT_MODULE]}
          dropdownMenuProps={dropdownMenuProps}
          topbarIcons={topbarIcons}
          sidebarMenuData={sidebarMenuData}
          sidebarMenuItemsPosition={sidebarMenuItemsPosition}
          sidebarMenuItemClick={sidebarMenuItemClick}
          defaultSelectedProduct={formatMessage(messages.selectedProductDefault)}
          showSecondaryTopBar={showSecondaryTopBar}
          secondaryTopBarActionHandler={secondaryTopBarActionHandler}
          skipStateForStorage
          defaultActiveKey={getDefaultActiveKey()}
        >
          {renderSuspenseBlock()}
        </CapNavigation>
      ) : (
        <div className="centered-div">{renderSuspenseBlock()}</div>
      )}
    </div>
  );
};

NavigationBar.propTypes = {
  className: PropTypes.string,
  userData: PropTypes.object,
  topbarMenuData: PropTypes.array,
  showSecondaryTopBar: PropTypes.bool,
  sidebarMenuItemsPosition: PropTypes.string,
  orgSettingsUrl: PropTypes.string,
  settingsUrl: PropTypes.string,
  notificationUrl: PropTypes.string,
  helpUrl: PropTypes.string,
  changeOrg: PropTypes.func,
  logout: PropTypes.func,
  secondaryTopBarActionHandler: PropTypes.func,
  history: PropTypes.object.isRequired,
  sidebarMenuData: PropTypes.array.isRequired,
  intl: intlShape.isRequired,
};

NavigationBar.defaultProps = {
  className: '',
  userData: {},
  topbarMenuData: [],
  showSecondaryTopBar: false,
  sidebarMenuItemsPosition: '',
  orgSettingsUrl: '',
  settingsUrl: '',
  notificationUrl: '',
  helpUrl: '',
  changeOrg: () => {},
  logout: () => {},
  secondaryTopBarActionHandler: () => {},
};

export default withRouter(injectIntl(withStyles(NavigationBar, styles)));
