import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';

import CapLabel from '@capillarytech/cap-ui-library/CapLabel';
import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';
import CapTooltipWithInfo from '@capillarytech/cap-ui-library/CapTooltipWithInfo';

import CustomFieldsMessages from '../../pages/CustomFieldsSettings/messages';
import globalMessages from '../../pages/Cap/messages';

export const CustomFieldsScopeFilterOption = ({
  intl: { formatMessage },
  scope,
  isCatalogPromotionDisabled,
}) => (
  <CapTooltip title={isCatalogPromotionDisabled && formatMessage(globalMessages.comingSoon)}>
    <CapRow type="flex" align="middle" justify="space-between">
      <CapLabel type="label15">
        {formatMessage(CustomFieldsMessages.scopeFilterOptionsTitle, {
          scope,
        })}
      </CapLabel>
      <CapTooltipWithInfo
        title={formatMessage(CustomFieldsMessages.scopeFilterOptionsTooltipInfo, {
          scope,
        })}
      />
    </CapRow>
  </CapTooltip>
);

CustomFieldsScopeFilterOption.propTypes = {
  intl: intlShape.isRequired,
  scope: PropTypes.string,
  isCatalogPromotionDisabled: PropTypes.bool,
};

CustomFieldsScopeFilterOption.defaultProps = {
  scope: '',
  isCatalogPromotionDisabled: false,
};

export default injectIntl(CustomFieldsScopeFilterOption);
