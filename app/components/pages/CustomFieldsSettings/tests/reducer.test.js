import customFieldsSettingsReducer, { initialState } from '../reducer';
import * as constants from '../constant';
import * as globalConstants from '../../../pages/App/constants';

describe('customFieldsSettingsReducer', () => {
  it('should return initial state', () => {
    expect(customFieldsSettingsReducer(undefined, {})).toEqual(initialState);
  });

  describe('SET_MODE', () => {
    it('should handle SET_MODE for LISTING', () => {
      const action = {
        type: constants.SET_MODE,
        payload: constants.CustomFieldsSettingsMode.LISTING,
      };
      const expectedState = initialState.set('mode', constants.CustomFieldsSettingsMode.LISTING);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_MODE for EDIT with existing custom field', () => {
      const state = initialState.merge({
        customFieldId: '123',
        allCustomFields: [
          {
            id: '123',
            name: 'Test Field',
            scope: 'REWARD',
            dataType: 'STRING',
            isMandatory: true,
            defaultValue: 'default',
            enumValues: ['value1', 'value2'],
          },
        ],
      });

      const action = {
        type: constants.SET_MODE,
        payload: constants.CustomFieldsSettingsMode.EDIT,
      };

      const newState = customFieldsSettingsReducer(state, action);
      expect(newState.get('mode')).toEqual(constants.CustomFieldsSettingsMode.EDIT);
      expect(newState.get('name')).toEqual('Test Field');
    });
  });

  describe('GET_ALL_CUSTOM_FIELDS actions', () => {
    it('should handle GET_ALL_CUSTOM_FIELDS_REQUEST', () => {
      const action = { type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST };
      const expectedState = initialState.set('getAllCustomFieldsStatus', globalConstants.REQUEST);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ALL_CUSTOM_FIELDS_SUCCESS', () => {
      const payload = [{ id: '1', name: 'Field 1' }];
      const action = {
        type: constants.GET_ALL_CUSTOM_FIELDS_SUCCESS,
        payload,
      };
      const expectedState = initialState.merge({
        getAllCustomFieldsStatus: globalConstants.SUCCESS,
        allCustomFields: payload,
        filteredCustomFields: payload,
      });
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle GET_ALL_CUSTOM_FIELDS_FAILURE', () => {
      const action = { type: constants.GET_ALL_CUSTOM_FIELDS_FAILURE };
      const expectedState = initialState.set('getAllCustomFieldsStatus', globalConstants.FAILURE);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('Field update actions', () => {
    it('should handle SET_NAME', () => {
      const action = {
        type: constants.SET_NAME,
        payload: 'New Field Name',
      };
      const expectedState = initialState
        .set('name', 'New Field Name')
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_SCOPE', () => {
      const action = {
        type: constants.SET_SCOPE,
        payload: 'USER',
      };
      const expectedState = initialState.set('scope', 'USER').set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_DATA_TYPE', () => {
      const action = {
        type: constants.SET_DATA_TYPE,
        payload: 'NUMBER',
      };
      const expectedState = initialState
        .set('dataType', 'NUMBER')
        .set('defaultValue', undefined)
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('ENUM_VALUE actions', () => {
    it('should handle ADD_ENUM_VALUE', () => {
      const newValue = { id: '1', tag: 'New Option' };
      const action = {
        type: constants.ADD_ENUM_VALUE,
        payload: newValue,
      };
      const expectedState = initialState
        .set('enumValues', [newValue])
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle REMOVE_ENUM_VALUE', () => {
      const state = initialState.set('enumValues', [
        { id: '1', tag: 'Option 1' },
        { id: '2', tag: 'Option 2' },
      ]);
      const action = {
        type: constants.REMOVE_ENUM_VALUE,
        payload: '1',
      };
      const expectedState = state
        .set('enumValues', [{ id: '2', tag: 'Option 2' }])
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(state, action)).toEqual(expectedState);
    });
  });

  describe('Error handling actions', () => {
    it('should handle DUPLICATE_NAME_ERROR', () => {
      const error = { showError: true, errorMessage: 'Name already exists' };
      const action = {
        type: constants.DUPLICATE_NAME_ERROR,
        payload: error,
      };
      const expectedState = initialState.set('duplicateNameError', error);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_ENUM_VALUE_ERROR', () => {
      const error = { showError: true, errorMessage: 'Invalid enum value' };
      const action = {
        type: constants.SET_ENUM_VALUE_ERROR,
        payload: error,
      };
      const expectedState = initialState.set('enumValueError', error);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('Additional field actions', () => {
    it('should handle SET_IS_MANDATORY', () => {
      const action = {
        type: constants.SET_IS_MANDATORY,
        payload: true,
      };
      const expectedState = initialState
        .set('isMandatory', true)
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_DEFAULT_VALUE', () => {
      const action = {
        type: constants.SET_DEFAULT_VALUE,
        payload: 'default text',
      };
      const expectedState = initialState
        .set('defaultValue', 'default text')
        .set('isCustomFieldModified', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });

    it('should handle SET_CUSTOM_FIELD_ID', () => {
      const action = {
        type: constants.SET_CUSTOM_FIELD_ID,
        payload: '123',
      };
      const expectedState = initialState.set('customFieldId', '123');
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('Additional error handling', () => {
    it('should handle SET_DEFAULT_VALUE_ERROR', () => {
      const error = {
        showError: true,
        errorMessage: 'Invalid default value',
      };
      const action = {
        type: constants.SET_DEFAULT_VALUE_ERROR,
        payload: error,
      };
      const expectedState = initialState.set('defaultValueError', error);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });

  describe('API status actions', () => {
    it('should handle CREATE_CUSTOM_FIELD_REQUEST/SUCCESS/FAILURE', () => {
      const requestAction = { type: constants.CREATE_CUSTOM_FIELD_REQUEST };
      const successAction = { type: constants.CREATE_CUSTOM_FIELD_SUCCESS };
      const failureAction = { type: constants.CREATE_CUSTOM_FIELD_FAILURE };

      expect(
        customFieldsSettingsReducer(initialState, requestAction).get('createCustomFieldStatus'),
      ).toEqual(globalConstants.REQUEST);
      expect(
        customFieldsSettingsReducer(initialState, successAction).get('createCustomFieldStatus'),
      ).toEqual(globalConstants.SUCCESS);
      expect(
        customFieldsSettingsReducer(initialState, failureAction).get('createCustomFieldStatus'),
      ).toEqual(globalConstants.FAILURE);
    });

    it('should handle UPDATE_CUSTOM_FIELD_REQUEST/SUCCESS/FAILURE', () => {
      const requestAction = { type: constants.UPDATE_CUSTOM_FIELD_REQUEST };
      const successAction = { type: constants.UPDATE_CUSTOM_FIELD_SUCCESS };
      const failureAction = { type: constants.UPDATE_CUSTOM_FIELD_FAILURE };

      expect(
        customFieldsSettingsReducer(initialState, requestAction).get('updateCustomFieldStatus'),
      ).toEqual(globalConstants.REQUEST);
      expect(
        customFieldsSettingsReducer(initialState, successAction).get('updateCustomFieldStatus'),
      ).toEqual(globalConstants.SUCCESS);
      expect(
        customFieldsSettingsReducer(initialState, failureAction).get('updateCustomFieldStatus'),
      ).toEqual(globalConstants.FAILURE);
    });
  });

  it('should handle CLEAR_DATA', () => {
    const modifiedState = initialState.merge({
      mode: constants.CustomFieldsSettingsMode.EDIT,
      name: 'Test Field',
      dataType: 'STRING',
      isCustomFieldModified: true,
    });

    const action = { type: constants.CLEAR_DATA };
    const expectedState = initialState.merge({
      mode: constants.CustomFieldsSettingsMode.LISTING,
      name: undefined,
      scope: globalConstants.SCOPE.REWARD,
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
    expect(customFieldsSettingsReducer(modifiedState, action)).toEqual(expectedState);
  });

  describe('Filter and sorting actions', () => {
    it('should handle APPLY_FILTERS', () => {
      const state = initialState.set('allCustomFields', [
        { id: '1', name: 'Field 1', scope: 'USER' },
        { id: '2', name: 'Field 2', scope: 'REWARD' },
      ]);

      const filters = { scope: 'USER' };
      const action = {
        type: constants.APPLY_FILTERS,
        payload: filters,
      };

      const newState = customFieldsSettingsReducer(state, action);
      expect(newState.get('filteredCustomFields')).toEqual([
        { id: '1', name: 'Field 1', scope: 'USER' },
      ]);
    });

    it('should handle SORT_LIST', () => {
      const action = {
        type: constants.SORT_LIST,
        payload: true,
      };
      const expectedState = initialState.set('applySorting', true);
      expect(customFieldsSettingsReducer(initialState, action)).toEqual(expectedState);
    });
  });
});
