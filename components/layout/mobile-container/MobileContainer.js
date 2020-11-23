import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { Media } from '../../media/Media';

import useUserContext from '../../../common/useUserContext';

const MobileContainer = ({ children }) => {
    const { isAuthenticated, logout } = useUserContext();

    const logoutAction = useCallback(() => {
        logout();
    }, [logout]);

    return (
        <Media at="xs">
            <div>
                <Link href={'/'}>Home</Link>
                {isAuthenticated && (
                    <Link href={'/forusers'}>For users only</Link>
                )}
                <Link href={isAuthenticated ? '/account' : '/signin'}>
                    {isAuthenticated ? 'Account' : 'Login'}
                </Link>
                <Link href={'/forguests'}>For Guests</Link>
                {!isAuthenticated && <Link href={'/register'}>Register</Link>}
            </div>
            <div>
                {isAuthenticated && (
                    <button onClick={logoutAction}>Logout</button>
                )}
            </div>
            {children}
        </Media>
    );
};

MobileContainer.propTypes = {
    children: PropTypes.node,
};

export default MobileContainer;
