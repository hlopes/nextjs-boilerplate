import React from 'react';
import { NextPage } from 'next';

import Layout from '../components/layout/Layout';

import { Basic, Combined } from '../theme/styles';

const Home: NextPage = () => {
    return (
        <Layout>
            <p>This is homepage.</p>
            <Basic>Cool Styles</Basic>
            <Combined>
                With <code>:hover</code>.
            </Combined>
        </Layout>
    );
};

Home.propTypes = {};

export default Home;
