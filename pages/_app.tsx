import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';
import { Provider as AuthProvider } from 'next-auth/client';

import { UserContextProvider } from '@helpers/useUserContext';
import { HydrationRenderProvider } from '@helpers/useHydrationRender';
import { NotificationContextProvider } from '@helpers/useNotificationsContext';

import ErrorBoundary from '@components/error-boundary/ErrorBoundary';

const isDevelopment = process.env.NODE_ENV === 'development';

import { globalStyles, StyledToastContainer } from '../theme/styles';

const App = ({ Component, pageProps }: AppProps) => (
    <>
        {globalStyles}
        <ErrorBoundary>
            <AuthProvider session={pageProps.session}>
                <HydrationRenderProvider>
                    <UserContextProvider>
                        <NotificationContextProvider>
                            <StyledToastContainer hideProgressBar />
                            <Component {...pageProps} />
                        </NotificationContextProvider>
                    </UserContextProvider>
                </HydrationRenderProvider>
            </AuthProvider>
            {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </ErrorBoundary>
    </>
);

export default App;
