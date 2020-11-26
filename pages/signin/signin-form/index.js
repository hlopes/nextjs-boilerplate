import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

import { useRouter } from 'next/router';

import { EMAIL_REGEX } from '../../../utils/regexes';
import {
    NOTIFICATION_CATEGORIES,
    useNotificationContext,
    withNotificationProvider,
} from '../../../common/useNotificationsContext';
import useLogin from '../../../common/api-hooks/useLogin';
import useUserContext from '../../../common/useUserContext';

import { Error } from '../../../shared/styles';

const SigninForm = () => {
    const router = useRouter();
    const { setUser } = useUserContext();
    const { add, clear } = useNotificationContext();
    const { handleSubmit, register, errors, getValues } = useForm();

    const { username, password } = getValues();
    const { error, data, isLoading, refetch } = useLogin(username, password);

    const submit = useCallback(() => refetch(), [refetch]);

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
                message: error?.message ?? data?.message,
                category: NOTIFICATION_CATEGORIES.error,
            });
        } else if (data?.user) {
            add({
                category: NOTIFICATION_CATEGORIES.success,
                onClose: onSuccess,
            });
        }
    }, [clear, add, error, onSuccess, data]);

    return (
        <form onSubmit={handleSubmit(submit)}>
            {isLoading && 'is Loading...'}
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
            <button>Login</button>
        </form>
    );
};

SigninForm.propTypes = {};

const enhanced = compose(withNotificationProvider);

export default enhanced(SigninForm);
