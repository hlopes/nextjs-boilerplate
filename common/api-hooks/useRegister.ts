import { useMutation } from 'react-query';

type RegisterArgs = {
    name: string;
    username: string;
    password: string;
};

const useRegister = () => {
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

    return useMutation(register, {
        // @ts-ignore
        enabled: false,
        refetchOnWindowFocus: false,
    });
};

export default useRegister;
