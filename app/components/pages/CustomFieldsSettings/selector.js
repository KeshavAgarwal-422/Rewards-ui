import { fromJS } from 'immutable';
import { createSelector } from 'reselect';

import { customFieldSettingsReduxKey } from './constant';
import { REQUEST } from '../App/constants';

const selectCustomFieldsSettings = (state = fromJS({})) =>
  state.get(customFieldSettingsReduxKey, fromJS({}));

const makeSelectCustomFieldsSettingsMode = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const mode = subState.toJS().mode;
    return mode;
  });

const makeSelectGetAllCustomFields = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const allCustomFields = subState.toJS().allCustomFields;
    const getAllCustomFieldsStatus = subState.toJS().getAllCustomFieldsStatus;
    const filteredCustomFields = subState.toJS().filteredCustomFields;

    return {
      allCustomFields,
      getAllCustomFieldsStatus,
      filteredCustomFields,
    };
  });

const makeSelectCustomFieldMeta = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const name = subState.toJS().name;
    const scope = subState.toJS().scope;
    const dataType = subState.toJS().dataType;
    const defaultValue = subState.toJS().defaultValue;
    const isMandatory = subState.toJS().isMandatory;
    const enumValues = subState.toJS().enumValues;
    const duplicateNameError = subState.toJS().duplicateNameError;
    const enumValueError = subState.toJS().enumValueError;
    const defaultValueError = subState.toJS().defaultValueError;

    return {
      name,
      scope,
      dataType,
      defaultValue,
      isMandatory,
      enumValues,
      duplicateNameError,
      enumValueError,
      defaultValueError,
    };
  });

const makeSelectSelectedCustomFieldMeta = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const filteredCustomFields = subState.toJS().filteredCustomFields;
    const customFieldId = subState.toJS().customFieldId;
    const selectedCustomField = filteredCustomFields?.find(({ id }) => id === customFieldId);
    return {
      ...selectedCustomField,
    };
  });

const makeSelectEnumOptions = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const enumValues = subState.toJS().enumValues;
    const enumOptions = enumValues?.map((enumValue) => ({
      key: enumValue?.id,
      label: enumValue?.tag,
      value: enumValue?.tag,
    }));
    return enumOptions;
  });

const makeSelectApplySorting = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const applySorting = subState.toJS().applySorting;
    return applySorting;
  });

const makeSelectIsCustomFieldModified = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const isCustomFieldModified = subState.toJS().isCustomFieldModified;
    return isCustomFieldModified;
  });

const makeSelectIsProcessingRequest = () =>
  createSelector(selectCustomFieldsSettings, (subState = fromJS({})) => {
    const createCustomFieldStatus = subState.toJS().createCustomFieldStatus;
    const updateCustomFieldStatus = subState.toJS().updateCustomFieldStatus;
    return [createCustomFieldStatus, updateCustomFieldStatus].includes(REQUEST);
  });

export {
  selectCustomFieldsSettings,
  makeSelectCustomFieldsSettingsMode,
  makeSelectGetAllCustomFields,
  makeSelectCustomFieldMeta,
  makeSelectSelectedCustomFieldMeta,
  makeSelectEnumOptions,
  makeSelectApplySorting,
  makeSelectIsCustomFieldModified,
  makeSelectIsProcessingRequest,
};
