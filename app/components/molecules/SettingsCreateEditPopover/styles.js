import {
  CAP_SPACE_08,
  CAP_SPACE_12,
  CAP_SPACE_24,
  CAP_RED02,
  CAP_SPACE_04,
  CAP_G01,
  CAP_G06,
} from '@capillarytech/cap-ui-library/styled/variables';
import { css } from 'styled-components';

export default css`
  .settings-create-edit-popover-container {
    width: 23.285rem;
    gap: ${CAP_SPACE_24};
    .settings-create-edit-popover-header {
      line-height: ${CAP_SPACE_24};
    }
    .settings-create-edit-popover-input-container {
      flex-direction: column;
      gap: ${CAP_SPACE_08};
      width: 23.285rem;
      .input-error .ant-input {
        border-color: ${CAP_RED02} !important;
      }
      .input-error .ant-input:focus,
      .input-error .ant-input:hover {
        border-color: ${CAP_RED02} !important;
      }
      .input-error {
        .anticon {
          color: ${CAP_RED02} !important;
        }
      }
      .settings-create-edit-popover-input-container-header {
        align-items: center;
        gap: ${CAP_SPACE_04};
        .settings-create-edit-popover-input-container-heading {
          color: ${CAP_G01};
        }
        .settings-create-edit-popover-input-container-subheading {
          color: ${CAP_G06};
        }
      }
    }
    .settings-create-edit-popover-confirmation-container {
      gap: ${CAP_SPACE_12};
    }
  }
`;
