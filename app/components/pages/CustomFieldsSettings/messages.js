import { defineMessages } from 'react-intl';

export const customFieldsIntlScope = 'app.components.organisms.CustomFieldsSettings';

export default defineMessages({
  getAllCustomFieldsFailure: {
    id: `${customFieldsIntlScope}.getAllCustomFieldsFailure`,
    defaultMessage: 'Failed to fetch custom fields. Please try again later',
  },
  searchFilterPlaceholder: {
    id: `${customFieldsIntlScope}.searchFilterPlaceholder`,
    defaultMessage: 'Search custom field by name',
  },
  scopeFilterOptionsTitle: {
    id: `${customFieldsIntlScope}.scopeFilterOptions`,
    defaultMessage: `{scope, select,
    REWARD {Catalog item creation}
    ISSUE_REWARD {Catalog item issual}
    CATALOGUE_PROMOTION {Catalog promotion}
    other {''}
    }`,
  },
  scopeFilterOptionsTooltipInfo: {
    id: `${customFieldsIntlScope}.scopeFilterOptionsTooltipInfo`,
    defaultMessage: `{scope, select,
    REWARD {To be provided by design}
    ISSUE_REWARD {To be provided by design}
    CATALOGUE_PROMOTION {To be provided by design}
    other {''}
    }`,
  },
  mandatoryRowLabel: {
    id: `${customFieldsIntlScope}.mandatoryRowLabel`,
    defaultMessage: `{isMandatory, select,
    true {Yes}
    other {No}
    }`,
  },
  defaultValueRowLabel: {
    id: `${customFieldsIntlScope}.defaultValueRowLabel`,
    defaultMessage: `{isDefaultValueDefined, select,
    true {{defaultValue}}
    other {-}
    }`,
  },
  customFieldsListingDescription: {
    id: `${customFieldsIntlScope}.customFieldsListingDescription`,
    defaultMessage: 'Add metadata fields for your catalog items',
  },
  customFieldSlideBoxHeader: {
    id: `${customFieldsIntlScope}.customFieldSlideBoxHeader`,
    defaultMessage: `{mode, select,
    CREATE {New custom field}
    EDIT {Edit custom field}
    VIEW {View custom field}
    other {''}
    }`,
  },
  scopeDescription: {
    id: `${customFieldsIntlScope}.scopeDescription`,
    defaultMessage: 'This custom field can only be used in the selected scope',
  },
  selectDataType: {
    id: `${customFieldsIntlScope}.selectDataType`,
    defaultMessage: 'Select data type',
  },
  selectScope: {
    id: `${customFieldsIntlScope}.selectScope`,
    defaultMessage: 'Select scope',
  },
  isCustomFieldMandatory: {
    id: `${customFieldsIntlScope}.isCustomFieldMandatory`,
    defaultMessage: 'Is this custom field mandatory?',
  },
  defaultValueDescription: {
    id: `${customFieldsIntlScope}.defaultValueDescription`,
    defaultMessage: 'It will be used as the pre-defined value of this custom field',
  },
  secondaryFooterCta: {
    id: `${customFieldsIntlScope}.secondaryFooterCta`,
    defaultMessage: `{mode, select,
    CREATE {Cancel}
    EDIT {Cancel}
    VIEW {Edit custom field}
    other {''}
    }`,
  },
  enumValueLengthError: {
    id: `${customFieldsIntlScope}.enumValueLengthError`,
    defaultMessage: 'The pre-defined value cannot be more than 80 characters',
  },
  enumValuesLengthError: {
    id: `${customFieldsIntlScope}.enumValuesLengthError`,
    defaultMessage: 'Total no. of pre-defined values values cannot be more than 30',
  },
  defaultValueStringError: {
    id: `${customFieldsIntlScope}.defaultValueStringError`,
    defaultMessage: 'The default value cannot be more than 255 characters',
  },
  deletePreDefinedValues: {
    id: `${customFieldsIntlScope}.deletePreDefinedValues`,
    defaultMessage: 'Delete pre-defined value?',
  },
  deletePreDefinedValuesDesc: {
    id: `${customFieldsIntlScope}.deletePreDefinedValuesDesc`,
    defaultMessage: `Are you sure you want to delete “{enumValue}”?`,
  },
  deleteCustomField: {
    id: `${customFieldsIntlScope}.deleteCustomField`,
    defaultMessage: `Delete “{customFieldName}” custom field?`,
  },
  deleteCustomFieldDesc: {
    id: `${customFieldsIntlScope}.deleteCustomFieldDesc`,
    defaultMessage:
      'This action is irreversible and it will unlink the custom field from all the associated entities where it is being used.',
  },
  deleteCustomFieldSubDesc: {
    id: `${customFieldsIntlScope}.deleteCustomFieldSubDesc`,
    defaultMessage: 'Are you sure you want to delete it?',
  },
  preDefinedEnumValues: {
    id: `${customFieldsIntlScope}.preDefinedEnumValues`,
    defaultMessage: `{firstValue} +{moreValuesCount} more`,
  },
  discardCustomFieldsTitle: {
    id: `${customFieldsIntlScope}.discardCustomFieldsTitle`,
    defaultMessage: 'Discard unsaved custom field?',
  },
  discardCustomFieldsDesc: {
    id: `${customFieldsIntlScope}.discardCustomFieldsDesc`,
    defaultMessage: 'Are you sure you want to discard the configuration for new custom field?',
  },
  mandatoryToggleOffInfoNote: {
    id: `${customFieldsIntlScope}.mandatoryToggleOffInfoNote`,
    defaultMessage:
      'Changing mandatory custom field to non-mandatory will unlink it from all the associated entities where it is being used.',
  },
});
