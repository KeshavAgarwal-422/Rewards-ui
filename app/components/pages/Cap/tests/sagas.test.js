import { takeLatest } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import { actionTypes } from '../constants';
import { getOrganizationData, getOrganizationDataAPI, watchForGetOrganizationData } from '../saga';

import { mockOrganizationData } from './mockData';

describe('getOrganizationDataAPI', () => {
  it('should return mockOrganizationData', async () => {
    const result = await getOrganizationDataAPI();
    expect(result).toEqual(mockOrganizationData);
  });
});

describe('getOrganizationData', () => {
  it('success -> yields success', () => {
    expectSaga(getOrganizationData)
      .provide([[matchers.call.fn(getOrganizationDataAPI), mockOrganizationData]])
      .put({
        type: actionTypes.GET_ORG_DETAILS_SUCCESS,
        data: mockOrganizationData?.response?.organization,
      })
      .run();
  });

  it('success -> yields api failures', () => {
    expectSaga(getOrganizationData)
      .provide([
        [matchers.call.fn(getOrganizationDataAPI), { status: 500, errors: 'Error', success: true }],
      ])
      .put({
        type: actionTypes.GET_ORG_DETAILS_FAILURE,
        error: 'Error',
      })
      .run();
  });

  it('catch -> yields error', () => {
    expectSaga(getOrganizationData)
      .provide([[matchers.call.fn(getOrganizationDataAPI), throwError('Error')]])
      .put({
        type: actionTypes.GET_ORG_DETAILS_FAILURE,
      })
      .run();
  });
});

describe('watchForGetOrganizationData', () => {
  const generator = watchForGetOrganizationData();
  it('should call watcher', () => {
    expect(generator.next().value).toEqual(
      takeLatest(
        'rewards-catalog/Components/pages/Cap/GET_ORG_DETAILS_REQUEST',
        getOrganizationData,
      ),
    );
  });
});
