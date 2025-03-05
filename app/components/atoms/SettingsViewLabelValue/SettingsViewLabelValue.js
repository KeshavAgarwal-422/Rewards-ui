import React from 'react';
import PropTypes from 'prop-types';

import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapRow from '@capillarytech/cap-ui-library/CapRow';

export const SettingsViewLabelValue = ({ label, value }) => (
  <CapRow className="settings-view-label-value-container">
    <CapLabel className="settings-view-label" type="label18">
      {label}
    </CapLabel>
    <CapLabel className="settings-view-value" type="label15">
      {value}
    </CapLabel>
  </CapRow>
);

SettingsViewLabelValue.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
};

SettingsViewLabelValue.defaultProps = {
  label: '',
  value: '',
};

export default SettingsViewLabelValue;
