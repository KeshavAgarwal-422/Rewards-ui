export const REQUEST = 'REQUEST';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const NATIVE = 'native';
export const GLOBAL = 'global';
export const EXTERNAL = 'external';

export const GTM_EVENTS = {
  USER_AUTHENTICATED: 'userAuthenticated',
};

export const ENABLE_REWARDS_CATALOG = 'ENABLE_REWARDS_CATALOG';

export const SCOPE = {
  REWARD: 'REWARD',
  ISSUE_REWARD: 'ISSUE_REWARD',
  CATALOGUE_PROMOTION: 'CATALOGUE_PROMOTION',
};

export const CUSTOM_FIELD_DATA_TYPES = {
  STRING: 'STRING',
  INTEGER: 'INTEGER',
  BOOLEAN: 'BOOLEAN',
  DATE: 'DATE',
  ENUM: 'ENUM',
};

export const DEFAULT_DATE_FORMAT = 'DD MMM YYYY';
export const DEFAULT_TIME_FORMAT = 'hh:mm A';
export const DEFAULT_DATE_TIME_FORMAT = [DEFAULT_DATE_FORMAT, DEFAULT_TIME_FORMAT].join(' ');
export const DEFAULT_UTC_TZ_FORMAT = 'YYYY-MM-DDTHH:mm:ss[Z]';
