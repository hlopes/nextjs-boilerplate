import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';

import Link from 'next/link';
import { providers, signIn, useSession } from 'next-auth/client';

import Layout from '../../components/layout/Layout';

import SigninForm from './signin-form';

import styles from './Signin.module.css';

function Index({ providers }) {
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
            {loading && 'is loading ...'}
            <ToastContainer bodyClassName={styles.toastBody} hideProgressBar />
            <h2>Welcome back</h2>
            <SigninForm />
            <p>
                New player? <Link href={'/register'}>Register</Link>
            </p>
            {providers
                ? Object.values(providers).map((provider, index) => (
                      <button
                          key={index}
                          onClick={handleSignInProvider(provider.id)}
                      >
                          Signin with Google
                      </button>
                  ))
                : null}
        </Layout>
    );
}

Index.propTypes = {
    providers: PropTypes.object,
};

Index.getInitialProps = async (context) => {
    return {
        providers: await providers(context),
    };
};

export default Index;
