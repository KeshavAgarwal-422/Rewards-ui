import React from 'react';
import ErrorBoundaryDefault from '../components/organisms/ErrorBoundary';
import ErrorBoundaryFallback from '../components/atoms/ErrorBoundaryFallback';

const withErrorBoundary = (WrappedComponent, FallbackComponent = ErrorBoundaryFallback) => {
  const ComponentWithErrorBoundary = (props) => (
    <ErrorBoundaryDefault FallbackComponent={FallbackComponent}>
      <WrappedComponent {...props} />
    </ErrorBoundaryDefault>
  );

  ComponentWithErrorBoundary.displayName = `WithErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithErrorBoundary;
};

export default withErrorBoundary;
