import React, { FC } from 'react';

import { MediaContextProvider } from '../../components/media/Media';

import Header from './header';
import MobileNavigation from './navigation/mobile';
import DesktopNavigation from './navigation/desktop';

type Props = {
    children: any;
};

const Layout: FC<Props> = ({ children }: Props) => {
    return (
        <main>
            <Header />
            <MediaContextProvider>
                <DesktopNavigation />
                <MobileNavigation />
            </MediaContextProvider>
            {children}
        </main>
    );
};

export default Layout;
