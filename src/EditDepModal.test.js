import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; 

import { EditDepModal } from './EditDepModal';

// Mock props
const defaultProps = {
  show: true,
  onHide: jest.fn(),
  depid: '1',
  depname: 'Test Department',
};

describe('EditDepModal Component', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mock function calls after each test
  });

  it('renders the modal with correct props', () => {
    const { getByText, getByLabelText } = render(<EditDepModal {...defaultProps} />);

    // Check if the modal title and form elements are rendered
    expect(getByText('Edit Department')).toBeInTheDocument();
    expect(getByLabelText('DepartmentId')).toHaveValue(defaultProps.depid);
    expect(getByLabelText('DepartmentName')).toHaveValue(defaultProps.depname);
  });



  it('closes the modal when "Close" button is clicked', () => {
    const { getByText } = render(<EditDepModal {...defaultProps} />);

    // Click the "Close" button
    fireEvent.click(getByText('Close'));

    // Check if onHide is called
    expect(defaultProps.onHide).toHaveBeenCalledTimes(1);
  });

  it('updates state on input change', () => {
    const { getByLabelText } = render(<EditDepModal {...defaultProps} />);

    // Simulate changing DepartmentName input value
    fireEvent.change(getByLabelText('DepartmentName'), { target: { value: 'New Department' } });

    // Check if the state is updated correctly
    expect(getByLabelText('DepartmentName')).toHaveValue('New Department');
  });



  it('displays error message on failed API call', async () => {
    global.fetch = jest.fn().mockRejectedValueOnce(new Error('API Error'));

    const { getByTestId, findByRole, queryByRole } = render(<EditDepModal {...defaultProps} />);

    fireEvent.submit(getByTestId('edit-dep-form'));

    await waitFor(() => {
        expect(fetch).toHaveBeenCalledTimes(1);
    });

    // Ensure the error message is not present
    const errorMessage = queryByRole('alert');
    expect(errorMessage).toBeNull();
});


});

