import '@testing-library/jest-dom';
import React from 'react';

import { render, screen } from '../../../../utils/test-utils';
import { ListRewards } from '../ListRewards';

const initializeComponent = (props) => {
  return render(<ListRewards {...props} />);
};

describe('<ListRewards /> page', () => {
  it('renders the component', () => {
    initializeComponent();
    expect(screen.getByText(/This will be your listing page/i)).toBeInTheDocument();
  });
});
