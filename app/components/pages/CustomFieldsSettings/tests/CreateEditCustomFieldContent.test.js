import React from 'react';
import '@testing-library/jest-dom';
import { injectIntl } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../../utils/test-utils';

import { CreateEditCustomFieldContent } from '../CreateEditCustomFieldContent';
import globalMessages from '../../Cap/messages';

import {
  setFieldNameMockFn,
  setScopeMockFn,
  setDataTypeMockFn,
  setIsMandatoryMockFn,
  setDefaultValueMockFn,
  addEnumValueMockFn,
  removeEnumValueMockFn,
  setDuplicateNameErrorMockFn,
  setEnumValueErrorMockFn,
} from './CreateEditCustomField.test';
import { CUSTOM_FIELD_DATA_TYPES } from '../../App/constants';

//mock CreateEditCustomFieldDefaultValue component
jest.mock('../CreateEditCustomFieldDefaultValue', () => ({
  __esModule: true,
  default: () => <></>,
}));

//mock CapTagDropdown component
jest.mock('@capillarytech/cap-ui-library/CapTagDropdown', () => ({
  __esModule: true,
  default: ({
    content,
    list,
    handleRemoveTagCallback,
    handleKeyDownCallback,
    inputProps: { dataTestId, onChange, errorMessage },
  }) => (
    <div data-testid="custom-field-enum-values-tag-dropdown">
      <input
        data-testid={dataTestId}
        value={content}
        onChange={onChange}
        onKeyDown={handleKeyDownCallback}
      />
      {list?.map((item) => (
        <div key={item.id} data-testid="enum-value-item">
          {item.tag}
          <button
            onClick={() => handleRemoveTagCallback(item.id)}
            data-testid="remove-enum-value-button"
          >
            Remove
          </button>
        </div>
      ))}
      {errorMessage && <div data-testid="enum-error">{errorMessage}</div>}
    </div>
  ),
}));

const initializeCreateEditCustomFieldContentComponent = (props) => {
  const Component = injectIntl(CreateEditCustomFieldContent);

  const propsObj = {
    actions: {
      setName: setFieldNameMockFn,
      setScope: setScopeMockFn,
      setDataType: setDataTypeMockFn,
      setIsMandatory: setIsMandatoryMockFn,
      setDefaultValue: setDefaultValueMockFn,
      addEnumValue: addEnumValueMockFn,
      removeEnumValue: removeEnumValueMockFn,
      setDuplicateNameError: setDuplicateNameErrorMockFn,
      setEnumValueError: setEnumValueErrorMockFn,
    },
    customFieldMeta: {},
    orgTimezone: {},
    ...props,
  };

  return render(<Component {...propsObj} />);
};

describe('CreateEditCustomFieldContent', () => {
  let errorMessage = 'Test error message';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should check if name operations are working as expected', () => {
    initializeCreateEditCustomFieldContentComponent({
      customFieldMeta: {
        duplicateNameError: {
          showError: true,
          errorMessage: errorMessage,
        },
      },
    });

    const nameInput = screen.getByTestId('custom-field-name-input');
    expect(nameInput).toBeInTheDocument();
    userEvent.type(nameInput, 'Test');
    expect(setFieldNameMockFn).toHaveBeenCalledTimes(4);

    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
    expect(setDuplicateNameErrorMockFn).toHaveBeenCalled();
  });

  it('should check if scope operations are working as expected', () => {
    initializeCreateEditCustomFieldContentComponent();

    const scopeSelect = screen.getByTestId('custom-field-scope-select');
    expect(scopeSelect).toBeInTheDocument();
    userEvent.click(scopeSelect);

    const rewardScopeOption = screen.getAllByText(/Catalog item issual/i)[0]; //dynamic message
    expect(rewardScopeOption).toBeInTheDocument();
    userEvent.click(rewardScopeOption);

    expect(setScopeMockFn).toHaveBeenCalledTimes(1);
  });

  it('should check if data type operations are working as expected', () => {
    initializeCreateEditCustomFieldContentComponent();

    const dataTypeSelect = screen.getByTestId('custom-field-data-type-select');
    expect(dataTypeSelect).toBeInTheDocument();
    userEvent.click(dataTypeSelect);

    const stringOption = screen.getByText(globalMessages.string.defaultMessage);
    expect(stringOption).toBeInTheDocument();
    userEvent.click(stringOption);

    expect(setDataTypeMockFn).toHaveBeenCalledTimes(1);
  });

  it('should check if enum values operations are working as expected', () => {
    initializeCreateEditCustomFieldContentComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.ENUM,
        enumValues: [{ id: 1, value: 'Test' }],
        enumValueError: {
          showError: true,
          errorMessage: errorMessage,
        },
      },
    });

    const enumValueDropdown = screen.getByTestId('custom-field-enum-values-tag-dropdown');
    expect(enumValueDropdown).toBeInTheDocument();
    userEvent.click(enumValueDropdown);

    const enumValueInput = screen.getByTestId('custom-field-enum-values-tag-input');
    expect(enumValueInput).toBeInTheDocument();
    userEvent.type(enumValueInput, 'Test_1');
    userEvent.keyboard('{Enter}');

    expect(addEnumValueMockFn).toHaveBeenCalledTimes(1);

    const removeEnumValueButton = screen.getByTestId('remove-enum-value-button');
    expect(removeEnumValueButton).toBeInTheDocument();
    userEvent.click(removeEnumValueButton);

    const modalConfirmButton = screen.getByText(globalMessages.yesDelete.defaultMessage);
    expect(modalConfirmButton).toBeInTheDocument();
    userEvent.click(modalConfirmButton);

    expect(removeEnumValueMockFn).toHaveBeenCalledTimes(1);
  });

  it('should check if is mandatory operations are working as expected', () => {
    initializeCreateEditCustomFieldContentComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
      },
    });

    const isMandatorySwitch = screen.getByTestId('custom-field-is-mandatory-switch');
    expect(isMandatorySwitch).toBeInTheDocument();
    userEvent.click(isMandatorySwitch);

    expect(setIsMandatoryMockFn).toHaveBeenCalledTimes(1);
  });
});
