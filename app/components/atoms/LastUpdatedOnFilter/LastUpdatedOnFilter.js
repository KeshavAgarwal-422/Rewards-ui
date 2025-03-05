import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import withStyledComponent from 'hoc/withStyledComponent';

import CapRow from '@capillarytech/cap-ui-library/CapRow';
import CapIcon from '@capillarytech/cap-ui-library/CapIcon';

import styles from './styles';

export const LastUpdatedOnFilter = ({ className, isDescending, handleOnFilterClick }) => (
  <CapRow className={className} onClick={handleOnFilterClick}>
    <CapRow className="last-updated-on-filter">
      <CapIcon
        type="caret-up"
        size="s"
        className={classNames('caret-up', {
          'sort-active': !isDescending,
        })}
      />
      <CapIcon
        type="caret-down"
        size="s"
        className={classNames('caret-down', {
          'sort-active': isDescending,
        })}
      />
    </CapRow>
  </CapRow>
);

LastUpdatedOnFilter.propTypes = {
  className: PropTypes.string,
  isDescending: PropTypes.bool,
  handleOnFilterClick: PropTypes.func,
};

LastUpdatedOnFilter.defaultProps = {
  className: '',
  isDescending: true,
  handleOnFilterClick: () => {},
};

export default withStyledComponent(LastUpdatedOnFilter, styles);
