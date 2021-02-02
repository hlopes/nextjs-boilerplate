import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { EMAIL_REGEX } from '@utils/regexes';
import { useNotificationContext } from '@helpers/useNotificationsContext';
import useUserContext from '@helpers/useUserContext';

import { Error, Button } from '@theme/styles';

import { Category } from '../../types/NotificationContext';

import Input from '../input';

import { Form } from './styles';

const SigninForm: FC = () => {
    const router = useRouter();
    const { loginUser, isLoading, error, result } = useUserContext();
    const { add, clear } = useNotificationContext();
    const { handleSubmit, register, errors } = useForm();

    const onSuccess = useCallback(() => {
        if (result?.user) {
            router.push('/');
        }
    }, [result, router]);

    useEffect(() => {
        clear();

        if (error) {
            add({
                // @ts-ignore
                message: error?.message ?? '',
                category: Category.Error,
            });
        } else if (result?.user) {
            add({
                category: Category.Success,
            });

            onSuccess();
        }
    }, [clear, add, error, onSuccess, result]);

    return (
        <Form onSubmit={handleSubmit(loginUser)}>
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

export default SigninForm;
