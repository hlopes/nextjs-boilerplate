import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';
import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { Category } from '../../types/NotificationContext';

import { EMAIL_REGEX } from '../../utils/regexes';
import {
    useNotificationContext,
    withNotificationProvider,
} from '../../common/useNotificationsContext';
import useUserContext from '../../common/useUserContext';
import withGuest from '../../common/hocs/withGuest';
import useRegister from '../../common/api-hooks/useRegister';
import Layout from '../../components/layout/Layout';

import { h2 } from '../../theme/typography';
import { Error, StyledToastContainer } from '../../theme/styles';

const Register: NextPage = () => {
    const router = useRouter();
    const { add, clear } = useNotificationContext();
    const { setUser } = useUserContext();

    const [registerUser, { isLoading, data, error }] = useRegister();
    const { handleSubmit, register, errors } = useForm();

    const submit = useCallback(
        ({ name, username, password }) => {
            registerUser({ name, username, password }).catch((error) =>
                console.error('error on registering user ', error)
            );
        },
        [registerUser]
    );

    const onSuccess = useCallback(() => {
        if (data?.user && data?.token) {
            localStorage.setItem('jwt', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));

            setUser(data.user);

            router.push('/');
        }
    }, [data, router, setUser]);

    useEffect(() => {
        clear();

        if (error || data?.errorCode) {
            add({
                message: error['message'] ?? data?.message,
                category: Category.Error,
            });
        } else if (data?.user) {
            add({
                category: Category.Success,
                onClose: onSuccess,
            });
        }
    }, [add, error, data, onSuccess, clear]);

    return (
        <Layout>
            {isLoading && 'is loading ...'}
            <StyledToastContainer hideProgressBar />
            <h2>New Player</h2>
            <form onSubmit={handleSubmit(submit)}>
                <input
                    name="name"
                    placeholder="Name"
                    ref={register({ required: 'Required field' })}
                />
                <Error>{errors.name && errors.name.message}</Error>
                <input
                    name="username"
                    placeholder="Username/E-mail"
                    ref={register({
                        required: 'Required field',
                        pattern: {
                            value: EMAIL_REGEX,
                            message: 'Invalid email address',
                        },
                    })}
                />
                <Error>{errors.username && errors.username.message}</Error>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    ref={register({ required: 'Required field' })}
                />
                <Error>{errors.password && errors.password.message}</Error>
                <button>Register</button>
            </form>
        </Layout>
    );
};

const enhanced = compose(withGuest, withNotificationProvider);

export default enhanced(Register);
