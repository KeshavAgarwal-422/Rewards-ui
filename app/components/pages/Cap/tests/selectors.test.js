import { fromJS } from 'immutable';

import { makeSelectOrganizationTimezone } from '../selectors';

describe('makeSelectOrganizationTimezone', () => {
  it('should return the correct timezone', () => {
    const state = fromJS({
      organizationMetadata: {
        data: {
          timezones: {
            /* eslint-disable camelcase */
            base_timezone: 'America/New_York',
            /* eslint-enable camelcase */
          },
        },
      },
    });
    const selected = makeSelectOrganizationTimezone().resultFunc(state);
    expect(selected).toEqual('America/New_York');
  });
});
