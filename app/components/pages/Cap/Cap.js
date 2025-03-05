import CapSomethingWentWrong from '@capillarytech/cap-ui-library/CapSomethingWentWrong';
import CapSpin from '@capillarytech/cap-ui-library/CapSpin';
import multipleOrgSwitch from '@capillarytech/cap-ui-utils/utils/multipleOrgSwitch';
import { Translations } from '@capillarytech/vulcan-react-sdk/components';
import { injectSaga, injectReducer, withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import moment from 'moment-timezone';

import {
  prefix as prefixPath,
  appType,
  i18n,
  appName,
  appId,
  isHostedOnPlatform,
} from '../../../../app-config';
import * as path from '../../../config/path';
import NavigationBar from '../../organisms/NavigationBar';
import OrgChange from '../../organisms/OrgChange';
import * as appConstants from '../App/constants';
import * as loginActions from '../Login/actions';

import * as actions from './actions';
import * as constants from './constants';
import messages from './messages';
import reducer from './reducer';
import sagas from './saga';
import * as selectors from './selectors';
import * as styles from './styles';

const { useTranslations } = Translations;
const { REQUEST, SUCCESS, FAILURE, EXTERNAL, GTM_EVENTS } = appConstants;
const { publicPath } = path;
const { spinnerStyle } = styles;
const {
  makeSelectOrg,
  makeSelectCap,
  makeSelectSidebarMenuData,
  makeSelectTopbarMenuData,
  makeSelectIsoLangToLocizeLangMapping,
  makeSelectOrganizationTimezone,
} = selectors;
const {
  HELP_URL,
  ORG_SETTINGS_URL,
  LOYALTY_SETTINGS_URL,
  LOYALTY_NOTIFICATION_URL,
  SIDEBAR_MENU_ITEM_POSITION,
  MODULE_NAME_URL,
} = constants;

const { isMultipleTabsOpen } = multipleOrgSwitch;

const StyledCapSpin = withStyles(CapSpin, spinnerStyle);
const gtm = window.dataLayer || [];

export const Cap = ({
  topbarMenuData = [],
  sidebarMenuData,
  history,
  actions,
  loginActions,
  userData,
  orgData,
  isoLangToLocizeLangMapping,
  organizationTimezone,
  intl: { formatMessage },
}) => {
  const { pathname } = location;
  const { orgID, fetchingUserdata } = orgData;
  const { user, currentOrgDetails } = userData;
  const { refID } = user;
  const matchedPath = pathname?.includes(MODULE_NAME_URL);
  // need to handle for modules
  // const { params: { moduleName } = {} } = matchedPath || {};
  const onSettingsPage = matchedPath ? true : false;

  const [selectedOrgId, setSelectedOrgId] = useState(null);
  const { locale, changeLocale } = useTranslations();

  // Initialize moment timezone across the app
  useEffect(() => {
    if (organizationTimezone?.label) {
      console.log('organizationTimezone', organizationTimezone);
      moment.tz.setDefault(organizationTimezone.label);
    } else {
      // If no timezone is available, set the default fallback timezone to UTC
      moment.tz.setDefault('UTC');
    }
  }, [organizationTimezone]);

  useEffect(() => {
    const getUserGtmData = (userData, currentOrgDetails) => {
      const userName = userData?.attributes?.USERNAME;
      const userEmail = userData?.attributes?.EMAIL ?? userName;
      const {
        basic_details: {
          base_country: orgBaseCountry = '',
          base_currency: orgBaseCurrency = '',
          base_language: orgBaseLanguage = '',
          name = '',
        } = {},
      } = currentOrgDetails;
      const gtmData = {
        orgID,
        orgName: name,
        userId: userData?.refID,
        userName: userName?.value,
        userEmail: userEmail?.value,
        isCapUser: userData?.isCapUser,
        userRole: userData?.type,
        domainName: userEmail?.value?.split('@').pop(),
        orgBaseCountry,
        orgBaseCurrency,
        orgBaseLanguage,
        vulcanAppName: appName,
        vulcanAppId: appId,
        vulcanAppPrefix: prefixPath,
        vulcanAppType: appType,
        isHostedOnPlatform,
      };
      return gtmData;
    };
    if (refID !== undefined) {
      const userGtmData = getUserGtmData(user, currentOrgDetails);
      gtm.push({ ...userGtmData, event: GTM_EVENTS.USER_AUTHENTICATED });
    }
    if (orgID !== undefined) {
      gtm.push({ orgID });
    }
  }, [refID, orgID]);

  useEffect(() => {
    actions.getTopbarMenuData();
    actions.getOrganizationData();
    if (appType !== EXTERNAL && i18n?.useI18n) {
      actions.getSupportedLocales();
    }
    if (!fetchingUserdata) {
      actions.getUserData();
    }
    return () => {
      actions.clearTopbarMenuData();
    };
  }, [actions]);

  const changeOrg = (orgId) => {
    if (isMultipleTabsOpen()) {
      setSelectedOrgId(orgId);
    } else {
      changeOrgAction(orgId);
    }
  };

  const changeOrgAction = (orgId) => {
    actions.changeOrg(orgId, navigateToDashboard);
  };

  const navigateToDashboard = () => {
    const origin = window.location.origin;
    window.location.href = `${origin}${prefixPath}/`;
  };

  const logout = () => {
    loginActions.logout(history);
  };

  //Use changeLocale exposed by useTranslations to change the locale if user's lang is different than the default specified one.
  useEffect(() => {
    if (appType === EXTERNAL && i18n?.useI18n) return;
    const userIsoLang = userData?.user?.iso_lang;
    const locizeLang = isoLangToLocizeLangMapping.get(userIsoLang);

    if (userIsoLang && isoLangToLocizeLangMapping.size > 0 && locizeLang !== locale) {
      changeLocale(locizeLang);
    }
  }, [userData?.user?.iso_lang, isoLangToLocizeLangMapping.size]);

  const onSecNavActionsClick = (event) => {
    if (event.key === 'close-icon') {
      window.location.pathname = publicPath;
    }
  };

  const onClickReload = () => {
    window.location.reload();
  };

  return (
    <StyledCapSpin className="cap-container spinner" spinning={fetchingUserdata === REQUEST}>
      {fetchingUserdata === SUCCESS && (
        <NavigationBar
          userData={userData}
          topbarMenuData={topbarMenuData}
          showSecondaryTopBar={onSettingsPage}
          sidebarMenuItemsPosition={SIDEBAR_MENU_ITEM_POSITION}
          settingsUrl={LOYALTY_SETTINGS_URL}
          notificationUrl={LOYALTY_NOTIFICATION_URL}
          orgSettingsUrl={ORG_SETTINGS_URL}
          helpUrl={HELP_URL}
          changeOrg={changeOrg}
          history={history}
          sidebarMenuData={sidebarMenuData}
          logout={logout}
          pathname={pathname}
          secondaryTopBarActionHandler={onSecNavActionsClick}
        />
      )}
      {fetchingUserdata === FAILURE && (
        <CapSomethingWentWrong
          title={formatMessage(messages.somethingWentWrongTitle)}
          description={formatMessage(messages.somethingWentWrongDesc)}
          reloadText={formatMessage(messages.tryRefreshing)}
          onClickReload={onClickReload}
        />
      )}
      <OrgChange
        userData={userData}
        selectedOrgId={selectedOrgId}
        changeOrgAction={changeOrgAction}
        navigateToDashboard={navigateToDashboard}
      />
    </StyledCapSpin>
  );
};

Cap.propTypes = {
  match: PropTypes.object,
  history: PropTypes.object,
  orgData: PropTypes.object,
  userData: PropTypes.object,
  topbarMenuData: PropTypes.array,
  sidebarMenuData: PropTypes.array,
  actions: PropTypes.object.isRequired,
  loginActions: PropTypes.object,
  isoLangToLocizeLangMapping: PropTypes.object,
  organizationTimezone: PropTypes.shape({
    label: PropTypes.string,
    offset: PropTypes.string
  }),
  intl: intlShape.isRequired,
};

Cap.defaultProps = {
  match: {},
  history: {},
  orgData: {},
  userData: {},
  topbarMenuData: [],
  sidebarMenuData: [],
  loginActions: {},
  isoLangToLocizeLangMapping: {},
  organizationTimezone: {
    label: '',
    offset: ''
  },
};

const mapStateToProps = createStructuredSelector({
  orgData: makeSelectOrg(),
  userData: makeSelectCap(),
  sidebarMenuData: makeSelectSidebarMenuData(),
  topbarMenuData: makeSelectTopbarMenuData(),
  isoLangToLocizeLangMapping: makeSelectIsoLangToLocizeLangMapping(),
  organizationTimezone: makeSelectOrganizationTimezone(),
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
  loginActions: bindActionCreators(loginActions, dispatch),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withSaga = sagas.map((saga, index) => injectSaga({ key: `cap-${index}`, saga }));

const withReducer = injectReducer({ key: `${CURRENT_APP_NAME}_cap`, reducer });

export default compose.apply(null, [...withSaga, withReducer, withConnect])(
  withRouter(injectIntl(Cap)),
);
