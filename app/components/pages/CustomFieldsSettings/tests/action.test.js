import * as actions from '../action';
import * as constants from '../constant';

describe('CustomFieldsSettings actions', () => {
  it('should create an action to get all custom fields', () => {
    const expectedAction = {
      type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST,
    };
    expect(actions.getAllCustomFields()).toEqual(expectedAction);
  });

  it('should create an action to create custom field', () => {
    const expectedAction = {
      type: constants.CREATE_CUSTOM_FIELD_REQUEST,
    };
    expect(actions.createCustomField()).toEqual(expectedAction);
  });

  it('should create an action to update custom field', () => {
    const expectedAction = {
      type: constants.UPDATE_CUSTOM_FIELD_REQUEST,
    };
    expect(actions.updateCustomField()).toEqual(expectedAction);
  });

  it('should create an action to clear data', () => {
    const expectedAction = {
      type: constants.CLEAR_DATA,
    };
    expect(actions.clearData()).toEqual(expectedAction);
  });

  it('should create an action to set mode', () => {
    const mode = 'edit';
    const expectedAction = {
      type: constants.SET_MODE,
      payload: mode,
    };
    expect(actions.setMode(mode)).toEqual(expectedAction);
  });

  it('should create an action to apply filters', () => {
    const filters = { status: 'active' };
    const expectedAction = {
      type: constants.APPLY_FILTERS,
      payload: filters,
    };
    expect(actions.applyFilters(filters)).toEqual(expectedAction);
  });

  it('should create an action to sort list', () => {
    const sort = { field: 'name', order: 'asc' };
    const expectedAction = {
      type: constants.SORT_LIST,
      payload: sort,
    };
    expect(actions.sortList(sort)).toEqual(expectedAction);
  });

  it('should create an action to set name', () => {
    const name = 'Test Field';
    const expectedAction = {
      type: constants.SET_NAME,
      payload: name,
    };
    expect(actions.setName(name)).toEqual(expectedAction);
  });

  it('should create an action to set scope', () => {
    const scope = 'global';
    const expectedAction = {
      type: constants.SET_SCOPE,
      payload: scope,
    };
    expect(actions.setScope(scope)).toEqual(expectedAction);
  });

  it('should create an action to set data type', () => {
    const dataType = 'string';
    const expectedAction = {
      type: constants.SET_DATA_TYPE,
      payload: dataType,
    };
    expect(actions.setDataType(dataType)).toEqual(expectedAction);
  });

  it('should create an action to set is mandatory', () => {
    const isMandatory = true;
    const expectedAction = {
      type: constants.SET_IS_MANDATORY,
      payload: isMandatory,
    };
    expect(actions.setIsMandatory(isMandatory)).toEqual(expectedAction);
  });

  it('should create an action to set default value', () => {
    const defaultValue = 'default';
    const expectedAction = {
      type: constants.SET_DEFAULT_VALUE,
      payload: defaultValue,
    };
    expect(actions.setDefaultValue(defaultValue)).toEqual(expectedAction);
  });

  it('should create an action to add enum value', () => {
    const enumValue = 'option1';
    const expectedAction = {
      type: constants.ADD_ENUM_VALUE,
      payload: enumValue,
    };
    expect(actions.addEnumValue(enumValue)).toEqual(expectedAction);
  });

  it('should create an action to remove enum value', () => {
    const enumValue = 'option1';
    const expectedAction = {
      type: constants.REMOVE_ENUM_VALUE,
      payload: enumValue,
    };
    expect(actions.removeEnumValue(enumValue)).toEqual(expectedAction);
  });

  it('should create an action to set custom field id', () => {
    const id = '123';
    const expectedAction = {
      type: constants.SET_CUSTOM_FIELD_ID,
      payload: id,
    };
    expect(actions.setCustomFieldId(id)).toEqual(expectedAction);
  });

  it('should create an action to set duplicate name error', () => {
    const error = 'Name already exists';
    const expectedAction = {
      type: constants.DUPLICATE_NAME_ERROR,
      payload: error,
    };
    expect(actions.setDuplicateNameError(error)).toEqual(expectedAction);
  });

  it('should create an action to set enum value error', () => {
    const error = 'Invalid enum value';
    const expectedAction = {
      type: constants.SET_ENUM_VALUE_ERROR,
      payload: error,
    };
    expect(actions.setEnumValueError(error)).toEqual(expectedAction);
  });

  it('should create an action to set default value error', () => {
    const error = 'Invalid default value';
    const expectedAction = {
      type: constants.SET_DEFAULT_VALUE_ERROR,
      payload: error,
    };
    expect(actions.setDefaultValueError(error)).toEqual(expectedAction);
  });
});
