import React from 'react';
import 'react-toastify/dist/ReactToastify.css';

import type { AppProps } from 'next/app';

import Providers from '@helpers/Providers';

import ErrorBoundary from '@components/error-boundary/ErrorBoundary';

import { globalStyles } from '@theme/styles';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        {globalStyles}
        <ErrorBoundary>
            <Providers session={pageProps.session}>
                <Component {...pageProps} />
            </Providers>
        </ErrorBoundary>
    </>
);

export default App;
