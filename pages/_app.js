import React from 'react';
import PropTypes from 'prop-types';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider as AuthProvider } from 'next-auth/client';
import 'react-toastify/dist/ReactToastify.css';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { UserContextProvider } from '../common/useUserContext';
import { HydrationRenderProvider } from '../common/useHydrationRender';

const isDevelopment = process.env.NODE_ENV === 'development';

import { globalStyles } from '../theme/styles';

function App({ Component, pageProps }) {
    const { session } = pageProps;

    return (
        <>
            {globalStyles}
            <ErrorBoundary>
                <HydrationRenderProvider>
                    <AuthProvider session={session}>
                        <UserContextProvider>
                            <Component {...pageProps} />
                        </UserContextProvider>
                    </AuthProvider>
                </HydrationRenderProvider>
                {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
            </ErrorBoundary>
        </>
    );
}

App.propTypes = {
    Component: PropTypes.any,
    pageProps: PropTypes.object,
};

export default App;
