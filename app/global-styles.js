import * as styledVars from '@capillarytech/cap-ui-library/styled/variables';
import { createGlobalStyle } from 'styled-components';

const {
  CAP_SPACE_04,
  CAP_SPACE_16,
  CAP_SPACE_24,
  CAP_SPACE_48,
  CAP_SPACE_40,
  FONT_COLOR_01,
  FONT_COLOR_04,
  CAP_SPACE_08,
  FONT_SIZE_M,
  FONT_SIZE_S,
  CAP_RED02,
  CAP_G07,
  CAP_G06,
} = styledVars;

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
    font-family: 'Roboto', Arial, sans-serif;
    font-size: 14px;
    line-height: unset;
  }

  body.fontLoaded {
    font-family: 'Roboto', Arial, sans-serif;
  }

  #rewards-catalog-container {
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: 'Roboto', Arial, sans-serif;
    line-height: 1.5em;
  }

  .rewards-catalog-body {
    .ant-popover,
    .ant-select-dropdown,
    .ant-select-dropdown.ant-select-dropdown--single,
    .ant-calendar-picker-container,
    .ant-notification,
    .ant-tooltip,
    .ant-modal-mask,
    .ant-modal-wrap {
      z-index: 10003; /* setting z-index, to be able to show the contect on top of slidebox */
    }
  }
  
  
  ul, ol {
    list-style: none;
    padding: 0;
  }

  .pointer-cursor {
    cursor: pointer;
  }

  .truncate-text {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;
  }

  .align-items-center, div.align-items-center {
    display: flex;
    align-items: center;
  }

  .slide-box-size-medium{
    width: 660px;
  }

  // For Loadable Spin
  &.ant-spin.ant-spin-spinning {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50%;
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
  }

  // temp fix
  // Need to handle in cap-react-ui-library
  .ant-input-affix-wrapper .ant-input {
    height: ${CAP_SPACE_40};
    border: 1px solid ${FONT_COLOR_04} !important;
    border-radius: ${CAP_SPACE_04} !important;
    font-size: ${FONT_SIZE_M} !important;
    &:focus, &:hover {
      border-color: ${FONT_COLOR_01}!important;
    }
  }

  .disabled-icon{
    color: ${CAP_G07} !important;
  }

  .error-label {
    font-size: ${FONT_SIZE_S} !important;
    color: ${CAP_RED02} !important;
    margin-top: ${CAP_SPACE_04} !important;
  }

  .text-area-error{
    textarea{
      border-color: ${CAP_RED02} !important;
    }
  }

  .input-error {
    .ant-input{
      border-color: ${CAP_RED02} !important;
    }
    svg {
      color: ${CAP_RED02} !important;
    }
  }

  .optional-label {
    margin-left: ${CAP_SPACE_08};
    font-size: ${FONT_SIZE_M};
    color: ${CAP_G06} !important;
  }

  .settings-ui-container{
    padding: ${CAP_SPACE_16} ${CAP_SPACE_48} ${CAP_SPACE_24} ${CAP_SPACE_48};
  }

  .settings-ui-slide-box {
    .cap-slide-box-v2-container{
      width: 31.429rem !important;
      max-width: unset !important;
      .slidebox-content-container{
        padding-inline: ${CAP_SPACE_48} !important;
        .cap-select-v2{
          width: 100%;
        }
      }
      .slidebox-footer {
        padding-inline: ${CAP_SPACE_48} !important;
        button:first-of-type {
          margin-right: ${CAP_SPACE_16};
        }
      }
    }
  }

  .settings-table-column-header-attribute-container {
    margin: -0.429rem 0 -0.357rem 0;
    .cap-header-v2-title{
      margin-bottom: ${CAP_SPACE_08};
    }
  }
  
  .settings-table-column-row-attribute-container{
    margin-bottom: -0.357rem;
    .row-attribute-title{
      margin-bottom: ${CAP_SPACE_08};
    }
  }

  .settings-view-label-value-container{
    .settings-view-label{
      margin-bottom: ${CAP_SPACE_04};
    }
    .settings-view-value{
      margin-bottom: ${CAP_SPACE_16};
    }
  }

  .settings-create-edit-popover {
    max-width: 27.428rem !important;
    .ant-popover-inner-content {
      padding: ${CAP_SPACE_24};
    }
  }
`;

export default GlobalStyle;
