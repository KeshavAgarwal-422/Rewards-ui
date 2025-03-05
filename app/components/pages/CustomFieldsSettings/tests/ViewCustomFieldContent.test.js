import React from 'react';
import '@testing-library/jest-dom';
import { injectIntl } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../../utils/test-utils';

import { ViewCustomFieldContent } from '../ViewCustomFieldContent';
import { CUSTOM_FIELD_DATA_TYPES } from '../../App/constants';
import globalMessages from '../../Cap/messages';

const initializeViewCustomFieldContent = (props = {}) => {
  const Component = injectIntl(ViewCustomFieldContent);
  const defaultProps = {
    selectedCustomFieldMeta: {
      name: 'Test Field',
      scope: 'REWARD',
      dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
      isMandatory: false,
    },
    ...props,
  };

  return render(<Component {...defaultProps} />);
};

describe('ViewCustomFieldContent', () => {
  it('should render basic field information', () => {
    initializeViewCustomFieldContent();

    expect(screen.getByText('Test Field')).toBeInTheDocument();
    expect(screen.getByText('Catalog item creation')).toBeInTheDocument(); //dynamic
    expect(screen.getByText(globalMessages.string.defaultMessage)).toBeInTheDocument();
  });

  it('should render mandatory switch', () => {
    initializeViewCustomFieldContent({
      selectedCustomFieldMeta: {
        name: 'Test Field',
        scope: 'REWARD',
        dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
        isMandatory: true,
      },
    });

    const switchElement = screen.getByRole('switch');
    expect(switchElement).toBeInTheDocument();
    expect(switchElement).toBeChecked();
    expect(switchElement).toBeDisabled();
  });

  it('should render default value when provided', () => {
    initializeViewCustomFieldContent({
      selectedCustomFieldMeta: {
        name: 'Test Field',
        scope: 'REWARD',
        dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
        defaultValue: 'Default Text',
      },
    });

    expect(screen.getByText('Default Text')).toBeInTheDocument();
  });

  it('should render enum values with expand/collapse functionality', () => {
    initializeViewCustomFieldContent({
      selectedCustomFieldMeta: {
        name: 'Test Field',
        scope: 'REWARD',
        dataType: CUSTOM_FIELD_DATA_TYPES.ENUM,
        enumValues: ['Option 1', 'Option 2', 'Option 3'],
      },
    });

    expect(screen.getByText('Option 1 +2 more')).toBeInTheDocument(); //dynamic
    userEvent.click(screen.getByText(globalMessages.preDefinedValues.defaultMessage));

    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();

    userEvent.click(screen.getByText(globalMessages.preDefinedValues.defaultMessage));
    expect(screen.getByText('Option 1 +2 more')).toBeInTheDocument();
  });

  it('should handle different scopes', () => {
    initializeViewCustomFieldContent({
      selectedCustomFieldMeta: {
        name: 'Test Field',
        scope: 'ISSUE_REWARD',
        dataType: CUSTOM_FIELD_DATA_TYPES.STRING,
      },
    });

    expect(screen.getByText('Catalog item issual')).toBeInTheDocument(); //dynamic
  });

  it('should handle different data types', () => {
    initializeViewCustomFieldContent({
      selectedCustomFieldMeta: {
        name: 'Test Field',
        scope: 'REWARD',
        dataType: CUSTOM_FIELD_DATA_TYPES.INTEGER,
      },
    });

    expect(screen.getByText(globalMessages.number.defaultMessage)).toBeInTheDocument();
  });
});
