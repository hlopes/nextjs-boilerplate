import { useMutation } from 'react-query';

type LoginArgs = {
    username: string;
    password: string;
};

type RegisterArgs = LoginArgs & {
    name: string;
};

const useAuthentication = () => {
    const login = async ({ username, password }: LoginArgs) => {
        const result = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({
                email: username,
                password,
            }),
        });

        return await result.json();
    };

    const register = async ({ name, username, password }: RegisterArgs) => {
        const result = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({
                name,
                email: username,
                password,
            }),
        });

        return await result.json();
    };

    return {
        login: useMutation(login, {
            // @ts-ignore
            enabled: false,
            refetchOnWindowFocus: false,
        }),
        register: useMutation(register, {
            // @ts-ignore
            enabled: false,
            refetchOnWindowFocus: false,
        }),
    };
};

export default useAuthentication;
