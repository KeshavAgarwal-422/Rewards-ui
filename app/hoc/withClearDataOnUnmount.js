import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

const withClearDataOnUnmount = (Component) => {
  const WithClearDataOnUnmount = (props) => {
    useEffect(() => {
      return () => {
        props.actions?.clearData?.() || props.actions?.clearAllData?.();
      };
    }, []);

    return <Component {...props} />;
  };

  WithClearDataOnUnmount.displayName = `withClearDataOnUnmount(${Component.displayName || Component.name || 'Component'})`;

  WithClearDataOnUnmount.propTypes = {
    actions: PropTypes.shape({
      clearData: PropTypes.func,
      clearAllData: PropTypes.func,
    }),
  };

  WithClearDataOnUnmount.defaultProps = {
    actions: {},
  };

  return WithClearDataOnUnmount;
};

export default withClearDataOnUnmount;
