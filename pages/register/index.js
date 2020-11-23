import React, { useCallback, useEffect } from 'react';

import { ToastContainer } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';
import { useRouter } from 'next/router';

import { EMAIL_REGEX } from '../../utils/regexes';
import {
    NOTIFICATION_CATEGORIES,
    useNotificationContext,
    withNotificationProvider,
} from '../../common/useNotificationsContext';
import useUserContext from '../../common/useUserContext';
import withGuest from '../../common/hocs/withGuest';
import useRegister from '../../common/api-hooks/useRegister';
import Layout from '../../components/layout/Layout';

import styles from './Register.module.css';

const Register = () => {
    const router = useRouter();
    const { add, clear } = useNotificationContext();
    const { setUser } = useUserContext();

    const [registerUser, { isLoading, data, error }] = useRegister();
    const { handleSubmit, register, errors } = useForm();

    const submit = useCallback(
        ({ name, username, password }) => {
            // TODO deal with promise
            registerUser({ name, username, password });
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
                message: error?.message ?? data?.message,
                category: NOTIFICATION_CATEGORIES.error,
            });
        } else if (data?.user) {
            add({
                category: NOTIFICATION_CATEGORIES.success,
                onClose: onSuccess,
            });
        }
    }, [add, error, data, onSuccess, clear]);

    return (
        <Layout>
            {isLoading && 'is loading ...'}
            <ToastContainer bodyClassName={styles.toastBody} hideProgressBar />
            <h2>New Player</h2>
            <form onSubmit={handleSubmit(submit)}>
                <input
                    name="name"
                    placeholder="Name"
                    ref={register({ required: 'Required field' })}
                />
                <p className={styles.error}>
                    {errors.name && errors.name.message}
                </p>
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
                <p className={styles.error}>
                    {errors.username && errors.username.message}
                </p>
                <input
                    name="password"
                    placeholder="Password"
                    type="password"
                    ref={register({ required: 'Required field' })}
                />
                <p className={styles.error}>
                    {errors.password && errors.password.message}
                </p>
                <button>Register</button>
            </form>
        </Layout>
    );
};

const enhanced = compose(withGuest, withNotificationProvider);

export default enhanced(Register);
