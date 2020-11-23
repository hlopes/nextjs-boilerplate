import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';

import { useSession, signout } from 'next-auth/client';
import { useRouter } from 'next/router';

const initialState = null;

const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }

    return state;
};

export const UserContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const router = useRouter();
    const [session] = useSession();

    const [state, dispatch] = useReducer(reducer, initialState);

    const isAuthenticated = useMemo(() => !!state?.email, [state]);

    const setUser = useCallback(
        (user) => {
            dispatch({ type: 'USER', payload: user });
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        localStorage.removeItem('user');

        if (!user?.isInternal) {
            signout();
        }

        dispatch({ type: 'USER', payload: null });
    }, [dispatch]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user) {
            dispatch({ type: 'USER', payload: user });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        const currentToken = localStorage.getItem('jwt');

        if (session && session.accessToken !== currentToken) {
            localStorage.setItem('jwt', session.accessToken);
            localStorage.setItem('user', JSON.stringify(session?.user));

            dispatch({
                type: 'USER',
                payload: { ...session?.user },
            });

            if (router.pathname !== '/') {
                router.push('/');
            }
        }
    }, [router, session]);

    return (
        <UserContext.Provider
            value={{ user: state, setUser, isAuthenticated, logout }}
        >
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.any,
};

const useUserContext = () => useContext(UserContext);

export default useUserContext;
