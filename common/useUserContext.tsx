import React, {
    createContext,
    useReducer,
    useContext,
    useEffect,
    useMemo,
    useCallback,
} from 'react';

import { useSession, signout } from 'next-auth/client';
import { useRouter } from 'next/router';

import { User } from '../types/User';
import { UserContext as UserContextType } from '../types/UserContext';

const initialState = null;

const reducer = (state, action) => {
    if (action.type === 'USER') {
        return action.payload;
    }

    return state;
};

export const UserContext = createContext<UserContextType>({
    isAuthenticated: false,
    logout(): void {},
    setUser(user: User): void {}, // eslint-disable-line no-unused-vars
    user: undefined,
});

type UserContextProviderProps = {
    children: any;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
    const router = useRouter();
    const [session] = useSession();

    const [state, dispatch]: [User, any] = useReducer(reducer, initialState);

    const isAuthenticated = useMemo(() => !!state?.email, [state]);

    const setUser = useCallback(
        (user) => {
            dispatch({ type: 'USER', payload: user });
        },
        [dispatch]
    );

    const logout = useCallback(() => {
        const user: User = JSON.parse(localStorage.getItem('user'));

        localStorage.removeItem('user');

        if (!user?.isInternal) {
            signout();
        }

        dispatch({ type: 'USER', payload: null });
    }, [dispatch]);

    useEffect(() => {
        const user: User = JSON.parse(localStorage.getItem('user'));

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
                router
                    .push('/')
                    .catch((error) =>
                        console.error(
                            'Something went wrong redirecting to /',
                            error
                        )
                    );
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

const useUserContext = (): { user: User } =>
    useContext<UserContextType>(UserContext);

export default useUserContext;
