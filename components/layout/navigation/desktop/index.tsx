import React, { FC } from 'react';

import Link from 'next/link';

import useUserContext from '../../../../common/useUserContext';
import { Media } from '../../../media/Media';

import Button from '../../../button';

import NavLink from './nav-link/NavLink';

import { Nav, ButtonWrapper } from './styles';

const DesktopNavigation: FC = () => {
    const { isAuthenticated, logout } = useUserContext();

    return (
        <Media greaterThan="xs">
            <Nav>
                <div>
                    <NavLink href={'/'}>Home</NavLink>
                    <NavLink href={'/forall'}>For All</NavLink>
                    {!isAuthenticated && (
                        <NavLink href={'/forguests'}>For Guests</NavLink>
                    )}
                    {isAuthenticated && (
                        <NavLink href={'/forusers'}>For Users</NavLink>
                    )}
                </div>
                <ButtonWrapper>
                    <Link href={isAuthenticated ? '/account' : '/signin'}>
                        <Button>{isAuthenticated ? 'Account' : 'Login'}</Button>
                    </Link>
                    {!isAuthenticated && (
                        <Link href={'/register'}>
                            <Button>Register</Button>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <Button onClick={logout}>Logout</Button>
                    )}
                </ButtonWrapper>
            </Nav>
        </Media>
    );
};

export default DesktopNavigation;
