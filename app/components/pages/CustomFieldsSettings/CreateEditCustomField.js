import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import classNames from 'classnames';

import CapButton from '@capillarytech/cap-ui-library/CapButton';
import CapSlideBox from '@capillarytech/cap-ui-library/CapSlideBox';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';
import CapRow from '@capillarytech/cap-ui-library/CapRow';

import CreateEditCustomFieldContent from './CreateEditCustomFieldContent';
import SettingsConfirmationModal from '../../molecules/SettingsConfirmationModal';

import messages from './messages';
import globalMessages from '../Cap/messages';
import { setMode, createCustomField, updateCustomField, clearData } from './action';
import { customFieldsSettingsCreatePrefix, CustomFieldsSettingsMode } from './constant';
import {
  makeSelectCustomFieldMeta,
  makeSelectCustomFieldsSettingsMode,
  makeSelectIsCustomFieldModified,
  makeSelectIsProcessingRequest,
  makeSelectSelectedCustomFieldMeta,
} from './selector';
import { getCustomFieldCompletionStatus } from './utils';

export const CreateEditCustomField = ({
  intl: { formatMessage },
  actions: { setMode, createCustomField, updateCustomField, clearData },
  mode,
  customFieldMeta,
  selectedCustomFieldMeta: { name },
  isCustomFieldModified,
  isProcessingRequest,
}) => {
  const [isCancelConfirmationModalVisible, setIsCancelConfirmationModalVisible] = useState(false);

  const handleDeleteConfirmation = () => {
    updateCustomField();
  };

  const handleCancelConfirmation = () => {
    setIsCancelConfirmationModalVisible(false);
    clearData();
  };

  const handleCancelConfirmationModalClose = () => {
    setIsCancelConfirmationModalVisible(false);
  };

  const handleCreateButtonClick = () => {
    setMode(CustomFieldsSettingsMode.CREATE);
  };

  const handleSlideBoxClose = () => {
    if (
      [CustomFieldsSettingsMode.CREATE, CustomFieldsSettingsMode.EDIT].includes(mode) &&
      isCustomFieldModified
    ) {
      setIsCancelConfirmationModalVisible(true);
    } else {
      clearData();
    }
  };

  const handleDoneButtonClick = () => {
    mode === CustomFieldsSettingsMode.CREATE ? createCustomField() : updateCustomField();
  };

  return (
    <>
      {isCancelConfirmationModalVisible && (
        <SettingsConfirmationModal
          isModalVisible={isCancelConfirmationModalVisible}
          handleConfirmation={handleCancelConfirmation}
          handleCancellation={handleCancelConfirmationModalClose}
          okText={formatMessage(globalMessages.discard)}
          closeText={formatMessage(globalMessages.goBackToEdit)}
          title={formatMessage(messages.discardCustomFieldsTitle)}
          description={formatMessage(messages.discardCustomFieldsDesc)}
        />
      )}
      {mode === CustomFieldsSettingsMode.LISTING ? (
        <CapButton type="primary" onClick={handleCreateButtonClick}>
          {formatMessage(messages.customFieldSlideBoxHeader, {
            mode: CustomFieldsSettingsMode.CREATE,
          })}
        </CapButton>
      ) : mode === CustomFieldsSettingsMode.DELETE ? (
        <SettingsConfirmationModal
          isModalVisible={true}
          handleConfirmation={handleDeleteConfirmation}
          handleCancellation={handleSlideBoxClose}
          okText={formatMessage(globalMessages.yesDelete)}
          closeText={formatMessage(globalMessages.cancel)}
          title={formatMessage(messages.deleteCustomField, { customFieldName: name })}
          description={formatMessage(messages.deleteCustomFieldDesc)}
          subDescription={formatMessage(messages.deleteCustomFieldSubDesc)}
        />
      ) : (
        <CapSlideBox
          className={classNames(
            `${customFieldsSettingsCreatePrefix}-slide-box`,
            'settings-ui-slide-box',
          )}
          show
          header={
            <CapHeading type="h2">
              {formatMessage(messages.customFieldSlideBoxHeader, { mode })}
            </CapHeading>
          }
          content={<CreateEditCustomFieldContent />}
          footer={
            <CapRow>
              <CapButton
                type="primary"
                onClick={handleDoneButtonClick}
                disabled={
                  !getCustomFieldCompletionStatus(
                    mode,
                    customFieldMeta,
                    isCustomFieldModified,
                    isProcessingRequest,
                  )
                }
              >
                {formatMessage(globalMessages.done)}
              </CapButton>
              <CapButton type="secondary" onClick={handleSlideBoxClose}>
                {formatMessage(messages.secondaryFooterCta, { mode })}
              </CapButton>
            </CapRow>
          }
          size="size-s"
          handleClose={handleSlideBoxClose}
        />
      )}
    </>
  );
};

CreateEditCustomField.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  mode: PropTypes.string,
  customFieldMeta: PropTypes.object,
  selectedCustomFieldMeta: PropTypes.object,
  isCustomFieldModified: PropTypes.bool,
  isProcessingRequest: PropTypes.bool,
};

CreateEditCustomField.defaultProps = {
  actions: {},
  mode: CustomFieldsSettingsMode.LISTING,
  customFieldMeta: {},
  selectedCustomFieldMeta: {},
  isCustomFieldModified: false,
  isProcessingRequest: false,
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectCustomFieldsSettingsMode(),
  customFieldMeta: makeSelectCustomFieldMeta(),
  selectedCustomFieldMeta: makeSelectSelectedCustomFieldMeta(),
  isCustomFieldModified: makeSelectIsCustomFieldModified(),
  isProcessingRequest: makeSelectIsProcessingRequest(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setMode,
        createCustomField,
        updateCustomField,
        clearData,
      },
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(CreateEditCustomField));
