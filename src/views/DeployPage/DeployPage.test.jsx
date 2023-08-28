import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DeployPage from './DeployPage';
import { PRICING, PRODUCTS, REGIONS } from '../../data';

const setup = () => {
    return render(
        <DeployPage
            onSubmit={jest.fn()}
            pricing={PRICING}
            products={PRODUCTS}
            regions={REGIONS}
        />,
    );
};

describe('The DeployPage component', () => {
    it('displays a deploy form', () => {
        const { getByRole } = setup();

        expect(getByRole('form')).toBeInTheDocument();
    });

    it('should calculate price given selected region, product and number of nodes', () => {
        setup();

        const selectRegion = screen.getByRole('combobox', {
            name: /region/i,
        });
        userEvent.selectOptions(selectRegion, ['ap-southeast-1']);
        expect(screen.getByRole('option', { name: 'ap-southeast-1' }).selected).toBe(
            true,
        );
        expect(screen.getByRole('option', { name: 'eu-west-1' }).selected).toBe(
            false,
        );

        const slider = screen.getByRole('slider', {
            name: /nodes/i,
        });

        fireEvent.change(slider, { target: { value: 1 } });

        expect(slider).toHaveValue('1');

        const price = screen.getByRole('region', {
            name: /price/i,
        });

        expect(price).toHaveTextContent('$99.99');

        screen.logTestingPlaygroundURL();
    });

    it('should calculate default price given selected region, product and number of nodes', () => {
        setup();

        const selectRegion = screen.getByRole('combobox', {
            name: /region/i,
        });
        userEvent.selectOptions(selectRegion, ['us-east-1']);
        expect(screen.getByRole('option', { name: 'us-east-1' }).selected).toBe(
            true,
        );

        const product = screen.getByRole('combobox', {
            name: /product/i,
        });
        userEvent.selectOptions(product, ['CR3 - 16 CPU Cores, 32 GB Ram']);
        expect(
            screen.getByRole('option', { name: 'CR3 - 16 CPU Cores, 32 GB Ram' })
                .selected,
        ).toBe(true);

        const slider = screen.getByRole('slider', {
            name: /nodes/i,
        });

        fireEvent.change(slider, { target: { value: 8 } });

        expect(slider).toHaveValue('8');

        const price = screen.getByRole('region', {
            name: /price/i,
        });

        expect(price).toHaveTextContent('$240.00');

        screen.logTestingPlaygroundURL();
    });
});
