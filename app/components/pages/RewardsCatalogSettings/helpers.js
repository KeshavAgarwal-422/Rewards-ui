import React from 'react';

import CapHeader from '@capillarytech/cap-ui-library/CapHeader';
import CapRow from '@capillarytech/cap-ui-library/CapRow';

export const getColumnAttribute = (key = '', width = 'auto', title = '', description = '') => ({
  dataIndex: key,
  key: key,
  width: width,
  title: (
    <CapRow className="settings-table-column-header-attribute-container">
      <CapHeader size="small" title={title} description={description} />
    </CapRow>
  ),
});
