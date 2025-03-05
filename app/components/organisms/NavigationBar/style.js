import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import { css } from 'styled-components';

const { FONT_COLOR_04, CAP_SPACE_72 } = styledVars;

export default css`
  .navigation-setting-icon {
    color: ${FONT_COLOR_04};
  }
  .centered-div {
    margin: ${CAP_SPACE_72};
  }
  .rewards-catalog-settings-container {
    .cap-content-wrapper {
      overflow: unset !important;
      .cap-component-wrapper > div:first-of-type {
        overflow: unset !important;
      }
      .cap-sidebar-v2 {
        min-width: 17.143rem;
      }
    }
  }
`;
