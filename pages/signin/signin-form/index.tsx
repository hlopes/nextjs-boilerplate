import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

import { useRouter } from 'next/router';

import { Category } from '../../../types/NotificationContext';

import { EMAIL_REGEX } from '../../../utils/regexes';
import {
    useNotificationContext,
    withNotificationProvider,
} from '../../../common/useNotificationsContext';
import useLogin from '../../../common/api-hooks/useLogin';
import useUserContext from '../../../common/useUserContext';
import Input from '../../../components/input';

import { Error, Button } from '../../../theme/styles';

import { Form } from './styles';

const SigninForm: FC = () => {
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
                message: error['message'] ?? data?.message,
                category: Category.Error,
            });
        } else if (data?.user) {
            add({
                category: Category.Success,
                onClose: onSuccess,
            });
        }
    }, [clear, add, error, onSuccess, data]);

    return (
        <Form onSubmit={handleSubmit(submit)}>
            {isLoading && 'is Loading...'}
            <Input
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
            <Input
                name="password"
                placeholder="Password"
                type="password"
                ref={register({ required: 'Required field' })}
            />
            <Error>{errors.password && errors.password.message}</Error>
            <Button>Login</Button>
        </Form>
    );
};

const enhanced = compose(withNotificationProvider);

export default enhanced(SigninForm);
