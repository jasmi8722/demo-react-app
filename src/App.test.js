import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock BrowserRouter
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // use actual for all non-mocked parts
  BrowserRouter: ({ children }) => <>{children}</>,
}));

describe('App component', () => {
  test('renders navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Department')).toBeInTheDocument();
    expect(screen.getByText('Employee')).toBeInTheDocument();
  });

  test('renders header text', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Employee Management Portal')).toBeInTheDocument();
  });

  test('navigates to Home page by default', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(screen.getByText('Welcome to Home Page')).toBeInTheDocument();
  });
});
