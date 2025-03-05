import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

import CapSelect from '@capillarytech/cap-ui-library/CapSelect';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapSwitch from '@capillarytech/cap-ui-library/CapSwitch';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapTagDropdown from '@capillarytech/cap-ui-library/CapTagDropdown';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapInfoNote from '@capillarytech/cap-ui-library/CapInfoNote';

import { generateUniqueId } from 'utils/commonUtils';

import CreateEditCustomFieldDefaultValue from './CreateEditCustomFieldDefaultValue';
import SettingsConfirmationModal from '../../molecules/SettingsConfirmationModal';

import messages from './messages';
import globalMessages from '../Cap/messages';
import * as actions from './action';
import { customFieldsSettingsCreatePrefix, CustomFieldsSettingsMode } from './constant';
import { makeSelectCustomFieldMeta, makeSelectCustomFieldsSettingsMode } from './selector';
import { getDataTypeSelectionOptions, getScopeFilterOptions } from './helpers';
import { CUSTOM_FIELD_DATA_TYPES } from '../App/constants';

// eslint-disable-next-line no-useless-escape -- This regex is used to validate the enum values
const allowedEnumPattern = /^[a-zA-Z0-9 \-\_\[\]\(\)]*$/; // Allows letters, numbers, space, -, _, [], ()

export const ACTION_MAPPER = {
  NAME: 'setName',
  SCOPE: 'setScope',
  DATA_TYPE: 'setDataType',
  IS_MANDATORY: 'setIsMandatory',
  DEFAULT_VALUE: 'setDefaultValue',
  ADD_ENUM_VALUE: 'addEnumValue',
  REMOVE_ENUM_VALUE: 'removeEnumValue',
  DUPLICATE_NAME_ERROR: 'setDuplicateNameError',
  ENUM_VALUE_ERROR: 'setEnumValueError',
};

export const CreateEditCustomFieldContent = ({
  intl: { formatMessage },
  actions,
  mode,
  customFieldMeta: {
    name,
    scope,
    dataType,
    isMandatory,
    enumValues,
    duplicateNameError,
    enumValueError,
  },
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [enumValue, setEnumValue] = useState('');
  const [enumIdToBeRemoved, setEnumIdToBeRemoved] = useState('');
  const [initialMandatoryValue] = useState(() => isMandatory);
  const [showInfoNote, setShowInfoNote] = useState(false);

  useEffect(() => {
    if (mode === CustomFieldsSettingsMode.EDIT && initialMandatoryValue && !isMandatory) {
      setShowInfoNote(true);
    } else {
      setShowInfoNote(false);
    }
  }, [isMandatory]);

  const isDataTypeDefined = !!dataType;

  const handleChange = (identifier, value) => {
    if (identifier in actions) {
      actions[identifier](value);
    }
  };

  const handleNameChange = (e) => {
    const inputValue = e.target.value;
    handleChange(ACTION_MAPPER.NAME, inputValue);

    if (duplicateNameError?.showError) {
      handleChange(ACTION_MAPPER.DUPLICATE_NAME_ERROR, {
        showError: false,
        errorMessage: '',
      });
    }
  };

  const handleEnumValueChange = (e) => {
    const inputValue = e.target.value;

    if (!allowedEnumPattern.test(inputValue)) return;

    setEnumValue(inputValue);
    const isLengthError = inputValue.length > 80;

    // Dispatch only if error state changes
    if (isLengthError !== enumValueError?.showError) {
      handleChange(ACTION_MAPPER.ENUM_VALUE_ERROR, {
        showError: isLengthError,
        errorMessage: isLengthError ? formatMessage(messages.enumValueLengthError) : '',
      });
    }
  };

  const handleEnumValueKeyDown = (e) => {
    if (e.key !== 'Enter') return;

    const isEnumValuePresent = enumValues?.some((curEnumValue) => curEnumValue?.tag === enumValue);
    const isLengthError = enumValues?.length > 30;

    if (!isEnumValuePresent && !isLengthError) {
      handleChange(ACTION_MAPPER.ADD_ENUM_VALUE, { id: generateUniqueId(), tag: enumValue });
      setEnumValue('');
    }

    if (isLengthError !== enumValueError?.showError) {
      handleChange(ACTION_MAPPER.ENUM_VALUE_ERROR, {
        showError: isLengthError,
        errorMessage: isLengthError ? formatMessage(messages.enumValuesLengthError) : '',
      });
    }
  };

  const handleEnumValueRemoveClick = (enumId) => {
    setEnumIdToBeRemoved(enumId);
    setIsModalVisible(true);
  };

  const handleEnumValueRemove = () => {
    handleChange(ACTION_MAPPER.REMOVE_ENUM_VALUE, enumIdToBeRemoved);
    setEnumIdToBeRemoved('');
    setIsModalVisible(false);
  };

  const handleEnumRemoveCancellation = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      {isModalVisible && (
        <SettingsConfirmationModal
          isModalVisible={isModalVisible}
          handleConfirmation={handleEnumValueRemove}
          handleCancellation={handleEnumRemoveCancellation}
          okText={formatMessage(globalMessages.yesDelete)}
          closeText={formatMessage(globalMessages.cancel)}
          title={formatMessage(messages.deletePreDefinedValues)}
          description={formatMessage(messages.deletePreDefinedValuesDesc, {
            enumValue: enumValues?.find((curEnumValue) => curEnumValue?.id === enumIdToBeRemoved)
              ?.tag,
          })}
        />
      )}
      <CapRow className={`${customFieldsSettingsCreatePrefix}-content`}>
        <CapRow>
          <CapHeading type="h4">{formatMessage(globalMessages.name)}</CapHeading>
          <CapInput
            data-testid="custom-field-name-input"
            className={classNames(`${customFieldsSettingsCreatePrefix}-name-input`, {
              'input-error': duplicateNameError?.showError,
            })}
            placeholder={formatMessage(globalMessages.enterName)}
            value={name}
            onChange={handleNameChange}
            errorMessage={duplicateNameError?.showError && duplicateNameError?.errorMessage}
          />
        </CapRow>
        <CapRow>
          <CapHeading type="h4">{formatMessage(globalMessages.scope)}</CapHeading>
          <CapLabel className={`${customFieldsSettingsCreatePrefix}-scope-label`}>
            {formatMessage(messages.scopeDescription)}
          </CapLabel>
          <CapSelect
            data-testid="custom-field-scope-select"
            className={`${customFieldsSettingsCreatePrefix}-scope-select`}
            placeholder={formatMessage(messages.selectScope)}
            showArrow
            options={getScopeFilterOptions(true)}
            value={scope}
            onChange={(value) => handleChange(ACTION_MAPPER.SCOPE, value)}
          />
        </CapRow>
        <CapRow>
          <CapHeading type="h4">{formatMessage(globalMessages.dataType)}</CapHeading>
          <CapSelect
            data-testid="custom-field-data-type-select"
            className={`${customFieldsSettingsCreatePrefix}-data-type-select`}
            placeholder={formatMessage(messages.selectDataType)}
            showArrow
            options={getDataTypeSelectionOptions(formatMessage)}
            value={dataType}
            onChange={(value) => handleChange(ACTION_MAPPER.DATA_TYPE, value)}
          />
        </CapRow>
        {dataType === CUSTOM_FIELD_DATA_TYPES.ENUM && (
          <CapRow>
            <CapRow type="flex" align="middle">
              <CapLabel type="label15">{formatMessage(globalMessages.preDefinedValues)}</CapLabel>
              <CapLabel type="label15" className="optional-label">
                {formatMessage(globalMessages.optional)}
              </CapLabel>
            </CapRow>
            <CapTagDropdown
              data-testid="custom-field-enum-values-tag-dropdown"
              className={`${customFieldsSettingsCreatePrefix}-enum-values-tag-dropdown`}
              content={enumValue}
              list={enumValues?.filter(
                (curEnumValue) => !enumValue || curEnumValue?.tag?.includes(enumValue),
              )}
              handleRemoveTagCallback={handleEnumValueRemoveClick}
              handleKeyDownCallback={handleEnumValueKeyDown}
              inputProps={{
                dataTestId: 'custom-field-enum-values-tag-input',
                onChange: handleEnumValueChange,
                suffix: <CapIcon type="enter" />,
                errorMessage: enumValueError?.showError && enumValueError?.errorMessage,
              }}
              dropdownProps={{
                trigger: ['click'],
              }}
            />
          </CapRow>
        )}
        <CapRow
          type="flex"
          align="middle"
          justify="space-between"
          className={`${customFieldsSettingsCreatePrefix}-is-mandatory-row`}
        >
          <CapHeading type="h4">{formatMessage(messages.isCustomFieldMandatory)}</CapHeading>
          <CapSwitch
            data-testid="custom-field-is-mandatory-switch"
            checked={isMandatory}
            onClick={(value) => handleChange(ACTION_MAPPER.IS_MANDATORY, value)}
            disabled={!isDataTypeDefined}
          />
        </CapRow>
        {isDataTypeDefined && (
          <CapRow>
            <CapRow type="flex" align="middle">
              <CapLabel type="label15">{formatMessage(globalMessages.defaultValue)}</CapLabel>
              {!isMandatory && dataType !== CUSTOM_FIELD_DATA_TYPES.ENUM && (
                <CapLabel type="label15" className="optional-label">
                  {formatMessage(globalMessages.optional)}
                </CapLabel>
              )}
            </CapRow>
            <CapLabel className={`${customFieldsSettingsCreatePrefix}-default-value-label`}>
              {formatMessage(messages.defaultValueDescription)}
            </CapLabel>
            <CreateEditCustomFieldDefaultValue />
          </CapRow>
        )}
        {showInfoNote && (
          <CapInfoNote
            className={`${customFieldsSettingsCreatePrefix}-mandatory-toggle-off-info-note`}
            noteText={formatMessage(messages.mandatoryToggleOffInfoNote)}
          />
        )}
      </CapRow>
    </>
  );
};

CreateEditCustomFieldContent.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  mode: PropTypes.string,
  customFieldMeta: PropTypes.object,
};

CreateEditCustomFieldContent.defaultProps = {
  actions: {},
  mode: '',
  customFieldMeta: {},
};

const mapStateToProps = createStructuredSelector({
  customFieldMeta: makeSelectCustomFieldMeta(),
  mode: makeSelectCustomFieldsSettingsMode(),
});

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(CreateEditCustomFieldContent));
