import * as constants from './constant';

export const getAllCustomFields = () => ({
  type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST,
});

export const createCustomField = () => ({
  type: constants.CREATE_CUSTOM_FIELD_REQUEST,
});

export const updateCustomField = () => ({
  type: constants.UPDATE_CUSTOM_FIELD_REQUEST,
});

export const clearData = () => ({
  type: constants.CLEAR_DATA,
});

export const clearAllData = () => ({
  type: constants.CLEAR_ALL_DATA,
});

export const setMode = (mode) => ({
  type: constants.SET_MODE,
  payload: mode,
});

export const applyFilters = (filters) => ({
  type: constants.APPLY_FILTERS,
  payload: filters,
});

export const sortList = (sort) => ({
  type: constants.SORT_LIST,
  payload: sort,
});

export const setName = (name) => ({
  type: constants.SET_NAME,
  payload: name,
});

export const setScope = (scope) => ({
  type: constants.SET_SCOPE,
  payload: scope,
});

export const setDataType = (dataType) => ({
  type: constants.SET_DATA_TYPE,
  payload: dataType,
});

export const setIsMandatory = (isMandatory) => ({
  type: constants.SET_IS_MANDATORY,
  payload: isMandatory,
});

export const setDefaultValue = (defaultValue) => ({
  type: constants.SET_DEFAULT_VALUE,
  payload: defaultValue,
});

export const addEnumValue = (enumValue) => ({
  type: constants.ADD_ENUM_VALUE,
  payload: enumValue,
});

export const removeEnumValue = (enumValue) => ({
  type: constants.REMOVE_ENUM_VALUE,
  payload: enumValue,
});

export const setCustomFieldId = (id) => ({
  type: constants.SET_CUSTOM_FIELD_ID,
  payload: id,
});

export const setDuplicateNameError = (error) => ({
  type: constants.DUPLICATE_NAME_ERROR,
  payload: error,
});

export const setEnumValueError = (error) => ({
  type: constants.SET_ENUM_VALUE_ERROR,
  payload: error,
});

export const setDefaultValueError = (error) => ({
  type: constants.SET_DEFAULT_VALUE_ERROR,
  payload: error,
});
