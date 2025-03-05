export const customFieldsSettingsPrefix = 'custom-fields-settings';
export const customFieldsSettingsListingPrefix = `${customFieldsSettingsPrefix}-listing`;
export const customFieldsSettingsCreatePrefix = `${customFieldsSettingsPrefix}-create`;
export const customFieldsSettingsViewPrefix = `${customFieldsSettingsPrefix}-view`;

export const customFieldSettingsReduxKey = 'customFieldsSettings';

export const CustomFieldsSettingsMode = {
  LISTING: 'LISTING',
  CREATE: 'CREATE',
  EDIT: 'EDIT',
  VIEW: 'VIEW',
  DELETE: 'DELETE',
};

export const listingFiltersKeys = {
  search: 'search',
  scope: 'scope',
  sort: 'sort',
};

export const customFieldsScope = 'app/components/organisms/CustomFieldsSettings';

export const CLEAR_DATA = `${customFieldsScope}/CLEAR_DATA`;
export const CLEAR_ALL_DATA = `${customFieldsScope}/CLEAR_ALL_DATA`;

export const SET_MODE = `${customFieldsScope}/SET_MODE`;

export const GET_ALL_CUSTOM_FIELDS_REQUEST = `${customFieldsScope}/GET_ALL_CUSTOM_FIELDS_REQUEST`;
export const GET_ALL_CUSTOM_FIELDS_SUCCESS = `${customFieldsScope}/GET_ALL_CUSTOM_FIELDS_SUCCESS`;
export const GET_ALL_CUSTOM_FIELDS_FAILURE = `${customFieldsScope}/GET_ALL_CUSTOM_FIELDS_FAILURE`;

export const CREATE_CUSTOM_FIELD_REQUEST = `${customFieldsScope}/CREATE_CUSTOM_FIELD_REQUEST`;
export const CREATE_CUSTOM_FIELD_SUCCESS = `${customFieldsScope}/CREATE_CUSTOM_FIELD_SUCCESS`;
export const CREATE_CUSTOM_FIELD_FAILURE = `${customFieldsScope}/CREATE_CUSTOM_FIELD_FAILURE`;

export const UPDATE_CUSTOM_FIELD_REQUEST = `${customFieldsScope}/UPDATE_CUSTOM_FIELD_REQUEST`;
export const UPDATE_CUSTOM_FIELD_SUCCESS = `${customFieldsScope}/UPDATE_CUSTOM_FIELD_SUCCESS`;
export const UPDATE_CUSTOM_FIELD_FAILURE = `${customFieldsScope}/UPDATE_CUSTOM_FIELD_FAILURE`;

export const APPLY_FILTERS = `${customFieldsScope}/APPLY_FILTERS`;
export const SORT_LIST = `${customFieldsScope}/SORT_LIST`;

export const SET_NAME = `${customFieldsScope}/SET_NAME`;
export const SET_SCOPE = `${customFieldsScope}/SET_SCOPE`;
export const SET_DATA_TYPE = `${customFieldsScope}/SET_DATA_TYPE`;
export const SET_IS_MANDATORY = `${customFieldsScope}/SET_IS_MANDATORY`;
export const SET_DEFAULT_VALUE = `${customFieldsScope}/SET_DEFAULT_VALUE`;
export const ADD_ENUM_VALUE = `${customFieldsScope}/ADD_ENUM_VALUE`;
export const REMOVE_ENUM_VALUE = `${customFieldsScope}/REMOVE_ENUM_VALUE`;

export const SET_CUSTOM_FIELD_ID = `${customFieldsScope}/SET_CUSTOM_FIELD_ID`;

export const DUPLICATE_NAME_ERROR = `${customFieldsScope}/DUPLICATE_NAME_ERROR`;
export const SET_ENUM_VALUE_ERROR = `${customFieldsScope}/SET_ENUM_VALUE_ERROR`;
export const SET_DEFAULT_VALUE_ERROR = `${customFieldsScope}/SET_DEFAULT_VALUE_ERROR`;
