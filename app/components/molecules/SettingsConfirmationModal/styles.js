import { css } from 'styled-components';

import { CAP_SPACE_08, CAP_SPACE_12 } from '@capillarytech/cap-ui-library/styled/variables';

export default css`
  &.settings-confirmation-modal {
    max-width: unset !important;

    .ant-modal-footer {
      margin: -0.429rem 0 0 ${CAP_SPACE_08};
    }

    .settings-confirmation-modal-title {
      margin-bottom: ${CAP_SPACE_12};
    }

    .settings-confirmation-modal-sub-description {
      margin-top: ${CAP_SPACE_08};
    }
  }
`;
