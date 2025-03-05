import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';

import CapTable from '@capillarytech/cap-ui-library/CapTable';

import tableScrollHeight from 'utils/tableScrollHeight';

import { setCustomFieldId, setMode, sortList } from './action';
import {
  customFieldSettingsReduxKey,
  customFieldsSettingsListingPrefix,
  CustomFieldsSettingsMode,
} from './constant';
import {
  makeSelectApplySorting,
  makeSelectCustomFieldsSettingsMode,
  makeSelectGetAllCustomFields,
} from './selector';
import { getCustomFieldsListingTableColumns, getCustomFieldsListingTableRows } from './helpers';

import { REQUEST } from '../App/constants';

export const CustomFieldsListingTable = ({
  intl: { formatMessage },
  actions: { setCustomFieldId, setMode, sortList },
  getAllCustomFieldsData: { getAllCustomFieldsStatus, filteredCustomFields },
  applySorting,
}) => {
  const [hoveredRow, setHoveredRow] = useState(null);
  const areCustomFieldsLoading = getAllCustomFieldsStatus === REQUEST;
  const rowClassName = (record) =>
    `pointer-cursor ${record?.key === hoveredRow ? 'hovered-row' : ''}`;

  const customFieldsTableScrollHeight = tableScrollHeight(310);

  const handleMouseEnter = (record) => {
    setHoveredRow(record?.key);
    setCustomFieldId(record?.key);
  };

  const handleMouseLeave = () => {
    setHoveredRow('');
    setHoveredRow(null);
  };

  const handleOnRowClick = () => {
    setMode(CustomFieldsSettingsMode.VIEW);
  };

  const handleSortList = () => {
    sortList(!applySorting);
  };

  return (
    <CapTable
      id={customFieldSettingsReduxKey}
      className={`${customFieldsSettingsListingPrefix}-table`}
      columns={getCustomFieldsListingTableColumns(formatMessage, applySorting, handleSortList)}
      dataSource={getCustomFieldsListingTableRows(
        formatMessage,
        filteredCustomFields,
        setMode,
      )}
      scroll={{ y: customFieldsTableScrollHeight }}
      loading={areCustomFieldsLoading}
      onRow={(record) => ({
        onMouseEnter: () => handleMouseEnter(record),
        onMouseLeave: handleMouseLeave,
        onClick: handleOnRowClick,
      })}
      rowClassName={rowClassName}
      setPagination={() => {}} //empty function to handle infinite scroll
      infinteScroll
    />
  );
};

CustomFieldsListingTable.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  getAllCustomFieldsData: PropTypes.object,
  applySorting: PropTypes.bool,
};

CustomFieldsListingTable.defaultProps = {
  actions: {},
  getAllCustomFieldsData: {
    getAllCustomFieldsStatus: '',
    filteredCustomFields: [],
  },
  applySorting: false,
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectCustomFieldsSettingsMode(),
  getAllCustomFieldsData: makeSelectGetAllCustomFields(),
  applySorting: makeSelectApplySorting(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setCustomFieldId,
        setMode,
        sortList,
      },
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(CustomFieldsListingTable));
