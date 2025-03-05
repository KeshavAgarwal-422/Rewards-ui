import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';

import CapNotification from '@capillarytech/cap-ui-library/CapNotification';
import * as Api from '../../../../services/api';
import * as constants from '../constant';
import { generateCustomFieldPayload } from '../utils';
import {
  getAllCustomFields,
  createCustomField,
  updateCustomField,
  watchForGetAllCustomFields,
  watchForCreateCustomField,
  watchForUpdateCustomField,
  default as rootSaga,
} from '../saga';

describe('CustomFieldsSettings Sagas', () => {
  const mockState = {
    toJS: () => ({
      [constants.customFieldSettingsReduxKey]: {
        mode: constants.CustomFieldsSettingsMode.EDIT,
        customFieldId: '123',
      },
    }),
  };

  describe('getAllCustomFields Saga', () => {
    it('should handle successful API response', () => {
      const mockResponse = {
        result: {
          data: ['field1', 'field2'],
        },
        success: true,
        status: 200,
      };

      return expectSaga(getAllCustomFields)
        .provide([
          [call(Api.getAllCustomFields), mockResponse],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .put({
          type: constants.GET_ALL_CUSTOM_FIELDS_SUCCESS,
          payload: mockResponse.result.data,
        })
        .run();
    });

    it('should handle API failure response', () => {
      const mockResponse = { success: false };

      return expectSaga(getAllCustomFields)
        .provide([
          [call(Api.getAllCustomFields), mockResponse],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), false],
        ])
        .put({ type: constants.GET_ALL_CUSTOM_FIELDS_FAILURE })
        .run();
    });

    it('should handle API error', () => {
      const error = new Error('API Error');

      return expectSaga(getAllCustomFields)
        .provide([[call(Api.getAllCustomFields), throwError(error)]])
        .put({
          type: constants.GET_ALL_CUSTOM_FIELDS_FAILURE,
          error: error,
        })
        .run();
    });
  });

  describe('createCustomField Saga', () => {
    it('should handle successful creation', () => {
      const mockResponse = {
        result: 'Custom field created successfully',
        success: true,
        status: 200,
      };

      return expectSaga(createCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.createCustomField,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .put({ type: constants.CREATE_CUSTOM_FIELD_SUCCESS })
        .put({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST })
        .put({ type: constants.CLEAR_DATA })
        .call(CapNotification.success, { message: mockResponse.result })
        .run();
    });

    it('should handle duplicate name error', () => {
      const mockResponse = {
        status: 409,
        result: 'Duplicate name error',
      };

      return expectSaga(createCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.createCustomField,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          {
            call: ([fn, arg]) => {
              if (fn === Api.checkIncentivesRewardsApiSuccess) {
                return false;
              }
              return false;
            },
          },
        ])
        .put({
          type: constants.DUPLICATE_NAME_ERROR,
          payload: {
            showError: true,
            errorMessage: mockResponse.result,
          },
        })
        .put({ type: constants.CREATE_CUSTOM_FIELD_FAILURE })
        .run();
    });
  });

  describe('updateCustomField Saga', () => {
    it('should handle successful update', () => {
      const mockResponse = {
        result: 'Custom field updated successfully',
        success: true,
        status: 200,
      };

      return expectSaga(updateCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.updateCustomField,
              mockState.toJS()[constants.customFieldSettingsReduxKey].customFieldId,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .put({ type: constants.UPDATE_CUSTOM_FIELD_SUCCESS })
        .put({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST })
        .put({ type: constants.CLEAR_DATA })
        .call(CapNotification.success, { message: mockResponse.result })
        .run();
    });

    it('should handle successful delete', () => {
      const mockResponse = {
        result: 'Custom field deleted successfully',
        success: true,
        status: 200,
      };

      return expectSaga(updateCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.updateCustomField,
              mockState.toJS()[constants.customFieldSettingsReduxKey].customFieldId,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .put({ type: constants.UPDATE_CUSTOM_FIELD_SUCCESS })
        .put({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST })
        .put({ type: constants.CLEAR_DATA })
        .call(CapNotification.success, { message: mockResponse.result })
        .run();
    });

    it('should handle duplicate name error', () => {
      const mockResponse = {
        status: 409,
        result: 'Duplicate name error',
      };

      return expectSaga(updateCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.updateCustomField,
              mockState.toJS()[constants.customFieldSettingsReduxKey].customFieldId,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          {
            call: ([fn, arg]) => {
              if (fn === Api.checkIncentivesRewardsApiSuccess) {
                return false;
              }
              return false;
            },
          },
        ])
        .put({
          type: constants.DUPLICATE_NAME_ERROR,
          payload: {
            showError: true,
            errorMessage: mockResponse.result,
          },
        })
        .put({ type: constants.UPDATE_CUSTOM_FIELD_FAILURE })
        .run();
    });
  });

  describe('Watcher Sagas', () => {
    it('should watch for GET_ALL_CUSTOM_FIELDS_REQUEST', () => {
      const mockResponse = {
        result: { data: [] },
        success: true,
      };

      return expectSaga(watchForGetAllCustomFields)
        .provide([
          [call(Api.getAllCustomFields), mockResponse],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .dispatch({ type: constants.GET_ALL_CUSTOM_FIELDS_REQUEST })
        .silentRun();
    });

    it('should watch for CREATE_CUSTOM_FIELD_REQUEST', () => {
      const mockResponse = {
        result: 'success',
        success: true,
      };

      return expectSaga(watchForCreateCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.createCustomField,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .dispatch({ type: constants.CREATE_CUSTOM_FIELD_REQUEST })
        .silentRun();
    });

    it('should watch for UPDATE_CUSTOM_FIELD_REQUEST', () => {
      const mockResponse = {
        result: 'success',
        success: true,
      };

      return expectSaga(watchForUpdateCustomField)
        .provide([
          [select(), mockState],
          [
            call(
              Api.updateCustomField,
              mockState.toJS()[constants.customFieldSettingsReduxKey].customFieldId,
              generateCustomFieldPayload(mockState.toJS()[constants.customFieldSettingsReduxKey]),
            ),
            mockResponse,
          ],
          [call(Api.checkIncentivesRewardsApiSuccess, mockResponse), true],
        ])
        .dispatch({ type: constants.UPDATE_CUSTOM_FIELD_REQUEST })
        .silentRun();
    });
  });

  describe('Root Saga', () => {
    it('should fork all watcher sagas', () => {
      return expectSaga(rootSaga)
        .provide([
          [call(watchForGetAllCustomFields), null],
          [call(watchForCreateCustomField), null],
          [call(watchForUpdateCustomField), null],
        ])
        .run();
    });
  });
});
