import React from 'react';

import { NextPage } from 'next';
import Link from 'next/link';

import Layout from '@components/layout/Layout';
import SigninForm from '@components/signin-form';

import { Section } from '@theme/styles';
import { h2 } from '@theme/typography';

const SignIn: NextPage = () => {
    return (
        <Layout>
            <Section>
                <h2>Welcome back</h2>
                <SigninForm />
                <p>
                    New player? <Link href={'/register'}>Register</Link>
                </p>
            </Section>
        </Layout>
    );
};

export default SignIn;
