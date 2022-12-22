import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import user from '@testing-library/user-event';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { MOCK_PLACES } from "../../sharedMocks";
import Itinerary from '../../../src/components/Trip/Itinerary/Itinerary.js';

describe('Itinerary', () => {
    const placeActions = {append: jest.fn(), selectIndex: jest.fn()};
    beforeEach(() => {
        render(<Itinerary places={MOCK_PLACES} placeActions={placeActions} selectedIndex={0} />);
    });

    it('renders the name attribute', () => {
        screen.getByRole('cell', { name: /Place A/i });
    });

    it('toggles row dropdown when clicked', () => {
        const dropdown = screen.getByTestId('row-toggle-0');
        expect(dropdown.getAttribute('aria-expanded')).toEqual('false');

        user.click(dropdown);
        expect(dropdown.getAttribute('aria-expanded')).toEqual('true');
    });

    it('sets new index when clicked.', () => {
        const row = screen.getByTestId('place-row-0');
        expect(placeActions.selectIndex).toBeCalledTimes(0);

        user.click(row);
        expect(placeActions.selectIndex).toBeCalledTimes(1);
    });

    it('expands a place row when clicked.', () => {
        const row = screen.getByTestId('place-row-2');
        expect(screen.getByText(/123 Test/i)).toBeTruthy();

        user.click(row);
        expect(screen.getByText(/123 Test, expanded test/i)).toBeTruthy();
    });
});