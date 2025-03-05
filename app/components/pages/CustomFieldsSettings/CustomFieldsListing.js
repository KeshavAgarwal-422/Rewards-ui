import React, { useEffect } from 'react';
import classNames from 'classnames';
import withStyledComponent from 'hoc/withStyledComponent';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeader from '@capillarytech/cap-ui-library/CapHeader';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import withErrorBoundary from 'hoc/withErrorBoundaryWrapper';
import WithClearDataOnUnmount from 'hoc/withClearDataOnUnmount';

import { getAllCustomFields, clearAllData } from './action';
import {
  customFieldSettingsReduxKey,
  customFieldsSettingsListingPrefix,
  CustomFieldsSettingsMode,
} from './constant';
import messages from './messages';
import reducer from './reducer';
import saga from './saga';
import { makeSelectCustomFieldsSettingsMode } from './selector';
import styles from './styles';

import CustomFieldsListingFilters from './CustomFieldsListingFilters';
import CustomFieldsListingTable from './CustomFieldsListingTable';
import CreateEditCustomField from './CreateEditCustomField';
import ViewCustomField from './ViewCustomField';

import globalMessages from '../../pages/Cap/messages';

export const CustomFieldsListing = ({
  intl: { formatMessage },
  className,
  actions: { getAllCustomFields },
  mode,
}) => {
  const isViewMode = mode === CustomFieldsSettingsMode.VIEW;

  useEffect(() => {
    getAllCustomFields();
  }, []);

  return (
    <CapRow
      className={classNames(
        className,
        `${customFieldsSettingsListingPrefix}-container`,
        'settings-ui-container',
      )}
    >
      <CapHeader
        className="settings-ui-header"
        title={formatMessage(globalMessages.customFields)}
        description={formatMessage(messages.customFieldsListingDescription)}
      />
      <CapRow type="flex" align="middle" justify="space-between">
        <CustomFieldsListingFilters />
        <CreateEditCustomField />
      </CapRow>
      <CustomFieldsListingTable />
      {isViewMode && <ViewCustomField />}
    </CapRow>
  );
};

CustomFieldsListing.propTypes = {
  intl: intlShape.isRequired,
  className: PropTypes.string,
  actions: PropTypes.object,
  mode: PropTypes.string,
};

CustomFieldsListing.defaultProps = {
  className: '',
  actions: {},
  mode: CustomFieldsSettingsMode.LISTING,
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectCustomFieldsSettingsMode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        getAllCustomFields,
        clearAllData,
      },
      dispatch,
    ),
  };
}

const withReducer = injectReducer({ key: customFieldSettingsReduxKey, reducer });
const withSaga = injectSaga({ key: customFieldSettingsReduxKey, saga });

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withRouter,
  withErrorBoundary,
  WithClearDataOnUnmount,
)(injectIntl(withStyledComponent(CustomFieldsListing, styles)));
