import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import moment from 'moment-timezone';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapSwitch from '@capillarytech/cap-ui-library/CapSwitch';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

import SettingsViewLabelValue from '../../atoms/SettingsViewLabelValue';

import messages from './messages';
import globalMessages from '../Cap/messages';

import { customFieldsSettingsViewPrefix } from './constant';
import { makeSelectSelectedCustomFieldMeta } from './selector';
import { CUSTOM_FIELD_DATA_TYPES, DEFAULT_DATE_TIME_FORMAT } from '../App/constants';

export const ViewCustomFieldContent = ({
  intl: { formatMessage },
  selectedCustomFieldMeta: { name, scope, dataType, defaultValue, isMandatory, enumValues },
}) => {
  const [expandEnums, setExpandEnums] = useState(false);

  const handleExpandEnums = () => {
    setExpandEnums((prev) => !prev);
  };

  return (
    <CapRow className={`${customFieldsSettingsViewPrefix}-content`}>
      <SettingsViewLabelValue label={formatMessage(globalMessages.name)} value={name} />
      <SettingsViewLabelValue
        label={formatMessage(globalMessages.scope)}
        value={formatMessage(messages.scopeFilterOptionsTitle, { scope })}
      />
      <SettingsViewLabelValue
        label={formatMessage(globalMessages.dataType)}
        value={formatMessage(globalMessages.dataTypes, { dataType })}
      />
      {dataType === CUSTOM_FIELD_DATA_TYPES.ENUM && (
        <CapRow className={`${customFieldsSettingsViewPrefix}-enum-values`}>
          <CapRow
            className="pointer-cursor"
            type="flex"
            align="middle"
            justify="space-between"
            onClick={handleExpandEnums}
          >
            <CapLabel type="label18">{formatMessage(globalMessages.preDefinedValues)}</CapLabel>
            {expandEnums ? (
              <CapIcon type="chevron-up" size="m" />
            ) : (
              <CapIcon type="chevron-down" size="m" />
            )}
          </CapRow>
          {expandEnums ? (
            <CapRow>
              {enumValues?.map((value) => (
                <CapLabel
                  key={value}
                  type="label15"
                  className={`${customFieldsSettingsViewPrefix}-enum-value`}
                >
                  {value}
                </CapLabel>
              ))}
            </CapRow>
          ) : (
            <CapLabel type="label15">
              {formatMessage(messages.preDefinedEnumValues, {
                firstValue: enumValues?.[0],
                moreValuesCount: enumValues?.length - 1,
              })}
            </CapLabel>
          )}
        </CapRow>
      )}
      <CapRow
        type="flex"
        align="middle"
        justify="space-between"
        className={`${customFieldsSettingsViewPrefix}-mandatory-switch`}
      >
        <CapLabel type="label18">{formatMessage(messages.isCustomFieldMandatory)}</CapLabel>
        <CapSwitch checked={isMandatory} disabled />
      </CapRow>
      {!!defaultValue && (
        <SettingsViewLabelValue
          label={formatMessage(globalMessages.defaultValue)}
          value={dataType === CUSTOM_FIELD_DATA_TYPES.DATE ? moment(defaultValue).format(DEFAULT_DATE_TIME_FORMAT) : defaultValue}
        />
      )}
    </CapRow>
  );
};

ViewCustomFieldContent.propTypes = {
  intl: intlShape.isRequired,
  selectedCustomFieldMeta: PropTypes.object,
};

ViewCustomFieldContent.defaultProps = {
  selectedCustomFieldMeta: {},
};

const mapStateToProps = createStructuredSelector({
  selectedCustomFieldMeta: makeSelectSelectedCustomFieldMeta(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(withConnect)(injectIntl(ViewCustomFieldContent));
