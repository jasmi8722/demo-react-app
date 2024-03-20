import React from 'react';
import { render, screen } from '@testing-library/react';
import { EditDepModal } from './EditDepModal';

describe('EditDepModal', () => {
    const onHide = jest.fn();

    it('renders the Close button with the correct data-testid attribute', () => {
        render(<EditDepModal onHide={onHide} />);
        
        // Query the Close button using its data-testid attribute
        const closeButton = screen.getByTestId('close-button');

        // Assert that the Close button is present in the DOM
        expect(closeButton).toBeInTheDocument();
    });
});



  
  
  

