import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

import { useRouter } from 'next/router';
import { NextPage } from 'next';

import { EMAIL_REGEX } from '@utils/regexes';

import { useNotificationContext } from '@helpers/useNotificationsContext';
import useUserContext from '@helpers/useUserContext';
import withGuest from '@helpers/withGuest';

import Layout from '@components/layout/Layout';
import Input from '@components/input';

import { h2 } from '@theme/typography';
import { Error, Button, Section } from '@theme/styles';

import { Category } from '../../types/NotificationContext';

const Form = styled.form`
    width: 40rem;
`;

const Register: NextPage = () => {
    const router = useRouter();
    const { add, clear } = useNotificationContext();
    const { registerUser, isLoading, error, result } = useUserContext();

    const { handleSubmit, register, errors } = useForm();

    const onSuccess = useCallback(() => {
        if (result?.user && result?.token) {
            router.push('/');
        }
    }, [result, router]);

    useEffect(() => {
        clear();

        if (error) {
            add({
                // @ts-ignore
                message: error?.message,
                category: Category.Error,
            });
        } else if (result?.user) {
            add({
                category: Category.Success,
            });

            onSuccess();
        }
    }, [add, error, result, onSuccess, clear]);

    return (
        <Layout>
            <Section>
                {isLoading && 'is loading ...'}
                <h2>New Player</h2>
                <Form onSubmit={handleSubmit(registerUser)}>
                    <Input
                        name="name"
                        placeholder="Name"
                        ref={register({ required: 'Required field' })}
                    />
                    <Error>{errors.name && errors.name.message}</Error>
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
                    <Button>Register</Button>
                </Form>
            </Section>
        </Layout>
    );
};

const enhanced = compose(withGuest);

export default enhanced(Register);
