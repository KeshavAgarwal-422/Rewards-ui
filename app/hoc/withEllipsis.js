import CapTooltip from '@capillarytech/cap-ui-library/CapTooltip';
import PropTypes from 'prop-types';
import React from 'react';

const withEllipsis = (WrappedComponent) => {
  const WithEllipsis = ({ text, maxLength, tooltipProps = {}, ...props }) => {
    const shouldTruncate = text?.length > maxLength;
    const truncatedText = shouldTruncate ? `${text?.slice(0, maxLength)}...` : text;

    return shouldTruncate ? (
      <CapTooltip title={text} {...tooltipProps}>
        <WrappedComponent {...props}>{truncatedText}</WrappedComponent>
      </CapTooltip>
    ) : (
      <WrappedComponent {...props}>{text}</WrappedComponent>
    );
  };

  WithEllipsis.displayName = `withEllipsis(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  WithEllipsis.propTypes = {
    text: PropTypes.string,
    maxLength: PropTypes.number.isRequired,
    tooltipProps: PropTypes.object,
  };

  WithEllipsis.defaultProps = {
    text: '',
    tooltipProps: {},
  };

  return WithEllipsis;
};

export default withEllipsis;
