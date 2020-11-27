import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Provider as AuthProvider } from 'next-auth/client';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';

import ErrorBoundary from '../components/error-boundary/ErrorBoundary';
import { UserContextProvider } from '../common/useUserContext';
import { HydrationRenderProvider } from '../common/useHydrationRender';

const isDevelopment = process.env.NODE_ENV === 'development';

import { globalStyles } from '../theme/styles';

const App = ({ Component, pageProps }: AppProps) => {
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
};

export default App;
