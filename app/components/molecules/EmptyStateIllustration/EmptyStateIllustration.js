/**
 *
 * EmptyStateIllustration
 *
 */

import CapIllustration from '@capillarytech/cap-ui-library/CapIllustration';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import PropTypes from 'prop-types';
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';

import illustrationImage from '../../../assets/loading_img.gif';

import messages from './messages';
import styles from './style';

const EmptyStateIllustration = ({ className, intl: { formatMessage } }) => {
  const getIllustrationProps = (hasAccess) => ({
    illustrationImage,
    title: formatMessage(messages.nothingConfigured),
    description: formatMessage(messages.nothingConfiguredDesc),
    hasAccess,
    buttonClassName: 'empty-state-button',
  });

  return (
    <CapRow className={className}>
      <CapIllustration {...getIllustrationProps(true)} />
    </CapRow>
  );
};

EmptyStateIllustration.propTypes = {
  intl: intlShape.isRequired,
  className: PropTypes.string,
};

EmptyStateIllustration.defaultProps = {
  className: '',
};

export default injectIntl(withStyles(EmptyStateIllustration, styles));
