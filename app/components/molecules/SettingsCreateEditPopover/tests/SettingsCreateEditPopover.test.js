import CapButton from '@capillarytech/cap-ui-library/CapButton';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { SettingsCreateEditPopover } from '../SettingsCreateEditPopover';

jest.setTimeout(10000);

describe('<SettingsCreateEditPopover />', () => {
  const mockProps = {
    className: 'test-class',
    cancelButtonText: 'Cancel',
    saveButtonText: 'Save',
    handleClose: jest.fn(),
    handleSave: jest.fn(),
    popoverHeading: 'Popover Heading',
    isPrimaryOptionalLabel: true,
    isSecondaryOptionalLabel: true,
    popoverPrimaryInputSubheading: 'Primary Input',
    primaryInputProps: { placeholder: 'Enter primary input' },
    isSecondaryInput: true,
    popoverSecondaryInputSubheading: 'Secondary Input',
    secondaryInputProps: { placeholder: 'Enter secondary input' },
    disableCondition: false,
    optionalText: 'Optional',
    children: <CapButton type="primary">Open Popover</CapButton>,
  };

  it('should render without crashing', () => {
    render(<SettingsCreateEditPopover {...mockProps} />);
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('should display popover heading and input fields', async () => {
    render(<SettingsCreateEditPopover {...mockProps} />);
    const openButton = screen.getByText('Open Popover');
    userEvent.click(openButton);
    await waitFor(
      () => {
        expect(screen.getByText('Popover Heading')).toBeInTheDocument();
        expect(screen.getByText('Primary Input')).toBeInTheDocument();
        expect(screen.getByText('Secondary Input')).toBeInTheDocument();
        expect(screen.getAllByText(/Optional/i)).toHaveLength(2);
      },
      { timeout: 5000 },
    );
  });
});
