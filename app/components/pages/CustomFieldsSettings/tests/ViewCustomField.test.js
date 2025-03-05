import React from 'react';
import '@testing-library/jest-dom';
import { screen, render } from '../../../../utils/test-utils';
import userEvent from '@testing-library/user-event';
import { injectIntl } from 'react-intl';

import { ViewCustomField, mapDispatchToProps } from '../ViewCustomField';
import { CustomFieldsSettingsMode } from '../constant';
import globalMessages from '../../Cap/messages';
import { clearDataMockFn, setModeMock } from './CreateEditCustomField.test';

// Mock ViewCustomFieldContent component
jest.mock('../ViewCustomFieldContent', () => ({
  __esModule: true,
  default: () => () => <div data-testid="mock-view-custom-field-content">Mocked Content</div>,
}));

const initializeViewCustomField = (props = {}) => {
  const Component = injectIntl(ViewCustomField);
  const defaultProps = {
    actions: {
      setMode: setModeMock,
      clearData: clearDataMockFn,
    },
    mode: CustomFieldsSettingsMode.VIEW,
    ...props,
  };

  return render(<Component {...defaultProps} />);
};

describe('ViewCustomField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly with default props', () => {
    initializeViewCustomField();

    expect(screen.getByText(/View custom field/i)).toBeInTheDocument(); //dynamic
    expect(screen.getByText(globalMessages.done.defaultMessage)).toBeInTheDocument();
  });

  it('should handle Done button click', () => {
    initializeViewCustomField();

    userEvent.click(screen.getByText(globalMessages.done.defaultMessage));
    expect(clearDataMockFn).toHaveBeenCalledTimes(1);
  });

  it('should handle Edit button click', () => {
    initializeViewCustomField();

    userEvent.click(screen.getByText(/Edit custom field/i)); //dynamic
    expect(setModeMock).toHaveBeenCalledWith(CustomFieldsSettingsMode.EDIT);
  });

  it('should handle close button click', () => {
    initializeViewCustomField();

    const closeButton = document.querySelector('.cap-slide-box-v2-close-icon');
    userEvent.click(closeButton);
    expect(clearDataMockFn).toHaveBeenCalledTimes(1);
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch to props correctly', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);

      expect(props.actions).toBeDefined();
      expect(typeof props.actions.setMode).toBe('function');
      expect(typeof props.actions.clearData).toBe('function');

      props.actions.setMode(CustomFieldsSettingsMode.EDIT);
      props.actions.clearData();
      expect(dispatch).toHaveBeenCalledTimes(2);
    });
  });
});
