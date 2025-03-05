import React from 'react';
import moment from 'moment-timezone';
import CapRow from '@capillarytech/cap-ui-library/CapRow';

import messages from './messages';

import globalMessages from '../Cap/messages';
import { getColumnAttribute } from '../RewardsCatalogSettings/helpers';
import SettingsQuickActions from '../../molecules/SettingsQuickActions';
import { CUSTOM_FIELD_DATA_TYPES, DEFAULT_DATE_TIME_FORMAT, SCOPE } from '../App/constants';
import SettingsColumnRowAttribute from '../../atoms/SettingsColumnRowAttribute';
import CustomFieldsScopeFilterOption from '../../atoms/CustomFieldsScopeFilterOption';
import { CustomFieldsSettingsMode } from './constant';
import LastUpdatedOnFilter from '../../atoms/LastUpdatedOnFilter';

export const getScopeFilterOptions = (isCatalogPromotionDisabled = false) => [
  {
    label: <CustomFieldsScopeFilterOption scope={SCOPE.REWARD} />,
    value: SCOPE.REWARD,
    key: SCOPE.REWARD,
  },
  {
    label: <CustomFieldsScopeFilterOption scope={SCOPE.ISSUE_REWARD} />,
    value: SCOPE.ISSUE_REWARD,
    key: SCOPE.ISSUE_REWARD,
  },
  {
    label: (
      <CustomFieldsScopeFilterOption
        scope={SCOPE.ISSUE_REWARD}
        isCatalogPromotionDisabled={isCatalogPromotionDisabled}
      />
    ),
    value: SCOPE.CATALOGUE_PROMOTION,
    key: SCOPE.CATALOGUE_PROMOTION,
    disabled: isCatalogPromotionDisabled,
  },
];

export const getCustomFieldsListingTableColumns = (
  formatMessage,
  applySorting,
  handleApplySort,
) => {
  return [
    getColumnAttribute(
      'name',
      '23.55%',
      formatMessage(globalMessages.name),
      formatMessage(globalMessages.dataType),
    ),
    getColumnAttribute('mandatory', '10.87%', formatMessage(globalMessages.mandatory)),
    getColumnAttribute('scope', '16.49%', formatMessage(globalMessages.scope)),
    getColumnAttribute('defaultValue', '22.63%', formatMessage(globalMessages.defaultValue)),
    getColumnAttribute(
      'lastUpdatedOn',
      '16.49%',
      <CapRow type="flex" align="middle">
        {formatMessage(globalMessages.lastUpdatedOn)}
        <LastUpdatedOnFilter isDescending={applySorting} handleOnFilterClick={handleApplySort} />
      </CapRow>,
      formatMessage(globalMessages.updatedBy),
    ),
    {
      dataIndex: 'quickActions',
      key: 'quickActions',
      width: '9.96%',
    },
  ];
};

export const getCustomFieldsListingTableRows = (
  formatMessage,
  allCustomFields = [],
  setMode,
) => {
  return allCustomFields?.map((customField) => {
    return {
      id: `rowId_${customField?.id}`,
      key: customField?.id,
      name: (
        <SettingsColumnRowAttribute
          title={customField?.name}
          description={formatMessage(globalMessages.dataTypes, { dataType: customField?.dataType })}
          maxLength={30}
        />
      ),
      mandatory: (
        <SettingsColumnRowAttribute
          title={formatMessage(messages.mandatoryRowLabel, {
            isMandatory: customField?.isMandatory,
          })}
        />
      ),
      scope: (
        <SettingsColumnRowAttribute
          title={formatMessage(messages.scopeFilterOptionsTitle, { scope: customField?.scope })}
          maxLength={40}
        />
      ),
      defaultValue: (
        <SettingsColumnRowAttribute
          title={formatMessage(messages.defaultValueRowLabel, {
            isDefaultValueDefined: !!customField?.defaultValue,
            defaultValue: customField?.defaultValue,
          })}
          maxLength={30}
        />
      ),
      lastUpdatedOn: (
        <SettingsColumnRowAttribute
          title={moment(customField?.lastUpdatedOn).format(DEFAULT_DATE_TIME_FORMAT)}
          description={customField?.lastUpdatedBy}
        />
      ),
      quickActions: (
        <SettingsQuickActions
          handleOnEditClick={() => setMode(CustomFieldsSettingsMode.EDIT)}
          handleOnDeleteClick={() => setMode(CustomFieldsSettingsMode.DELETE)}
        />
      ),
    };
  });
};

export const getDataTypeSelectionOptions = (formatMessage) => [
  {
    label: formatMessage(globalMessages.boolean),
    value: CUSTOM_FIELD_DATA_TYPES.BOOLEAN,
    key: CUSTOM_FIELD_DATA_TYPES.BOOLEAN,
  },
  {
    label: formatMessage(globalMessages.dateAndTime),
    value: CUSTOM_FIELD_DATA_TYPES.DATE,
    key: CUSTOM_FIELD_DATA_TYPES.DATE,
  },
  {
    label: formatMessage(globalMessages.enum),
    value: CUSTOM_FIELD_DATA_TYPES.ENUM,
    key: CUSTOM_FIELD_DATA_TYPES.ENUM,
  },
  {
    label: formatMessage(globalMessages.number),
    value: CUSTOM_FIELD_DATA_TYPES.INTEGER,
    key: CUSTOM_FIELD_DATA_TYPES.INTEGER,
  },
  {
    label: formatMessage(globalMessages.string),
    value: CUSTOM_FIELD_DATA_TYPES.STRING,
    key: CUSTOM_FIELD_DATA_TYPES.STRING,
  },
];
