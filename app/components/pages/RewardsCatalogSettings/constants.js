import CustomFieldsListing from '../CustomFieldsSettings';

export const DEFAULT_CATEGORIES_SETTINGS_PATH = '/settings/categories';
export const DEFAULT_SETTINGS_PATH = '/rewards-catalog/ui/settings';

export const routeParamList = [
  {
    key: 'categories',
    path: 'categories',
    component: CustomFieldsListing,
    heading: 'Categories',
  },
  {
    key: 'currencyPartners',
    path: 'currency-partners',
    component: CustomFieldsListing,
    heading: 'Currency Partners',
  },
  {
    key: 'customFields',
    path: 'custom-fields',
    component: CustomFieldsListing,
    heading: 'Custom Fields',
  },
  {
    key: 'eventNotification',
    path: 'event-notification',
    component: CustomFieldsListing,
    heading: 'Event Notification',
  },
  {
    key: 'fulfillmentStatus',
    path: 'fulfillment-status',
    component: CustomFieldsListing,
    heading: 'Fulfillment Status',
  },
  {
    key: 'geography',
    path: 'geography',
    component: CustomFieldsListing,
    heading: 'Geography',
  },
  {
    key: 'groups',
    path: 'groups',
    component: CustomFieldsListing,
    heading: 'Groups',
  },
  {
    key: 'languages',
    path: 'languages',
    component: CustomFieldsListing,
    heading: 'Languages',
  },
  {
    key: 'redemptionLimit',
    path: 'redemption-limit',
    component: CustomFieldsListing,
    heading: 'Redemption Limit',
  },
];
