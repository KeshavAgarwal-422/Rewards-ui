import React from 'react';
import '@testing-library/jest-dom';
import { injectIntl } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../../utils/test-utils';
import {
  CreateEditCustomFieldDefaultValue,
  mapDispatchToProps,
} from '../CreateEditCustomFieldDefaultValue';
import { CUSTOM_FIELD_DATA_TYPES } from '../../App/constants';
import { setDefaultValueErrorMockFn, setDefaultValueMockFn } from './CreateEditCustomField.test';

const initializeCreateEditCustomFieldDefaultValueComponent = (props) => {
  const Component = injectIntl(CreateEditCustomFieldDefaultValue);
  const defaultProps = {
    actions: {
      setDefaultValue: setDefaultValueMockFn,
      setDefaultValueError: setDefaultValueErrorMockFn,
    },
    customFieldMeta: {},
    enumOptions: [],
    ...props,
  };

  return render(<Component {...defaultProps} />);
};

describe('CreateEditCustomFieldDefaultValue', () => {
  let errorMessage = 'Test error message';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle string input correctly', () => {
    initializeCreateEditCustomFieldDefaultValueComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
        defaultValue: '',
        defaultValueError: {
          showError: true,
          errorMessage: errorMessage,
        },
      },
    });

    const textArea = screen.getByTestId('default-value-string-input');
    expect(textArea).toBeInTheDocument();

    userEvent.type(textArea, 'Test String');
    expect(setDefaultValueMockFn).toHaveBeenCalledTimes(11);

    // Test string length validation
    const longString = 'a'.repeat(256);
    userEvent.clear(textArea);
    userEvent.type(textArea, longString);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(setDefaultValueErrorMockFn).toHaveBeenCalled();
  });

  it('should handle integer input correctly', () => {
    initializeCreateEditCustomFieldDefaultValueComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.INTEGER,
        defaultValue: '',
      },
    });

    const input = screen.getByTestId('default-value-integer-input');
    expect(input).toBeInTheDocument();

    userEvent.type(input, '123');
    expect(setDefaultValueMockFn).toHaveBeenCalledTimes(3);
  });

  it('should handle boolean input correctly', () => {
    initializeCreateEditCustomFieldDefaultValueComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.BOOLEAN,
        defaultValue: undefined,
      },
    });

    const trueRadio = screen.getByRole('radio', { name: 'True' });
    expect(trueRadio).toBeInTheDocument();
    userEvent.click(trueRadio);
    expect(setDefaultValueMockFn).toHaveBeenCalledWith(true);

    const falseRadio = screen.getByRole('radio', { name: 'False' });
    expect(falseRadio).toBeInTheDocument();
    userEvent.click(falseRadio);
    expect(setDefaultValueMockFn).toHaveBeenCalledWith(false);
  });

  it('should handle enum input correctly', () => {
    const enumOptions = [
      { label: 'Option 1', value: 'opt1' },
      { label: 'Option 2', value: 'opt2' },
    ];

    initializeCreateEditCustomFieldDefaultValueComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.ENUM,
        defaultValue: '',
      },
      enumOptions,
    });

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    userEvent.click(select);
    const option = screen.getByText('Option 1');
    userEvent.click(option);

    expect(setDefaultValueMockFn).toHaveBeenCalledWith('opt1');
  });

  it('should handle reset functionality correctly', () => {
    initializeCreateEditCustomFieldDefaultValueComponent({
      customFieldMeta: {
        dataType: CUSTOM_FIELD_DATA_TYPES.BOOLEAN,
        defaultValue: true,
      },
    });

    const resetButton = document.querySelector('.reset-icon');
    expect(resetButton).not.toHaveClass('disabled-icon');
    userEvent.click(resetButton);
    expect(setDefaultValueMockFn).toHaveBeenCalledWith(undefined);
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch to props correctly', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);

      expect(props.actions).toBeDefined();
      expect(typeof props.actions.setDefaultValue).toBe('function');
      expect(typeof props.actions.setDefaultValueError).toBe('function');

      // Test the mapped actions
      props.actions.setDefaultValue('Test');
      props.actions.setDefaultValueError({});
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
