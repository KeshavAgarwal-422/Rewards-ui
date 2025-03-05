import { fromJS } from 'immutable';

import { generateUniqueId } from 'utils/commonUtils';

import * as constants from './constant';
import { REQUEST, SUCCESS, FAILURE, SCOPE } from '../../pages/App/constants';
import { getFilteredCustomFields } from './utils';

export const initialState = fromJS({
  mode: constants.CustomFieldsSettingsMode.LISTING,

  allCustomFields: [],
  getAllCustomFieldsStatus: REQUEST,

  filteredCustomFields: [],

  applySorting: false,

  name: undefined,
  scope: SCOPE.REWARD,
  dataType: undefined,
  defaultValue: undefined,
  isMandatory: false,
  enumValues: [],

  customFieldId: '',

  isCustomFieldModified: false,

  duplicateNameError: {
    showError: false,
    errorMessage: '',
  },

  enumValueError: {
    showError: false,
    errorMessage: '',
  },

  defaultValueError: {
    showError: false,
    errorMessage: '',
  },

  createCustomFieldStatus: '',
  updateCustomFieldStatus: '',
});

const customFieldsSettingsReducer = (state = initialState, action = {}) => {
  switch (action?.type) {
    case constants.SET_MODE: {
      const { payload: mode } = action;
      let updatedState = state.set('mode', mode);

      if (
        [
          constants.CustomFieldsSettingsMode.EDIT,
          constants.CustomFieldsSettingsMode.DELETE,
        ].includes(mode)
      ) {
        const { customFieldId, allCustomFields } = state.toJS();
        const customFieldMeta = allCustomFields?.find(({ id }) => id === customFieldId);

        if (customFieldMeta) {
          updatedState = updatedState.merge({
            name: customFieldMeta.name,
            scope: customFieldMeta.scope,
            dataType: customFieldMeta.dataType,
            isMandatory: customFieldMeta.isMandatory,
            defaultValue: customFieldMeta.defaultValue,
            enumValues: customFieldMeta.enumValues?.map((value) => ({
              id: generateUniqueId(),
              tag: value,
            })),
          });
        }
      }
      return updatedState;
    }
    case constants.GET_ALL_CUSTOM_FIELDS_REQUEST:
      return state.set('getAllCustomFieldsStatus', REQUEST);
    case constants.GET_ALL_CUSTOM_FIELDS_SUCCESS: {
      const { payload } = action;
      return state.merge({
        getAllCustomFieldsStatus: SUCCESS,
        allCustomFields: payload,
        filteredCustomFields: payload,
      });
    }
    case constants.GET_ALL_CUSTOM_FIELDS_FAILURE:
      return state.set('getAllCustomFieldsStatus', FAILURE);
    case constants.APPLY_FILTERS: {
      const unFilteredCustomFields = state.toJS()?.allCustomFields;
      return state.set(
        'filteredCustomFields',
        getFilteredCustomFields(unFilteredCustomFields, action?.payload),
      );
    }
    case constants.SET_NAME:
      return state.set('name', action?.payload).set('isCustomFieldModified', true);
    case constants.SET_SCOPE:
      return state.set('scope', action?.payload).set('isCustomFieldModified', true);
    case constants.SET_DATA_TYPE:
      return state
        .set('dataType', action?.payload)
        .set('defaultValue', undefined)
        .set('isCustomFieldModified', true);
    case constants.SET_IS_MANDATORY:
      return state.set('isMandatory', action?.payload).set('isCustomFieldModified', true);
    case constants.SET_DEFAULT_VALUE:
      return state.set('defaultValue', action?.payload).set('isCustomFieldModified', true);
    case constants.ADD_ENUM_VALUE: {
      const enumValues = state.toJS()?.enumValues;
      return state
        .set('enumValues', [...enumValues, action?.payload])
        .set('isCustomFieldModified', true);
    }
    case constants.REMOVE_ENUM_VALUE: {
      const updatedEnumValues = state
        .toJS()
        .enumValues?.filter((item) => item?.id !== action?.payload);
      return state.set('enumValues', updatedEnumValues).set('isCustomFieldModified', true);
    }
    case constants.SET_CUSTOM_FIELD_ID:
      return state.set('customFieldId', action?.payload);
    case constants.SORT_LIST:
      return state.set('applySorting', action?.payload);
    case constants.DUPLICATE_NAME_ERROR:
      return state.set('duplicateNameError', action?.payload);
    case constants.SET_ENUM_VALUE_ERROR:
      return state.set('enumValueError', action?.payload);
    case constants.SET_DEFAULT_VALUE_ERROR:
      return state.set('defaultValueError', action?.payload);
    case constants.CREATE_CUSTOM_FIELD_REQUEST:
      return state.set('createCustomFieldStatus', REQUEST);
    case constants.CREATE_CUSTOM_FIELD_SUCCESS:
      return state.set('createCustomFieldStatus', SUCCESS);
    case constants.CREATE_CUSTOM_FIELD_FAILURE:
      return state.set('createCustomFieldStatus', FAILURE);
    case constants.UPDATE_CUSTOM_FIELD_REQUEST:
      return state.set('updateCustomFieldStatus', REQUEST);
    case constants.UPDATE_CUSTOM_FIELD_SUCCESS:
      return state.set('updateCustomFieldStatus', SUCCESS);
    case constants.UPDATE_CUSTOM_FIELD_FAILURE:
      return state.set('updateCustomFieldStatus', FAILURE);
    case constants.CLEAR_DATA:
      return state.merge({
        mode: constants.CustomFieldsSettingsMode.LISTING,
        name: undefined,
        scope: SCOPE.REWARD,
        dataType: undefined,
        defaultValue: undefined,
        isMandatory: false,
        enumValues: [],
        customFieldId: '',
        isCustomFieldModified: false,
        duplicateNameError: {
          showError: false,
          errorMessage: '',
        },
        enumValueError: {
          showError: false,
          errorMessage: '',
        },
        defaultValueError: {
          showError: false,
          errorMessage: '',
        },
        createCustomFieldStatus: '',
        updateCustomFieldStatus: '',
      });
    case constants.CLEAR_ALL_DATA:
      return initialState;
    default:
      return state;
  }
};

export default customFieldsSettingsReducer;
