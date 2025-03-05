import React from 'react';
import PropTypes from 'prop-types';
import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapRow from '@capillarytech/cap-ui-library/CapRow';

import withEllipsis from 'hoc/withEllipsis';

const CapLabelEllipsis = withEllipsis(CapLabel);

export const SettingsColumnRowAttribute = ({ title, description, maxLength }) => (
  <CapRow className="settings-table-column-row-attribute-container">
    <CapLabelEllipsis
      className="row-attribute-title"
      text={title}
      maxLength={maxLength}
      type="label16"
    />
    {description && <CapLabelEllipsis text={description} maxLength={maxLength} />}
  </CapRow>
);

SettingsColumnRowAttribute.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  maxLength: PropTypes.number,
};

SettingsColumnRowAttribute.defaultProps = {
  title: '',
  description: '',
  maxLength: 20,
};

export default SettingsColumnRowAttribute;
