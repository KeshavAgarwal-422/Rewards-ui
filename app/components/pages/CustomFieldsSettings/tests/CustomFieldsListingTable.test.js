import React from 'react';
import '@testing-library/jest-dom';
import { injectIntl } from 'react-intl';
import userEvent from '@testing-library/user-event';
import { screen, render } from '../../../../utils/test-utils';

import { CustomFieldsListingTable, mapDispatchToProps } from '../CustomFieldsListingTable';
import { REQUEST } from '../../App/constants';
import { CustomFieldsSettingsMode } from '../constant';
import { setCustomFieldIdMock, setModeMock, sortListMock } from './CreateEditCustomField.test';

// Mock the table scroll height utility
jest.mock('utils/tableScrollHeight', () => ({
  __esModule: true,
  default: jest.fn(() => 500),
}));

const initializeCustomFieldsListingTable = (props) => {
  const Component = injectIntl(CustomFieldsListingTable);

  const defaultProps = {
    actions: {
      setCustomFieldId: setCustomFieldIdMock,
      setMode: setModeMock,
      sortList: sortListMock,
    },
    getAllCustomFieldsData: {
      getAllCustomFieldsStatus: '',
      filteredCustomFields: [{ id: '1', key: '1', name: 'Test Field' }],
    },
    orgTimezone: {},
    applySorting: false,
    ...props,
  };

  return render(<Component {...defaultProps} />);
};

describe('CustomFieldsListingTable', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render the table with data', () => {
    initializeCustomFieldsListingTable();
    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText('Test Field')).toBeInTheDocument();
  });

  it('should show loading state when fetching data', () => {
    initializeCustomFieldsListingTable({
      getAllCustomFieldsData: {
        getAllCustomFieldsStatus: REQUEST,
        filteredCustomFields: [],
      },
    });

    const spinner = document.querySelector('.ant-spin-blur');
    expect(spinner).toBeInTheDocument();
  });

  it('should handle row hover events', () => {
    initializeCustomFieldsListingTable();
    const row = screen.getByText('Test Field').closest('tr');

    userEvent.hover(row);
    expect(setCustomFieldIdMock).toHaveBeenCalledWith('1');

    userEvent.unhover(row);
    expect(setCustomFieldIdMock).toHaveBeenCalledTimes(1);
  });

  it('shoul handle row click event', () => {
    initializeCustomFieldsListingTable();
    const row = screen.getByText('Test Field').closest('tr');

    userEvent.click(row);
    expect(setModeMock).toHaveBeenCalledWith(CustomFieldsSettingsMode.VIEW);
  });

  it('should map dispatch to props correctly', () => {
    const dispatch = jest.fn();
    const mappedProps = mapDispatchToProps(dispatch);

    expect(mappedProps.actions).toHaveProperty('setCustomFieldId');
    expect(mappedProps.actions).toHaveProperty('setMode');
    expect(mappedProps.actions).toHaveProperty('sortList');

    // Test the action creators
    mappedProps.actions.setCustomFieldId('test-id');
    mappedProps.actions.setMode(CustomFieldsSettingsMode.VIEW);
    mappedProps.actions.sortList(true);

    expect(dispatch).toHaveBeenCalledTimes(3);
  });

  it('should applie correct row className based on hover state', () => {
    initializeCustomFieldsListingTable();
    const row = screen.getByText('Test Field').closest('tr');

    expect(row).toHaveClass('pointer-cursor');
    userEvent.hover(row);
    expect(row).toHaveClass('pointer-cursor hovered-row');
    userEvent.unhover(row);
    expect(row).not.toHaveClass('hovered-row');
  });

  it('should handle empty custom fields list', () => {
    initializeCustomFieldsListingTable({
      getAllCustomFieldsData: {
        getAllCustomFieldsStatus: '',
        filteredCustomFields: [],
      },
    });

    const table = screen.getByRole('table');
    expect(table).toBeInTheDocument();
    expect(screen.queryByText('Test Field')).not.toBeInTheDocument();
  });

  describe('mapDispatchToProps', () => {
    it('should map dispatch to props correctly', () => {
      const dispatch = jest.fn();
      const props = mapDispatchToProps(dispatch);

      expect(props.actions).toBeDefined();
      expect(typeof props.actions.setMode).toBe('function');
      expect(typeof props.actions.setCustomFieldId).toBe('function');
      expect(typeof props.actions.sortList).toBe('function');

      // Test the mapped actions
      props.actions.setMode(CustomFieldsSettingsMode.EDIT);
      props.actions.setCustomFieldId(422);
      props.actions.sortList(true);
      expect(dispatch).toHaveBeenCalledTimes(3);
    });
  });
});
