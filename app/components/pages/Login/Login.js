import { InternalIntouchLogin } from '@capillarytech/vulcan-react-sdk/components';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, bindActionCreators } from 'redux';

import endpoints from '../../../config/endpoints';
import { userIsNotAuthenticated } from '../../../utils/authWrapper';

import * as actions from './actions';
import messages from './messages';

const Login = (props) => {
  const { actions, intl: { formatMessage } = {}, history } = props;
  const { loginSuccess, loginFailure } = actions;
  const onSuccess = (response) => {
    loginSuccess(response);
    history.push('/');
  };
  const onFailure = (err) => {
    loginFailure(err);
  };

  return (
    <>
      <FormattedMessage {...messages.login}>
        {(message) => (
          <Helmet
            title={message}
            meta={[
              {
                name: 'description',
                content: <FormattedMessage {...messages.loginPage} />,
              },
            ]}
          />
        )}
      </FormattedMessage>
      <InternalIntouchLogin
        signInLabel={formatMessage(messages.signIn)}
        userNameLabel={formatMessage(messages.userName)}
        passwordLabel={formatMessage(messages.password)}
        apiEndPoint={`${endpoints.arya_endpoint}/auth/login`}
        onSuccess={onSuccess}
        onFailure={onFailure}
      />
    </>
  );
};

Login.propTypes = {
  actions: PropTypes.object,
  intl: intlShape.isRequired,
  history: PropTypes.object,
};

Login.defaultProps = {
  actions: {},
  history: {},
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(actions, dispatch),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose.apply(null, [withRouter, userIsNotAuthenticated, withConnect])(
  injectIntl(Login),
);
