import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import CapIcon from '@capillarytech/cap-ui-library/CapIcon';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';

import withStyledComponent from 'hoc/withStyledComponent';

import styles from './styles';
import globalMessages from '../../pages/Cap/messages';

export const SettingsQuickActions = ({
  intl: { formatMessage },
  className,
  rowData,
  handleOnEditClick,
  handleOnDeleteClick,
}) => {
  const handleStopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleEdit = () => {
    handleOnEditClick(rowData);
  };

  const handleDelete = () => {
    handleOnDeleteClick(rowData);
  };

  return (
    <CapRow className={className}>
      <CapRow className="quick-actions-container" onClick={handleStopPropagation}>
        <CapTooltip title={formatMessage(globalMessages.edit)} overlayStyle={{ zIndex: 99 }}>
          <CapIcon
            type="edit"
            size="m"
            data-testid="edit"
            className="quick-actions-icon"
            onClick={handleEdit}
          />
        </CapTooltip>
        <CapTooltip title={formatMessage(globalMessages.delete)} overlayStyle={{ zIndex: 99 }}>
          <CapIcon
            type="delete"
            size="m"
            data-testid="delete"
            className="quick-actions-icon"
            onClick={handleDelete}
          />
        </CapTooltip>
      </CapRow>
    </CapRow>
  );
};

SettingsQuickActions.propTypes = {
  intl: intlShape.isRequired,
  className: PropTypes.string,
  rowData: PropTypes.object,
  handleOnEditClick: PropTypes.func,
  handleOnDeleteClick: PropTypes.func,
};

SettingsQuickActions.defaultProps = {
  className: '',
  rowData: {},
  handleOnEditClick: () => {},
  handleOnDeleteClick: () => {},
};

export default injectIntl(withStyledComponent(SettingsQuickActions, styles));
