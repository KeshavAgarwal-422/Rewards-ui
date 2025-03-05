import { css } from 'styled-components';

import {
  CAP_SPACE_04,
  CAP_SPACE_08,
  CAP_SPACE_12,
  CAP_SPACE_16,
  CAP_BLACK,
} from '@capillarytech/cap-ui-library/styled/variables';

import {
  customFieldsSettingsListingPrefix,
  customFieldsSettingsViewPrefix,
  customFieldsSettingsCreatePrefix,
} from './constant';

export default css`
  .${customFieldsSettingsListingPrefix}-filters {
    margin: ${CAP_SPACE_16} 0;

    .${customFieldsSettingsListingPrefix}-filters-search {
      width: 23.143rem;
      margin-right: ${CAP_SPACE_12};
    }

    .${customFieldsSettingsListingPrefix}-filters-scope-tag {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      margin-top: ${CAP_SPACE_12};

      .${customFieldsSettingsListingPrefix}-filters-scope-tag-clear-all {
        margin-left: auto;
      }
    }
  }

  .quick-actions-container {
    display: none;
  }

  .hovered-row .quick-actions-container {
    display: flex;
  }

  .${customFieldsSettingsCreatePrefix}-content {
    .${customFieldsSettingsCreatePrefix}-scope-label,
      .${customFieldsSettingsCreatePrefix}-default-value-label {
      margin-top: ${CAP_SPACE_04} !important;
    }

    .${customFieldsSettingsCreatePrefix}-name-input,
      .${customFieldsSettingsCreatePrefix}-scope-select,
      .${customFieldsSettingsCreatePrefix}-data-type-select,
      .${customFieldsSettingsCreatePrefix}-enum-values-tag-dropdown,
      .${customFieldsSettingsCreatePrefix}-is-mandatory-row,
      .${customFieldsSettingsCreatePrefix}-content-box {
      margin-bottom: ${CAP_SPACE_16};
      margin-top: ${CAP_SPACE_08};
    }

    .${customFieldsSettingsCreatePrefix}-is-mandatory-row {
      margin-bottom: ${CAP_SPACE_16};
    }

    .${customFieldsSettingsCreatePrefix}-enum-values-tag-dropdown {
      width: 24.571rem;
    }

    .${customFieldsSettingsCreatePrefix}-scope-select .ant-select-selection-selected-value {
      margin-top: 0.714rem;
    }

    .${customFieldsSettingsCreatePrefix}-default-value-container {
      margin-top: ${CAP_SPACE_08};
      .reset-icon {
        color: ${CAP_BLACK};
        svg {
          height: ${CAP_SPACE_16};
          width: ${CAP_SPACE_16};
        }
      }
      .${customFieldsSettingsCreatePrefix}-default-value-enum .cap-select-v2 {
        width: 22.714rem !important;
      }

      .${customFieldsSettingsCreatePrefix}-default-value-date-picker,
        .${customFieldsSettingsCreatePrefix}-default-value-time-picker {
        width: 11.071rem;

        .ant-calendar-picker-clear,
        .ant-time-picker-clear {
          color: ${CAP_BLACK};
        }

        .ant-calendar-picker-clear:hover,
        .ant-time-picker-clear:hover {
          color: ${CAP_BLACK};
        }
      }

      .${customFieldsSettingsCreatePrefix}-default-value-time-picker {
        margin-left: ${CAP_SPACE_08};
        svg {
          height: ${CAP_SPACE_16};
          width: ${CAP_SPACE_16};
        }
      }
    }

    .${customFieldsSettingsCreatePrefix}-mandatory-toggle-off-info-note {
      width: 24.571rem;
      margin-top: ${CAP_SPACE_16} !important;
      .note-text {
        max-width: 24.571rem;
        word-wrap: break-word;
        white-space: normal;
      }
    }
  }

  .${customFieldsSettingsViewPrefix}-content {
    .${customFieldsSettingsViewPrefix}-enum-values {
      margin-bottom: ${CAP_SPACE_16};
      .${customFieldsSettingsViewPrefix}-enum-value {
        margin-bottom: ${CAP_SPACE_04};
      }
    }
    .${customFieldsSettingsViewPrefix}-mandatory-switch {
      margin-bottom: ${CAP_SPACE_16};
    }
  }
`;
