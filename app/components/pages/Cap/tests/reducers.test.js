import { fromJS } from 'immutable';

import * as constants from '../../App/constants';
import { actionTypes } from '../constants';
import reducer, { initialState } from '../reducer';

describe('capReducer', () => {
  it('handles GET_ORG_DETAILS_REQUEST', () => {
    const action = {
      type: actionTypes.GET_ORG_DETAILS_REQUEST,
    };
    const expectedState = initialState.set(
      'organizationMetadata',
      fromJS({ status: constants.REQUEST }),
    );
    expect(reducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('handles GET_ORG_DETAILS_SUCCESS', () => {
    const action = {
      type: actionTypes.GET_ORG_DETAILS_SUCCESS,
      data: { timezone: 'America/New_York' },
    };
    const expectedState = initialState.set(
      'organizationMetadata',
      fromJS({ status: constants.SUCCESS, data: action.data }),
    );
    expect(reducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('handles GET_ORG_DETAILS_FAILURE', () => {
    const action = {
      type: actionTypes.GET_ORG_DETAILS_FAILURE,
      error: 'Failed to fetch organization data',
    };
    const expectedState = initialState.set(
      'organizationMetadata',
      fromJS({ status: constants.FAILURE, error: action.error }),
    );
    expect(reducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
