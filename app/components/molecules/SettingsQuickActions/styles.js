import {
  CAP_SPACE_08,
  CAP_SPACE_20,
  CAP_G08,
  CAP_SPACE_32,
} from '@capillarytech/cap-ui-library/styled/variables';
import { css } from 'styled-components';

export default css`
  .quick-actions-container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${CAP_SPACE_08};
    .quick-actions-icon {
      width: ${CAP_SPACE_32};
      height: ${CAP_SPACE_32};
      text-align: center;
      border-radius: 50%;
      font-size: ${CAP_SPACE_20};
      padding: 0.429rem;
      gap: 0.714rem;
      &:hover {
        background-color: ${CAP_G08};
      }
    }
  }
`;
