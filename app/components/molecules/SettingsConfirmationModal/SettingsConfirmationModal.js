import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import CapModal from '@capillarytech/cap-ui-library/CapModal';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

import withStyledComponent from 'hoc/withStyledComponent';

import styles from './styles';

export const SettingsConfirmationModal = ({
  className,
  isModalVisible,
  handleConfirmation,
  handleCancellation,
  okText,
  closeText,
  title,
  description,
  subDescription,
  restProps,
}) => (
  <CapModal
    className={classNames(className, 'settings-confirmation-modal')}
    title={
      <CapRow className="settings-confirmation-modal-header">
        <CapHeading className="settings-confirmation-modal-title" type="h3">
          {title}
        </CapHeading>
        <CapLabel className="settings-confirmation-modal-description" type="label31">
          {description}
        </CapLabel>
        {subDescription && (
          <CapLabel className="settings-confirmation-modal-sub-description" type="label31">
            {subDescription}
          </CapLabel>
        )}
      </CapRow>
    }
    visible={isModalVisible}
    onOk={handleConfirmation}
    onCancel={handleCancellation}
    okText={okText}
    closeText={closeText}
    centered
    width={496}
    {...restProps}
  />
);

SettingsConfirmationModal.propTypes = {
  className: PropTypes.string,
  isModalVisible: PropTypes.bool,
  handleConfirmation: PropTypes.func,
  handleCancellation: PropTypes.func,
  okText: PropTypes.string,
  closeText: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  subDescription: PropTypes.string,
  restProps: PropTypes.object,
};

SettingsConfirmationModal.defaultProps = {
  className: '',
  isModalVisible: false,
  handleConfirmation: () => {},
  handleCancellation: () => {},
  okText: '',
  closeText: '',
  title: '',
  description: '',
  subDescription: '',
  restProps: {},
};

export default withStyledComponent(SettingsConfirmationModal, styles);
