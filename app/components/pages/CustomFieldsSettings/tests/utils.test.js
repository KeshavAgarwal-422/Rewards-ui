import moment from 'moment';
import {
  getFilteredCustomFields,
  getCustomFieldCompletionStatus,
  generateCustomFieldPayload,
} from '../utils';
import { CustomFieldsSettingsMode } from '../constant';
import { CUSTOM_FIELD_DATA_TYPES } from '../../App/constants';
import { mockCustomFields, mockCustomFieldMeta } from './mockData';

describe('getFilteredCustomFields', () => {
  it('should return all fields when no filters are provided', () => {
    const result = getFilteredCustomFields(mockCustomFields);
    expect(result).toHaveLength(2);
  });

  it('should filter by scope', () => {
    const result = getFilteredCustomFields(mockCustomFields, { scope: 'global' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Field 1');
  });

  it('should filter by search term', () => {
    const result = getFilteredCustomFields(mockCustomFields, { search: 'field 2' });
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Field 2');
  });

  it('should sort by lastUpdatedOn when sort is true', () => {
    const result = getFilteredCustomFields(mockCustomFields, { sort: true });
    expect(result[0].name).toBe('Field 1');
    expect(result[1].name).toBe('Field 2');
  });

  it('should handle null input', () => {
    const result = getFilteredCustomFields(null);
    expect(result).toEqual([]);
  });
});

describe('getCustomFieldCompletionStatus', () => {
  it('should return true for valid CREATE mode', () => {
    const result = getCustomFieldCompletionStatus(
      CustomFieldsSettingsMode.CREATE,
      mockCustomFieldMeta,
      false,
      false,
    );
    expect(result).toBe(true);
  });

  it('should return false when processing request', () => {
    const result = getCustomFieldCompletionStatus(
      CustomFieldsSettingsMode.CREATE,
      mockCustomFieldMeta,
      false,
      true,
    );
    expect(result).toBe(false);
  });

  it('should return false when has errors', () => {
    const metaWithError = {
      ...mockCustomFieldMeta,
      duplicateNameError: { showError: true },
    };
    const result = getCustomFieldCompletionStatus(
      CustomFieldsSettingsMode.CREATE,
      metaWithError,
      false,
      false,
    );
    expect(result).toBe(false);
  });

  it('should require defaultValue for mandatory fields', () => {
    const mandatoryMeta = {
      ...mockCustomFieldMeta,
      isMandatory: true,
      defaultValue: '',
    };
    const result = getCustomFieldCompletionStatus(
      CustomFieldsSettingsMode.CREATE,
      mandatoryMeta,
      false,
      false,
    );
    expect(result).toBe(false);
  });

  it('should require modification for EDIT mode', () => {
    const result = getCustomFieldCompletionStatus(
      CustomFieldsSettingsMode.EDIT,
      mockCustomFieldMeta,
      false,
      false,
    );
    expect(result).toBe(false);
  });
});

describe('generateCustomFieldPayload', () => {
  it('should generate basic payload', () => {
    const input = {
      mode: CustomFieldsSettingsMode.CREATE,
      name: 'Test Field',
      scope: 'global',
      dataType: 'STRING',
      isMandatory: false,
      defaultValue: 'test',
    };
    const result = generateCustomFieldPayload(input);
    expect(result).toEqual({
      name: 'Test Field',
      description: 'Description for Test Field',
      scope: 'global',
      dataType: 'STRING',
      isMandatory: false,
      defaultValue: 'test',
      isActive: true,
    });
  });

  it('should include enumValues for ENUM type', () => {
    const input = {
      mode: CustomFieldsSettingsMode.CREATE,
      name: 'Enum Field',
      scope: 'global',
      dataType: CUSTOM_FIELD_DATA_TYPES.ENUM,
      isMandatory: false,
      defaultValue: 'option1',
      enumValues: [{ tag: 'option1' }, { tag: 'option2' }],
    };
    const result = generateCustomFieldPayload(input);
    expect(result.enumValues).toEqual(['option1', 'option2']);
  });

  it('should set isActive false for DELETE mode', () => {
    const input = {
      mode: CustomFieldsSettingsMode.DELETE,
      name: 'Test Field',
      scope: 'global',
      dataType: 'STRING',
      isMandatory: false,
      defaultValue: 'test',
    };
    const result = generateCustomFieldPayload(input);
    expect(result.isActive).toBe(false);
  });
});
