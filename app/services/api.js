import CapNotification from '@capillarytech/cap-ui-library/CapNotification';
import { apiCaller } from '@capillarytech/vulcan-react-sdk/utils';
import isEmpty from 'lodash/isEmpty';

import { i18n, appType, appName } from '../../app-config';
import { IS_PROD } from '../config/constants';
import endpoints from '../config/endpoints';
import { loginPageUrl } from '../config/path';

import * as requestConstructor from './requestConstructor';

const { getAryaAPICallObject, getAPICallObject } = requestConstructor;

import translations from '../translations/en.json';

export const checkIncentivesRewardsApiSuccess = (apiResponse = {}) => {
  return apiResponse?.status === 200 && apiResponse?.success;
};

function redirectIfUnauthenticated(response) {
  const { removeAuthenticationDetais } = require('../utils/authWrapper');
  const isUnauthorized = response.status === 401;
  const isLoginPage = window.location.pathname.indexOf('/login') !== -1;
  const isAryaAuthUserCall =
    response.url.split('auth')[1] && response.url.split('auth')[1].split('?')[0] === '/user';
  const isAuthUserCall =
    response.url.split('/api/v1')[1] &&
    response.url.split('/api/v1')[1].split('?')[0] === '/authenticate';
  if (isUnauthorized) {
    if (IS_PROD) {
      removeAuthenticationDetais();
      const isEmbedded =
        appType !== 'external' && localStorage.getItem(`${appName}__isStandalone`) !== 'true';
      if (isEmbedded) {
        window.location.href = loginPageUrl();
      }
    } else {
      if (isLoginPage && (isAuthUserCall || isAryaAuthUserCall)) return;
      removeAuthenticationDetais();
    }
  }
}

const prepareVulcanSuccessResponseStructure = (result) => ({
  result,
  success: true,
  status: 200,
});

//avoid this for all incentives api calls
const httpRequest = apiCaller.initializeApiCaller({
  redirectIfUnauthenticated,
  sendVulcanMetricHeaders: true, // config to capture metrics for all calls made, always send this as true
  // skipTimestampQuery: false, // config to skip timestamp query for all, do for individual api calls where required
  // skipRedirectIfUnauthenticated: false, // config to skip the redirection on 401
  // timeout: 60000, // config to set timeout for all api calls, default 1 min, increase if required
  // hideAllErrors: false, // config to hide all errors from api calls, do for individual api calls where required
  // skipParsingJson: false, // config to skip parsing json for all api calls, do for individual api calls where required
  // useResponseCompression: false, // config to use response compression for all api calls, do for individual api calls where required
});

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (
    (response.status >= 200 && response.status < 300) ||
    response.status === 500 ||
    response.status === 400 ||
    response.status === 403 ||
    response.status === 409
  ) {
    return response;
  }

  redirectIfUnauthenticated(response);
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function fetchWithTimeout(ms, promise) {
  //https://github.com/github/fetch/issues/175#issuecomment-125779262
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      reject({
        message: 'Request timeout',
        errorLocation: window.location.href,
      });
    }, ms);
    promise.then(resolve, reject);
  });
}

function showError(error, status) {
  const capNotificationSeverityType =
    status / 100 === 4 ? CapNotification.info : CapNotification.error;
  let message = error?.message || error?.result;
  if (typeof error.message === 'object') {
    message = error?.message?.errorMessage;
  } else if (typeof error.result === 'object') {
    message = error?.result?.message || error?.result?.errorMessage?.status?.message;
    if (error?.result?.errorMessage?.errors?.[0]?.message)
      message = error.result.errorMessage.errors[0].message;
  }

  message = message || 'An error occurred with the API';

  capNotificationSeverityType({
    message,
  });
}

function checkStatusCode(res) {
  if (res && res.code) {
    return /^[4-5][0-9][0-9]$/.test(res.code);
  }
  return false;
}

//use this for all incentives api calls
function request(url, options, timeout = 50000) {
  const fetchUrl =
    url.indexOf('?') !== -1 ? `${url}&time=${Date.now()}` : `${url}?time=${Date.now()}`;
  try {
    return fetchWithTimeout(timeout, fetch(fetchUrl, options))
      .then(checkStatus)
      .then(parseJSON)
      .then((res) => {
        if (
          !isEmpty(res?.errors) ||
          checkStatusCode(res) ||
          (res.success !== undefined && !res?.success)
        ) {
          showError(res, res.status);
        }
        return res;
      })
      .catch((error) => {
        if (error) {
          showError(error);
        }
        return error;
      });
  } catch (err) {
    if (err) {
      showError(err);
    }
    return err;
  }
}

export const getLocizeMessage = async (locale) => {
  const response = await Promise.all(
    (i18n?.appNames ?? []).map((appName, idx) => {
      const url = `${endpoints.arya_endpoint}/translations/${appName}/${locale}${
        idx !== 0 ? `?skipCommonTranslations=true` : ''
      }`;
      return httpRequest(url, getAryaAPICallObject('GET'));
    }),
  );
  const result = response.reduce(
    (acc, item) => ({
      ...acc,
      ...item,
    }),
    {},
  );
  return prepareVulcanSuccessResponseStructure(translations);
};

export const appendQueryParams = (baseUrl = '', params = {}) => {
  try {
    const [urlWithoutQuery, existingQuery] = baseUrl.split('?');
    let queryString = existingQuery ? existingQuery : '';
    const newParams = Object.entries(params)
      ?.filter(([_, value]) => value !== undefined && value !== null && value !== '')
      ?.map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      ?.join('&');

    if (queryString && newParams) {
      queryString += '&' + newParams;
    } else if (newParams) {
      queryString = newParams;
    }

    return queryString ? `${urlWithoutQuery}?${queryString}` : urlWithoutQuery;
  } catch (error) {
    console.error('Error in appendQueryParams:', error);
    return baseUrl;
  }
};

export const getSupportedLocales = () => {
  const url = `${endpoints.arya_endpoint}/translations/supportedLocales`;
  return httpRequest(url, getAryaAPICallObject('GET'));
};

export const logout = () => {
  const url = `${endpoints.arya_endpoint}/auth/logout`;
  return httpRequest(url, getAryaAPICallObject('GET'));
};

export const changeProxyOrg = (orgId) => {
  const url = `${endpoints.arya_endpoint}/auth/setProxy/${orgId}`;
  return httpRequest(url, getAryaAPICallObject('Post'));
};

export const getUserData = async () => {
  const url = `${endpoints.arya_endpoint}/auth/user`;
  const result = await httpRequest(url, getAryaAPICallObject('GET'));
  return prepareVulcanSuccessResponseStructure(result);
};

export const getAllCustomFields = async () => {
  const url = `${endpoints.incentives_rewards_endpoint}/settings/custom-fields`;
  return request(url, getAPICallObject('GET'));
};

export const createCustomField = async (payload) => {
  const url = `${endpoints.incentives_rewards_endpoint}/settings/custom-fields`;
  return request(url, getAPICallObject('POST', payload));
};

export const updateCustomField = async (customFieldId, payload) => {
  const url = `${endpoints.incentives_rewards_endpoint}/settings/custom-fields/${customFieldId}`;
  return request(url, getAPICallObject('PUT', payload));
};
