import { localStorageApi as utilsLocalStorageApi } from '@capillarytech/vulcan-react-sdk/utils';
import { call, put, takeLatest } from 'redux-saga/effects';

import * as Api from '../../../services/api';

import { actionTypes, getTopbarMenuDataValue, getSettingsMenuData } from './constants';
import { mockOrganizationData } from './tests/mockData';

function* switchOrgSuccess({ orgID }) {
  yield call(utilsLocalStorageApi.saveItem, 'orgID', orgID);
}

export function* getSidebarMenuData() {
  try {
    yield put({
      type: actionTypes.GET_SIDEBAR_MENU_DATA_SUCCESS,
      data: getSettingsMenuData(),
    });
  } catch (error) {
    yield put({ type: actionTypes.GET_SIDEBAR_MENU_DATA_FAILURE, error });
  }
}

function* getSupportedLocales() {
  try {
    const res = yield call(Api.getSupportedLocales);
    yield put({
      type: actionTypes.GET_SUPPORTED_LOCALES_SUCCESS,
      data: res,
    });
  } catch (error) {
    yield put({ type: actionTypes.GET_SUPPORTED_LOCALES_FAILURE, error });
  }
}

export function* getTopbarMenuData() {
  try {
    yield put({
      type: actionTypes.GET_TOPBAR_MENU_DATA_SUCCESS,
      data: getTopbarMenuDataValue(),
    });
  } catch (error) {
    yield put({ type: actionTypes.GET_TOPBAR_MENU_DATA_FAILURE, error });
  }
}

function* switchOrg({ orgID, successCallback }) {
  try {
    const res = yield call(Api.changeProxyOrg, orgID);
    if (res.success) yield put({ type: actionTypes.SWITCH_ORG_SUCCESS, orgID });
    if (successCallback) successCallback();
  } catch (error) {
    yield put({ type: actionTypes.SWITCH_ORG_FAILURE, error });
  }
}

export function* fetchUserInfo({ callback }) {
  try {
    const result = yield call(Api.getUserData);
    if (result.success) {
      const { currentOrgDetails, user: userData, currentOrgId } = result?.result || {};
      if (
        !(
          currentOrgDetails?.basic_details?.base_language !== '' ||
          currentOrgDetails?.basic_details?.base_language === null
        )
      ) {
        currentOrgDetails.basic_details.base_language = 'en';
      }
      if (!(currentOrgDetails?.basic_details?.supported_languages?.length > 0)) {
        currentOrgDetails.basic_details.supported_languages = [
          {
            lang_id: 69,
            language: 'English',
            iso_code: 'en',
          },
        ];
      }

      yield call(utilsLocalStorageApi.saveItem, 'orgID', currentOrgId);
      yield call(utilsLocalStorageApi.saveItem, 'user', userData);

      yield put({
        type: actionTypes.GET_USER_DATA_SUCCESS,
        userData,
        currentOrgId,
        currentOrgDetails,
      });
      if (callback) {
        callback(userData);
      }
    } else {
      yield put({
        type: actionTypes.GET_USER_DATA_FAILURE,
        error: result?.message?.message,
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_USER_DATA_FAILURE,
      error,
    });
  }
}

//@TODO cleanup once the node API endPoint is ready
// Simulated API Call Function
export const getOrganizationDataAPI = async () => {
  return Promise.resolve(mockOrganizationData);
};

export function* getOrganizationData() {
  try {
    const result = yield call(getOrganizationDataAPI);
    console.log({ result });

    if (result?.response?.status?.code === 200) {
      yield put({
        type: actionTypes.GET_ORG_DETAILS_SUCCESS,
        data: result?.response?.organization,
      });
    } else {
      yield put({
        type: actionTypes.GET_ORG_DETAILS_FAILURE,
        error: 'Failed to fetch organization data',
      });
    }
  } catch (error) {
    yield put({
      type: actionTypes.GET_ORG_DETAILS_FAILURE,
      error: 'Failed to fetch organization data',
    });
  }
}

function* watchForFetchUserInfo() {
  yield takeLatest(actionTypes.GET_USER_DATA_REQUEST, fetchUserInfo);
}

export function* watchGetSidebarMenuData() {
  yield takeLatest(actionTypes.GET_SIDEBAR_MENU_DATA_REQUEST, getSidebarMenuData);
}

export function* watchGetTopbarMenuData() {
  yield takeLatest(actionTypes.GET_TOPBAR_MENU_DATA_REQUEST, getTopbarMenuData);
}

function* watchForOrgChange() {
  yield takeLatest(actionTypes.SWITCH_ORG_REQUEST, switchOrg);
}

function* watchForOrgChangeSuccess() {
  yield takeLatest(actionTypes.SWITCH_ORG_SUCCESS, switchOrgSuccess);
}

function* watchForGetSupportedLocales() {
  yield takeLatest(actionTypes.GET_SUPPORTED_LOCALES_REQUEST, getSupportedLocales);
}

export function* watchForGetOrganizationData() {
  yield takeLatest(actionTypes.GET_ORG_DETAILS_REQUEST, getOrganizationData);
}

export default [
  watchGetSidebarMenuData,
  watchGetTopbarMenuData,
  watchForOrgChange,
  watchForFetchUserInfo,
  watchForOrgChangeSuccess,
  watchForGetSupportedLocales,
  watchForGetOrganizationData,
];
