import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Department } from './Department';

describe('Department Component', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue([
        { DepartmentId: 1, DepartmentName: 'IT' },
        { DepartmentId: 2, DepartmentName: 'HR' },
      ]),
    });
// Mock window.confirm
window.confirm = jest.fn().mockImplementation(() => true); // Mock confirm to always return true
});

  afterEach(() => {
    global.fetch.mockClear();
  });

  it('renders table with departments correctly', async () => {
    render(<Department />);
    // Wait for fetch API to resolve
    await screen.findByText('HR');

    // Get all table rows
    const departmentRows = screen.getAllByRole('row');

    // Assert that department table renders correctly
    expect(departmentRows).toHaveLength(3); // Including table header row
    expect(screen.getByText('IT')).toBeInTheDocument();
    expect(screen.getByText('HR')).toBeInTheDocument();
  });

  it('calls deleteDep function when delete button is clicked', async () => {
    render(<Department />);
    await screen.findByText('HR'); // Wait for fetch API to resolve

    // Find the delete button within the row corresponding to "HR"
    const deleteButton = screen.getAllByText('Delete')[1]; // Assuming "HR" is the second row
    fireEvent.click(deleteButton);

    // Assert that window.confirm is called
    expect(window.confirm).toHaveBeenCalled();

    // Assert that fetch API is called with correct parameters after confirmation
    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining('/department/2'), // Assuming DepartmentId 2 corresponds to HR
      expect.objectContaining({ method: 'DELETE' })
    );
  });

  it('opens EditDepModal when Edit button is clicked', async () => {
    render(<Department />);
    await screen.findByText('HR'); // Wait for fetch API to resolve

    // Find all the edit buttons
    const editButtons = screen.getAllByText('Edit');

    // Click the edit button for "HR"
    fireEvent.click(editButtons[1]); // Assuming "HR" is the second row

    // Check if "Update Department" button is present
    const editModalTitles = screen.queryAllByText('Update Department', { exact: false });
    expect(editModalTitles.length).toBeGreaterThan(0); // Ensure there's at least one matching element

    // Loop through the elements and check each one individually
    editModalTitles.forEach(editModalTitle => {
      expect(editModalTitle).toBeInTheDocument();
    });
  });
});
