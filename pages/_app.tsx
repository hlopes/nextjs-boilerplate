import React from 'react';
import { ReactQueryDevtools } from 'react-query-devtools';
import 'react-toastify/dist/ReactToastify.css';
import type { AppProps } from 'next/app';

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
            <HydrationRenderProvider>
                <UserContextProvider>
                    <NotificationContextProvider>
                        <StyledToastContainer hideProgressBar />
                        <Component {...pageProps} />
                    </NotificationContextProvider>
                </UserContextProvider>
            </HydrationRenderProvider>
            {isDevelopment && <ReactQueryDevtools initialIsOpen={false} />}
        </ErrorBoundary>
    </>
);

export default App;
