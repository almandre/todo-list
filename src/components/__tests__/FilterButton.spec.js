import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FilterButton from '../FilterButton';

const filterButtonId = 'filter-button';

const renderComponent = (
    label,
    active,
    onClick = jest.fn()
) => render(
    <FilterButton
        label={label}
        active={active}
        onClick={onClick}
    />
);

describe('FilterButton', () => {
    afterEach(() => {
        cleanup();
    });

    test('should highlight the active button', () => {
        const { getByTestId } = renderComponent('Active', true);
        const filterButton = getByTestId(filterButtonId);

        expect(filterButton).toHaveTextContent('Active');
        expect(filterButton).toHaveStyle('font-weight: bold');
    });

    test('should normalize the inactive button', () => {
        const { getByTestId } = renderComponent('Completed', false);
        const filterButton = getByTestId(filterButtonId);

        expect(filterButton).toHaveTextContent('Completed');
        expect(filterButton).toHaveStyle('font-weight: normal');
    });

    test('should return the clicked button label', () => {
        const label = 'All';
        const onClick = jest.fn();
        const { getByTestId } = renderComponent(label, false, onClick);
        const filterButton = getByTestId(filterButtonId);

        fireEvent.click(filterButton);

        expect(onClick).toHaveBeenCalledWith(label);
    });
});
