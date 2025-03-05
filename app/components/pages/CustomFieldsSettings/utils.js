import moment from 'moment';
import isEmpty from 'lodash/isEmpty';
import { CustomFieldsSettingsMode } from './constant';
import { CUSTOM_FIELD_DATA_TYPES } from '../App/constants';

export const getFilteredCustomFields = (allCustomFields = [], filters = {}) => {
  if (!allCustomFields) return [];

  return allCustomFields
    .filter((customField) => {
      const { scope, search } = filters;
      const matchesScope = scope ? customField?.scope === scope : true;
      const matchesSearch = search
        ? customField?.name?.toLowerCase()?.includes(search.toLowerCase())
        : true;
      return matchesScope && matchesSearch;
    })
    .sort((a, b) =>
      filters?.sort ? moment(b?.lastUpdatedOn).valueOf() - moment(a?.lastUpdatedOn).valueOf() : 0,
    );
};

const checkFieldHasErrors = (customFieldMeta) => {
  const { duplicateNameError, enumValueError, defaultValueError } = customFieldMeta;
  return duplicateNameError?.showError || enumValueError?.showError || defaultValueError?.showError;
};

const checkBaseValidity = (customFieldMeta) => {
  const { name, scope, dataType, isMandatory, defaultValue, enumValues } = customFieldMeta;
  const isDataTypeEnum = dataType === CUSTOM_FIELD_DATA_TYPES.ENUM;

  return !!(
    name &&
    scope &&
    dataType &&
    (!isMandatory || defaultValue) &&
    (!isDataTypeEnum || !isEmpty(enumValues))
  );
};

export const getCustomFieldCompletionStatus = (
  mode,
  customFieldMeta,
  isCustomFieldModified,
  isProcessingRequest,
) => {
  const isBaseValid = checkBaseValidity(customFieldMeta);
  const hasErrors = checkFieldHasErrors(customFieldMeta);

  if (mode === CustomFieldsSettingsMode.EDIT) {
    return isBaseValid && isCustomFieldModified && !hasErrors && !isProcessingRequest;
  }

  return isBaseValid && !hasErrors && !isProcessingRequest;
};

export const generateCustomFieldPayload = ({
  mode,
  name,
  scope,
  dataType,
  isMandatory,
  defaultValue,
  enumValues = [],
}) => ({
  name,
  description: `Description for ${name}`, //because description is mandatory
  scope,
  dataType,
  isMandatory,
  defaultValue,
  isActive: mode !== CustomFieldsSettingsMode.DELETE,
  ...(dataType === CUSTOM_FIELD_DATA_TYPES.ENUM && {
    enumValues: enumValues.map(({ tag }) => tag),
  }),
});
