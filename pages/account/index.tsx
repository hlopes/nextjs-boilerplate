import React from 'react';
import { compose } from 'recompose';
import { NextPage } from 'next';

import { User } from '../../types/User';

import withAuth from '../../common/hocs/withAuth';
import useUserContext from '../../common/useUserContext';
import Layout from '../../components/layout/Layout';

const Account: NextPage = () => {
    const { user }: { user: User } = useUserContext();

    return (
        <Layout>
            <section>
                <div>{user?.image && <img src={user?.image} />}</div>
                <div>{user.name}</div>
                <div>{user.email}</div>
            </section>
        </Layout>
    );
};

const enhanced = compose(withAuth);

export default enhanced(Account);
