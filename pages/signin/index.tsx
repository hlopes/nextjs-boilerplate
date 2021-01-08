import React, { useCallback } from 'react';

import { NextPage, NextPageContext } from 'next';
import Link from 'next/link';
import { providers, signIn, useSession } from 'next-auth/client';

import Layout from '../../components/layout/Layout';

import { Section, StyledToastContainer, Button } from '../../theme/styles';
import { h2 } from '../../theme/typography';

import SigninForm from '../../components/signin-form';

type HomeProps = {
    providers: {};
};

const Home: NextPage<HomeProps> = ({ providers }: HomeProps) => {
    // eslint-disable-next-line no-unused-vars
    const [session, loading] = useSession();

    const handleSignInProvider = useCallback(
        (provider) => () => {
            signIn(provider);
        },
        []
    );

    return (
        <Layout>
            <Section>
                {loading && <div>is loading ...</div>}
                <StyledToastContainer hideProgressBar />
                <h2>Welcome back</h2>
                <SigninForm />
                <p>
                    New player? <Link href={'/register'}>Register</Link>
                </p>
                {providers
                    ? Object.values(providers).map((provider, index) => (
                          <Button
                              key={index}
                              onClick={handleSignInProvider(provider['id'])}
                          >
                              Signin with Google
                          </Button>
                      ))
                    : null}
            </Section>
        </Layout>
    );
};

Home.getInitialProps = async (context: NextPageContext) => {
    return {
        providers: await providers(context),
    };
};

export default Home;
