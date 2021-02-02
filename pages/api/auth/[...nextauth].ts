import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    // Configure one or more authentication providers
    providers: [
        Providers.Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
        }),
        // ...add more providers here
    ],
    // @link https://next-auth.js.org/configuration/databases
    database: process.env.NEXTAUTH_DATABASE_URL,
});
