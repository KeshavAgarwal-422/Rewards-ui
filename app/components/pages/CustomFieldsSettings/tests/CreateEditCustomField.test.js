import React from 'react';
import '@testing-library/jest-dom';
import { injectIntl } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../../utils/test-utils';

import { CreateEditCustomField, mapDispatchToProps } from '../CreateEditCustomField';
import { CustomFieldsSettingsMode } from '../constant';
import globalMessages from '../../Cap/messages';
import { mockCustomFieldMeta } from './mockData';

export const setModeMock = jest.fn();
export const setFieldNameMockFn = jest.fn();
export const setScopeMockFn = jest.fn();
export const setDataTypeMockFn = jest.fn();
export const setIsMandatoryMockFn = jest.fn();
export const setDefaultValueMockFn = jest.fn();
export const addEnumValueMockFn = jest.fn();
export const removeEnumValueMockFn = jest.fn();
export const setDuplicateNameErrorMockFn = jest.fn();
export const setEnumValueErrorMockFn = jest.fn();
export const setDefaultValueErrorMockFn = jest.fn();
export const setCustomFieldIdMock = jest.fn();
export const sortListMock = jest.fn();
export const createCustomFieldMockFn = jest.fn();
export const updateCustomFieldMockFn = jest.fn();
export const clearDataMockFn = jest.fn();

// Mock CreateEditCustomFieldContent component
jest.mock('../CreateEditCustomFieldContent', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-content">Content</div>,
}));

const initializeCreateEditCustomField = (props) => {
  const Component = injectIntl(CreateEditCustomField);
  const defaultProps = {
    actions: {
      setMode: setModeMock,
      createCustomField: createCustomFieldMockFn,
      updateCustomField: updateCustomFieldMockFn,
      clearData: clearDataMockFn,
    },
    mode: CustomFieldsSettingsMode.LISTING,
    customFieldMeta: {},
    selectedCustomFieldMeta: { name: 'Test Field' },
    isCustomFieldModified: false,
    isProcessingRequest: false,
    ...props,
  };

  return render(<Component {...defaultProps} />);
};

describe('CreateEditCustomField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render create button in LISTING mode', () => {
    initializeCreateEditCustomField();

    const createButton = screen.getByRole('button');
    userEvent.click(createButton);
    expect(setModeMock).toHaveBeenCalledWith(CustomFieldsSettingsMode.CREATE);
  });

  it('should render delete confirmation modal in DELETE mode', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.DELETE,
    });

    const deleteButton = screen.getByText(globalMessages.yesDelete.defaultMessage);
    userEvent.click(deleteButton);
    expect(updateCustomFieldMockFn).toHaveBeenCalled();
  });

  it('should handle slide box close with modifications', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.CREATE,
      isCustomFieldModified: true,
    });

    const closeButton = screen.getByText(globalMessages.cancel.defaultMessage);
    userEvent.click(closeButton);

    const discardButton = screen.getByText(globalMessages.discard.defaultMessage);
    expect(discardButton).toBeInTheDocument();
    userEvent.click(discardButton);

    expect(clearDataMockFn).toHaveBeenCalled();
  });

  it('should handle slide box close without modifications', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.CREATE,
    });

    const closeButton = screen.getByText(globalMessages.cancel.defaultMessage);
    userEvent.click(closeButton);
    expect(clearDataMockFn).toHaveBeenCalled();
  });

  it('should handle done button click in CREATE mode', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.CREATE,
      customFieldMeta: mockCustomFieldMeta,
    });

    const doneButton = screen.getByText(globalMessages.done.defaultMessage);
    userEvent.click(doneButton);
    expect(createCustomFieldMockFn).toHaveBeenCalled();
  });

  it('should handle done button click in EDIT mode', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.EDIT,
      customFieldMeta: mockCustomFieldMeta,
      isCustomFieldModified: true,
    });

    const doneButton = screen.getByText(globalMessages.done.defaultMessage);
    userEvent.click(doneButton);
    expect(updateCustomFieldMockFn).toHaveBeenCalled();
  });

  it('should handle cancel confirmation modal', () => {
    initializeCreateEditCustomField({
      mode: CustomFieldsSettingsMode.CREATE,
      isCustomFieldModified: true,
    });

    const closeButton = screen.getByText(globalMessages.cancel.defaultMessage);
    userEvent.click(closeButton);

    const goBackButton = screen.getByText(globalMessages.goBackToEdit.defaultMessage);
    userEvent.click(goBackButton);

    expect(screen.queryByText(globalMessages.discard.defaultMessage)).not.toBeInTheDocument();
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch to props correctly', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);

      expect(props.actions).toBeDefined();
      expect(typeof props.actions.setMode).toBe('function');
      expect(typeof props.actions.clearData).toBe('function');
      expect(typeof props.actions.createCustomField).toBe('function');
      expect(typeof props.actions.updateCustomField).toBe('function');

      props.actions.setMode(CustomFieldsSettingsMode.EDIT);
      props.actions.clearData();
      props.actions.createCustomField();
      props.actions.updateCustomField();
      expect(dispatch).toHaveBeenCalledTimes(4);
    });
  });
});
