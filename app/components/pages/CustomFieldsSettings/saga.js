import { call, put, takeLatest, all, select } from 'redux-saga/effects';

import CapNotification from '@capillarytech/cap-ui-library/CapNotification';

import * as Api from '../../../services/api';

import * as constants from './constant';
import { generateCustomFieldPayload } from './utils';

export function* getAllCustomFields() {
  try {
    const apiResponse = yield call(Api.getAllCustomFields);
    if (Api.checkIncentivesRewardsApiSuccess(apiResponse)) {
      const allCustomFields = apiResponse?.result?.data;
      yield put({
        type: constants.GET_ALL_CUSTOM_FIELDS_SUCCESS,
        payload: allCustomFields,
      });
    } else {
      yield put({
        type: constants.GET_ALL_CUSTOM_FIELDS_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: constants.GET_ALL_CUSTOM_FIELDS_FAILURE,
      error: error,
    });
  }
}

export function* createCustomField() {
  const state = yield select();
  const customFieldsState = state?.toJS()[constants.customFieldSettingsReduxKey];

  try {
    const apiResponse = yield call(
      Api.createCustomField,
      generateCustomFieldPayload(customFieldsState),
    );
    if (Api.checkIncentivesRewardsApiSuccess(apiResponse)) {
      yield all([
        put({ type: constants.CREATE_CUSTOM_FIELD_SUCCESS }),
        put({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST }),
        put({ type: constants.CLEAR_DATA }),
      ]);
      yield call(CapNotification.success, {
        message: apiResponse?.result,
      });
    } else {
      if (apiResponse?.status === 409) {
        yield put({
          type: constants.DUPLICATE_NAME_ERROR,
          payload: {
            showError: true,
            errorMessage: apiResponse?.result,
          },
        });
      }
      yield put({
        type: constants.CREATE_CUSTOM_FIELD_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: constants.CREATE_CUSTOM_FIELD_FAILURE,
      error: error,
    });
  }
}

export function* updateCustomField() {
  const state = yield select();
  const customFieldsState = state?.toJS()[constants.customFieldSettingsReduxKey];
  const { mode, customFieldId } = customFieldsState;

  try {
    const apiResponse = yield call(
      Api.updateCustomField,
      customFieldId,
      generateCustomFieldPayload(customFieldsState),
    );
    if (Api.checkIncentivesRewardsApiSuccess(apiResponse)) {
      yield all([
        put({ type: constants.UPDATE_CUSTOM_FIELD_SUCCESS }),
        put({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST }),
        put({ type: constants.CLEAR_DATA }),
      ]);
      yield call(CapNotification.success, {
        message:
          mode === constants.CustomFieldsSettingsMode.DELETE
            ? apiResponse?.result?.replace('updated', 'deleted')
            : apiResponse?.result,
      });
    } else {
      if (apiResponse?.status === 409) {
        yield put({
          type: constants.DUPLICATE_NAME_ERROR,
          payload: {
            showError: true,
            errorMessage: apiResponse?.result,
          },
        });
      }
      yield put({
        type: constants.UPDATE_CUSTOM_FIELD_FAILURE,
      });
    }
  } catch (error) {
    yield put({
      type: constants.UPDATE_CUSTOM_FIELD_FAILURE,
      error: error,
    });
  }
}

export function* watchForGetAllCustomFields() {
  yield takeLatest(constants.GET_ALL_CUSTOM_FIELDS_REQUEST, getAllCustomFields);
}

export function* watchForCreateCustomField() {
  yield takeLatest(constants.CREATE_CUSTOM_FIELD_REQUEST, createCustomField);
}

export function* watchForUpdateCustomField() {
  yield takeLatest(constants.UPDATE_CUSTOM_FIELD_REQUEST, updateCustomField);
}

export default function* () {
  yield all([
    watchForGetAllCustomFields(),
    watchForCreateCustomField(),
    watchForUpdateCustomField(),
  ]);
}
