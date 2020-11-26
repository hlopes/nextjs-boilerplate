import React from 'react';

import Layout from '../components/layout/Layout';

import { Basic, Combined, Animated, bounce } from '../shared/styles';

const Home = () => {
    return (
        <Layout>
            <p>This is homepage.</p>
            <Basic>Cool Styles</Basic>
            <Combined>
                With <code>:hover</code>.
            </Combined>
            <Animated animation={bounce}>Let's bounce.</Animated>
        </Layout>
    );
};

Home.propTypes = {};

export default Home;
