import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapInput from '@capillarytech/cap-ui-library/CapInput';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapPopover from '@capillarytech/cap-ui-library/CapPopover';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import classNames from 'classnames';
import withStyledComponent from 'hoc/withStyledComponent';
import PropTypes from 'prop-types';
import React, { useRef, useEffect } from 'react';

import styles from './styles';

export const SettingsCreateEditPopover = ({
  className,
  children,
  cancelButtonText,
  saveButtonText,
  handleClose,
  handleSave,
  disableCondition,
  popoverHeading,
  popoverPrimaryInputSubheading,
  primaryInputProps,
  isSecondaryInput,
  popoverSecondaryInputSubheading,
  secondaryInputProps,
  popoverProps,
  isPrimaryOptionalLabel,
  isSecondaryOptionalLabel,
  optionalText,
  handleClearData,
}) => {
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!popoverRef.current?.contains(event.target)) {
        handleClearData();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <CapPopover
      ref={popoverRef}
      overlayClassName={classNames(className, 'settings-create-edit-popover')}
      content={
        <CapRow
          type="flex"
          className={classNames(className, 'settings-create-edit-popover-container')}
        >
          <CapLabel type="label17" className="settings-create-edit-popover-header">
            {popoverHeading}
          </CapLabel>
          <CapRow type="flex" className="settings-create-edit-popover-input-container">
            <CapRow type="flex" className="settings-create-edit-popover-input-container-header">
              <CapLabel
                type="label25"
                className="settings-create-edit-popover-input-container-heading"
              >
                {popoverPrimaryInputSubheading}
              </CapLabel>
              {isPrimaryOptionalLabel && (
                <CapLabel
                  type="label24"
                  className="settings-create-edit-popover-input-container-subheading"
                >
                  {`(${optionalText})`}
                </CapLabel>
              )}
            </CapRow>
            <CapInput {...primaryInputProps} />
          </CapRow>
          {isSecondaryInput && (
            <CapRow type="flex" className="settings-create-edit-popover-input-container">
              <CapRow type="flex" className="settings-create-edit-popover-input-container-header">
                <CapLabel
                  type="label25"
                  className="settings-create-edit-popover-input-container-heading"
                >
                  {popoverSecondaryInputSubheading}
                </CapLabel>
                {isSecondaryOptionalLabel && (
                  <CapLabel
                    type="label24"
                    className="settings-create-edit-popover-input-container-subheading"
                  >
                    {`(${optionalText})`}
                  </CapLabel>
                )}
              </CapRow>
              <CapInput {...secondaryInputProps} />
            </CapRow>
          )}
          <CapRow type="flex" className="settings-create-edit-popover-confirmation-container">
            <CapButton type="primary" onClick={handleSave} disabled={disableCondition}>
              {saveButtonText}
            </CapButton>
            <CapButton type="secondary" onClick={handleClose}>
              {cancelButtonText}
            </CapButton>
          </CapRow>
        </CapRow>
      }
      {...popoverProps}
    >
      {children}
    </CapPopover>
  );
};

SettingsCreateEditPopover.propTypes = {
  className: PropTypes.string,
  children: PropTypes.element,
  cancelButtonText: PropTypes.string,
  saveButtonText: PropTypes.string,
  handleClose: PropTypes.func,
  handleSave: PropTypes.func,
  popoverHeading: PropTypes.string,
  disableCondition: PropTypes.bool,
  popoverPrimaryInputSubheading: PropTypes.string,
  primaryInputProps: PropTypes.object,
  isSecondaryInput: PropTypes.bool,
  popoverSecondaryInputSubheading: PropTypes.string,
  secondaryInputProps: PropTypes.object,
  popoverProps: PropTypes.object,
  isPrimaryOptionalLabel: PropTypes.bool,
  isSecondaryOptionalLabel: PropTypes.bool,
  optionalText: PropTypes.string,
  handleClearData: PropTypes.func,
};

SettingsCreateEditPopover.defaultProps = {
  className: '',
  children: <></>,
  cancelButtonText: '',
  saveButtonText: '',
  handleClose: () => {},
  handleSave: () => {},
  popoverHeading: '',
  disableCondition: false,
  popoverPrimaryInputSubheading: '',
  primaryInputProps: {},
  isSecondaryInput: false,
  popoverSecondaryInputSubheading: '',
  secondaryInputProps: {},
  popoverProps: {},
  isPrimaryOptionalLabel: false,
  isSecondaryOptionalLabel: false,
  optionalText: '',
  handleClearData: () => {},
};

export default withStyledComponent(SettingsCreateEditPopover, styles);
