import React from 'react';
import { render } from '@testing-library/react';

import Home from '../index';

// @ts-ignore
test('Simple test', () => {
    const { getByText } = render(<Home />, {});

    expect(getByText('This is the homepage.')).toBeVisible();
});
