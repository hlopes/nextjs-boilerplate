import React, { useCallback, useEffect } from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import { compose } from 'recompose';

// Next
import { useRouter } from 'next/router';
import { NextPage } from 'next';

// Types
import { Category } from '../../types/NotificationContext';

// Common
import { EMAIL_REGEX } from '../../utils/regexes';
import {
    useNotificationContext,
    withNotificationProvider,
} from '../../common/useNotificationsContext';
import useUserContext from '../../common/useUserContext';
import useAuthentication from '../../common/useAuthentication';
import withGuest from '../../common/hocs/withGuest';

// Components
import Layout from '../../components/layout/Layout';
import Input from '../../components/input';

// Style
import { h2 } from '../../theme/typography';
import {
    Error,
    StyledToastContainer,
    Button,
    Section,
} from '../../theme/styles';

const Form = styled.form`
    width: 40rem;
`;

const Register: NextPage = () => {
    const router = useRouter();
    const { add, clear } = useNotificationContext();
    const { setUser } = useUserContext();

    const {
        register: [registerUser, { isLoading, data, error }],
    } = useAuthentication();

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
            <Section>
                {isLoading && 'is loading ...'}
                <StyledToastContainer hideProgressBar />
                <h2>New Player</h2>
                <Form onSubmit={handleSubmit(submit)}>
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

const enhanced = compose(withGuest, withNotificationProvider);

export default enhanced(Register);
