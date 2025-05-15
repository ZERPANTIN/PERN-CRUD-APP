import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
    test('renders list header', () => {
        render(<App />);
        const headerElement = screen.getByText(/List of Items/i);
        expect(headerElement).toBeInTheDocument();
    });

    test('renders list container', () => {
        render(<App />);
        const listContainer = screen.getByTestId('items-list');
        expect(listContainer).toBeInTheDocument();
    });
});