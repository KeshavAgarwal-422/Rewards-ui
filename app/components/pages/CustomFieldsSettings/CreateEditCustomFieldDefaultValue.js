import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';
import isNil from 'lodash/isNil';
import moment from 'moment-timezone';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapRadioGroup from '@capillarytech/cap-ui-library/CapRadioGroup';
import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';
import CapDatePicker from '@capillarytech/cap-ui-library/CapDatePicker';
import CapTimePicker from '@capillarytech/cap-ui-library/CapTimePicker';

import messages from './messages';
import globalMessages from '../Cap/messages';
import { setDefaultValue, setDefaultValueError } from './action';
import { customFieldsSettingsCreatePrefix, CustomFieldsSettingsMode } from './constant';
import {
  makeSelectCustomFieldMeta,
  makeSelectCustomFieldsSettingsMode,
  makeSelectEnumOptions,
} from './selector';
import {
  CUSTOM_FIELD_DATA_TYPES,
  DEFAULT_DATE_FORMAT,
  DEFAULT_TIME_FORMAT,
  DEFAULT_UTC_TZ_FORMAT,
} from '../App/constants';

const matchIntegerPattern = /^[\d\s]*$/;

export const CreateEditCustomFieldDefaultValue = ({
  intl: { formatMessage },
  actions: { setDefaultValue, setDefaultValueError },
  mode,
  customFieldMeta: { dataType, defaultValue, isMandatory, defaultValueError },
  enumOptions,
}) => {
  const isResetDisabled = isNil(defaultValue);

  const handleDefaultValueChange = (defaultValue) => {
    setDefaultValue(defaultValue);
  };

  const handleStringChange = (e) => {
    let value = e.target.value;
    handleDefaultValueChange(value);

    const isLengthError = value?.length > 255;

    // Dispatch only if error state changes
    if (isLengthError !== defaultValueError?.showError) {
      setDefaultValueError({
        showError: isLengthError,
        errorMessage: isLengthError ? formatMessage(messages.defaultValueStringError) : '',
      });
    }
  };

  const handleNumberChange = (e) => {
    const value = e.target.value.trim();
    if (matchIntegerPattern.test(value)) {
      handleDefaultValueChange(value);
    }
  };

  const handleBooleanChange = (e) => {
    handleDefaultValueChange(e.target.value);
  };

  const handleEnumChange = (value) => {
    handleDefaultValueChange(value);
  };

  const handleDateTimeChange = (moment) => {
    console.log(moment.format(DEFAULT_UTC_TZ_FORMAT));
    handleDefaultValueChange(moment.format(DEFAULT_UTC_TZ_FORMAT));
  };

  const handleReset = () => {
    handleDefaultValueChange(undefined);
  };

  return (
    <CapRow className={`${customFieldsSettingsCreatePrefix}-default-value-container`}>
      {dataType === CUSTOM_FIELD_DATA_TYPES.STRING && (
        <CapRow>
          <CapInput.TextArea
            data-testid="default-value-string-input"
            className={classNames(`${customFieldsSettingsCreatePrefix}-default-value-string`, {
              'text-area-error': defaultValueError?.showError,
            })}
            autocomplete="off"
            value={defaultValue}
            onChange={handleStringChange}
            placeholder={formatMessage(globalMessages.dataTypesPlaceholder, { dataType })}
            autosize={{ minRows: 1, maxRows: 10 }}
            //maxLength={defaultValueError?.showError && 255} might be needed to show the char count
          />
          {defaultValueError?.showError && (
            <CapLabel className="error-label">{defaultValueError?.errorMessage}</CapLabel>
          )}
        </CapRow>
      )}
      {dataType === CUSTOM_FIELD_DATA_TYPES.INTEGER && (
        <CapInput
          data-testid="default-value-integer-input"
          className={`${customFieldsSettingsCreatePrefix}`}
          placeholder={formatMessage(globalMessages.dataTypesPlaceholder, { dataType })}
          value={defaultValue}
          onChange={handleNumberChange}
        />
      )}
      {dataType === CUSTOM_FIELD_DATA_TYPES.BOOLEAN && (
        <CapRow type="flex" align="middle" justify="space-between">
          <CapRadioGroup
            value={defaultValue}
            onChange={handleBooleanChange}
            options={[
              { label: formatMessage(globalMessages.true), value: true },
              { label: formatMessage(globalMessages.false), value: false },
            ]}
          />
          <CapRow disabled={isResetDisabled}>
            <CapTooltip title={!isResetDisabled && formatMessage(globalMessages.reset)}>
              <CapIcon
                type="sync"
                className={classNames('reset-icon', { 'disabled-icon': isResetDisabled })}
                size="m"
                onClick={handleReset}
                disabled={isResetDisabled}
              />
            </CapTooltip>
          </CapRow>
        </CapRow>
      )}
      {dataType === CUSTOM_FIELD_DATA_TYPES.ENUM && (
        <CapRow type="flex" align="middle" justify="space-between">
          <CapSelect
            data-testid="default-value-enum-select"
            className={`${customFieldsSettingsCreatePrefix}-default-value-enum`}
            placeholder={formatMessage(globalMessages.dataTypesPlaceholder, { dataType })}
            showArrow
            options={enumOptions}
            value={defaultValue}
            onChange={handleEnumChange}
          />
          <CapRow disabled={isResetDisabled}>
            <CapTooltip title={!isResetDisabled && formatMessage(globalMessages.reset)}>
              <CapIcon
                type="sync"
                className={classNames('reset-icon', { 'disabled-icon': isResetDisabled })}
                size="m"
                onClick={handleReset}
                disabled={isResetDisabled}
              />
            </CapTooltip>
          </CapRow>
        </CapRow>
      )}
      {dataType === CUSTOM_FIELD_DATA_TYPES.DATE && (
        <CapRow type="flex" align="middle" justify="space-between">
          <CapRow type="flex" align="middle">
            <CapDatePicker
              className={`${customFieldsSettingsCreatePrefix}-default-value-date-picker`}
              format={DEFAULT_DATE_FORMAT}
              value={defaultValue && moment(defaultValue)}
              onChange={handleDateTimeChange}
            />
            <CapTimePicker
              className={`${customFieldsSettingsCreatePrefix}-default-value-time-picker`}
              allowClear={false}
              format={DEFAULT_TIME_FORMAT}
              value={defaultValue && moment(defaultValue)}
              onChange={handleDateTimeChange}
              use12Hours
            />
          </CapRow>
          <CapRow disabled={isResetDisabled}>
            <CapTooltip title={!isResetDisabled && formatMessage(globalMessages.reset)}>
              <CapIcon
                type="sync"
                className={classNames('reset-icon', { 'disabled-icon': isResetDisabled })}
                size="m"
                onClick={handleReset}
                disabled={isResetDisabled}
              />
            </CapTooltip>
          </CapRow>
        </CapRow>
      )}
    </CapRow>
  );
};

CreateEditCustomFieldDefaultValue.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  mode: PropTypes.string,
  customFieldMeta: PropTypes.object,
  enumOptions: PropTypes.array,
};

CreateEditCustomFieldDefaultValue.defaultProps = {
  actions: {},
  mode: CustomFieldsSettingsMode.CREATE,
  customFieldMeta: {},
  enumOptions: [],
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectCustomFieldsSettingsMode(),
  customFieldMeta: makeSelectCustomFieldMeta(),
  enumOptions: makeSelectEnumOptions(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setDefaultValue,
        setDefaultValueError,
      },
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(CreateEditCustomFieldDefaultValue));
