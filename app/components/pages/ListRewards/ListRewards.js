import { withStyles } from '@capillarytech/vulcan-react-sdk/utils';
import PropTypes from 'prop-types';
import React from 'react';

import PageTemplate from '../../templates/PageTemplate';

import styles from './styles';

export const ListRewards = ({ className }) => {
  return (
    <PageTemplate>
      <div className={className}>
        <h3>This will be your listing page</h3>
      </div>
    </PageTemplate>
  );
};

ListRewards.propTypes = {
  className: PropTypes.string,
};

ListRewards.defaultProps = {
  className: '',
};

export default withStyles(ListRewards, styles);
