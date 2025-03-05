import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapHeading from '@capillarytech/cap-ui-library/CapHeading';

import withStyledComponent from 'hoc/withStyledComponent';

import styles from './styles';
import globalMessages from '../../pages/Cap/messages';

function ErrorBoundaryFallback({ intl: { formatMessage }, className }) {
  return (
    <CapRow className={className}>
      <CapRow className="error-boundary-fallback">
        <CapHeading type="h3">{formatMessage(globalMessages.errorMessage)}</CapHeading>
        <CapHeading>{formatMessage(globalMessages.errorMessageDesc)}</CapHeading>
      </CapRow>
    </CapRow>
  );
}

ErrorBoundaryFallback.propTypes = {
  intl: intlShape.isRequired,
  className: PropTypes.string,
};

ErrorBoundaryFallback.defaultProps = {
  className: '',
};

export default injectIntl(withStyledComponent(ErrorBoundaryFallback, styles));
