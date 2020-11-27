import React, { FC } from 'react';
import { compose } from 'recompose';

import { User } from '../../types/User';

import withAuth from '../../common/hocs/withAuth';
import useUserContext from '../../common/useUserContext';
import Layout from '../../components/layout/Layout';

const Account: FC = () => {
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
