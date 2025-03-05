import React from 'react';
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

import ViewCustomFieldContent from './ViewCustomFieldContent';

import messages from './messages';
import globalMessages from '../Cap/messages';
import { setMode, clearData } from './action';
import { customFieldsSettingsCreatePrefix, CustomFieldsSettingsMode } from './constant';
import { makeSelectCustomFieldsSettingsMode } from './selector';

export const ViewCustomField = ({
  intl: { formatMessage },
  actions: { setMode, clearData },
  mode,
}) => {
  const handleDoneButtonClick = () => {
    clearData();
  };

  const handleGotoEditMode = () => {
    setMode(CustomFieldsSettingsMode.EDIT);
  };

  return (
    <CapSlideBox
      show
      className={classNames(
        `${customFieldsSettingsCreatePrefix}-slide-box`,
        'settings-ui-slide-box',
      )}
      header={
        <CapHeading type="h2">
          {formatMessage(messages.customFieldSlideBoxHeader, { mode })}
        </CapHeading>
      }
      content={<ViewCustomFieldContent />}
      footer={
        <CapRow>
          <CapButton type="primary" onClick={handleDoneButtonClick}>
            {formatMessage(globalMessages.done)}
          </CapButton>
          <CapButton type="secondary" onClick={handleGotoEditMode}>
            {formatMessage(messages.secondaryFooterCta, { mode })}
          </CapButton>
        </CapRow>
      }
      size="size-s"
      handleClose={handleDoneButtonClick}
    />
  );
};

ViewCustomField.propTypes = {
  intl: intlShape.isRequired,
  actions: PropTypes.object,
  mode: PropTypes.string,
};

ViewCustomField.defaultProps = {
  actions: {},
  mode: CustomFieldsSettingsMode.LISTING,
};

const mapStateToProps = createStructuredSelector({
  mode: makeSelectCustomFieldsSettingsMode(),
});

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        setMode,
        clearData,
      },
      dispatch,
    ),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(injectIntl(ViewCustomField));
