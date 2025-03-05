export const mockCustomFields = [
  {
    name: 'Field 1',
    scope: 'global',
    lastUpdatedOn: '2024-03-20T10:00:00Z',
    dataType: 'STRING',
    isMandatory: true,
    defaultValue: 'default',
  },
  {
    name: 'Field 2',
    scope: 'team',
    lastUpdatedOn: '2024-03-19T10:00:00Z',
    dataType: 'ENUM',
    isMandatory: false,
    defaultValue: 'option1',
    enumValues: [{ tag: 'option1' }, { tag: 'option2' }],
  },
];

export const mockCustomFieldMeta = {
  name: 'Test Field',
  scope: 'global',
  dataType: 'STRING',
  isMandatory: false,
  defaultValue: 'test value',
  duplicateNameError: { showError: false },
  enumValueError: { showError: false },
  defaultValueError: { showError: false },
};
