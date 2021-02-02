import React from 'react';
import { NextPage } from 'next';

import Layout from '@components/layout/Layout';

import { Section } from '@theme/styles';
import { h2 } from '@theme/typography';

const Home: NextPage = () => {
    return (
        <Layout>
            <Section>
                <h2>Home</h2>
                <p>This is the homepage.</p>
            </Section>
        </Layout>
    );
};

export default Home;
