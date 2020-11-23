import React from 'react';
import PropTypes from 'prop-types';

import Link from 'next/link';

import { Media } from '../../media/Media';
import useUserContext from '../../../common/useUserContext';

const DesktopContainer = ({ children }) => {
    const { isAuthenticated, logout } = useUserContext();

    return (
        <Media greaterThan="xs">
            <div>
                <Link href={'/'}>Home</Link>
                {isAuthenticated && <Link href={'/forusers'}>For Users</Link>}
                <Link href={'/forguests'}>For Guests</Link>
            </div>
            <div>
                <Link href={isAuthenticated ? '/account' : '/signin'}>
                    <button>{isAuthenticated ? 'Account' : 'Login'}</button>
                </Link>
                {!isAuthenticated && (
                    <Link href={'/register'}>
                        <button>Register</button>
                    </Link>
                )}
                {isAuthenticated && <button onClick={logout}>Logout</button>}
            </div>
            {children}
        </Media>
    );
};

DesktopContainer.propTypes = {
    children: PropTypes.node,
};

export default DesktopContainer;
