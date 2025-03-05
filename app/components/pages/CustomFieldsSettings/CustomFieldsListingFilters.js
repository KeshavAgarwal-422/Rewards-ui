import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';

import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapSelectFilter from '@capillarytech/cap-ui-library/CapSelectFilter';
import CapTag from '@capillarytech/cap-ui-library/CapTag';

import { applyFilters } from './action';
import { getScopeFilterOptions } from './helpers';
import messages from './messages';
import globalMessages from '../Cap/messages';
import { customFieldsSettingsListingPrefix, listingFiltersKeys } from './constant';
import { createStructuredSelector } from 'reselect';
import { makeSelectApplySorting } from './selector';

export const CustomFieldsListingFilters = ({
  intl: { formatMessage },
  actions: { applyFilters },
  applySort,
}) => {
  const [searchValue, setSearchValue] = useState('');
  const [appliedFilters, setAppliedFilters] = useState({
    [listingFiltersKeys.search]: '',
    [listingFiltersKeys.scope]: '',
    [listingFiltersKeys.sort]: applySort,
  });

  useEffect(() => {
    updateFilters(listingFiltersKeys.sort, applySort);
  }, [applySort]);

  const debouncedApplyFilters = useCallback(
    debounce((filters) => applyFilters(filters), 300),
    [applySort],
  );

  const updateFilters = (key, value) => {
    const updatedFilters = { ...appliedFilters, [key]: value };
    setAppliedFilters(updatedFilters);
    debouncedApplyFilters(updatedFilters);
  };

  const handleSearchChange = (e) => {
    let searchValue = e.target.value;
    setSearchValue(searchValue);
    updateFilters(listingFiltersKeys.search, searchValue);
  };

  const handleScopeChange = (e) => updateFilters(listingFiltersKeys.scope, e?.key);

  const handleOnScopeClear = () => updateFilters(listingFiltersKeys.scope, '');

  return (
    <CapRow className={`${customFieldsSettingsListingPrefix}-filters`}>
      <CapRow type="flex" align="middle">
        <CapInput.Search
          className={`${customFieldsSettingsListingPrefix}-filters-search`}
          placeholder={formatMessage(messages.searchFilterPlaceholder)}
          allowClear
          value={searchValue}
          onChange={handleSearchChange}
        />
        <CapSelectFilter
          className={`${customFieldsSettingsListingPrefix}-filters-scope`}
          placeholder={formatMessage(globalMessages.scope)}
          showBadge
          data={getScopeFilterOptions()}
          getPopupContainer={(trigger) => trigger}
          overlayClassName=""
          selectedValue={appliedFilters?.scope}
          onSelect={handleScopeChange}
        />
      </CapRow>
      {appliedFilters?.scope && (
        <CapRow className={`${customFieldsSettingsListingPrefix}-filters-scope-tag`}>
          <CapTag key={appliedFilters?.scope} closable onClose={handleOnScopeClear}>
            {formatMessage(messages.scopeFilterOptionsTitle, {
              scope: appliedFilters?.scope,
            })}
          </CapTag>
        </CapRow>
      )}
    </CapRow>
  );
};

CustomFieldsListingFilters.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  applySort: PropTypes.bool,
};

CustomFieldsListingFilters.defaultProps = {
  actions: {},
  applySort: false,
};

const mapStateToProps = createStructuredSelector({
  applySort: makeSelectApplySorting(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        applyFilters,
      },
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(CustomFieldsListingFilters));
