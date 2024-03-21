import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { AddDepModal } from './AddDepModal';


describe('AddDepModal Component', () => {

  beforeEach(() => {
    global.fetch = jest.fn(); // Mock fetch function
});

afterEach(() => {
    jest.restoreAllMocks(); // Restore mock after each test
});

    it('renders modal with correct title', () => {
        const onHide = jest.fn();
        render(<AddDepModal show={true} onHide={onHide} />);
        expect(screen.getByTestId('addDepModal')).toBeInTheDocument();
        const addDepartmentElements = screen.getAllByText('Add Department');
        expect(addDepartmentElements.length).toBeGreaterThan(0);
      });
    //////////////////
    it('closes modal when close button is clicked', () => {
      const onHide = jest.fn();
      render(<AddDepModal show={true} onHide={onHide} />);

      fireEvent.click(screen.getByText('Close'));

      expect(onHide).toHaveBeenCalled();
  });
  ///////////



it('displays error message when department submission fails', async () => {
  const onHide = jest.fn();
  render(<AddDepModal show={true} onHide={onHide} />);

  fetch.mockRejectedValueOnce(new Error('Failed to add department'));

  fireEvent.change(screen.getByLabelText('DepartmentName'), { target: { value: 'Test Department' } });
  fireEvent.submit(screen.getByTestId('addDepForm'));

  await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Failed to add department');
  });
});



it('displays error message when department name is empty upon submission', async () => {
  const onHide = jest.fn();
  render(<AddDepModal show={true} onHide={onHide} />);

  fireEvent.submit(screen.getByTestId('addDepForm'));

  await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Department name is required');
  });
});


});
