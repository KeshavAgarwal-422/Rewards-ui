import CapRow from '@capillarytech/cap-ui-library/CapRow';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';

import { isRewardsCatalogEnabled } from '../../../utils/authWrapper';
import * as capActions from '../Cap/actions';

import {
  DEFAULT_SETTINGS_PATH,
  DEFAULT_CATEGORIES_SETTINGS_PATH,
  routeParamList,
} from './constants';

export const RewardsCatalogSettings = ({ capActions, match, history }) => {
  useEffect(() => {
    capActions.getSidebarMenuData();
    if (location.pathname === DEFAULT_SETTINGS_PATH) history.push(DEFAULT_CATEGORIES_SETTINGS_PATH);
    return () => {
      capActions.clearSidebarMenuData();
    };
  }, []);

  const routes = React.useMemo(
    () =>
      routeParamList?.map(({ key, path, component, heading }) => (
        <Route
          key={key}
          path={`${match.path}/${path}`}
          render={() => React.createElement(component, { heading })}
          exact
        />
      )),
    [match.path],
  );

  return (
    <CapRow>
      <Switch>{routes}</Switch>
    </CapRow>
  );
};

RewardsCatalogSettings.propTypes = {
  capActions: PropTypes.object.isRequired,
  match: PropTypes.object,
  history: PropTypes.object.isRequired,
};

RewardsCatalogSettings.defaultProps = {
  match: {},
};

export function mapDispatchToProps(dispatch) {
  return {
    capActions: bindActionCreators(capActions, dispatch),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default isRewardsCatalogEnabled(compose(withRouter, withConnect)(RewardsCatalogSettings));
