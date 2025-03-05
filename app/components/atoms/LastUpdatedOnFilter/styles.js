import { css } from 'styled-components';
import {
  CAP_G06,
  CAP_BLACK,
  CAP_SPACE_02,
  CAP_SPACE_08,
} from '@capillarytech/cap-ui-library/styled/variables';

export default css`
  .last-updated-on-filter {
    display: flex;
    flex-direction: column;
    cursor: pointer;
    margin-left: ${CAP_SPACE_08};
    .caret-up,
    .caret-down {
      color: ${CAP_G06};
    }
    .caret-up {
      margin-bottom: -${CAP_SPACE_02};
    }
    .caret-down {
      margin-top: -${CAP_SPACE_02};
    }
    .sort-active {
      color: ${CAP_BLACK};
    }
  }
`;
