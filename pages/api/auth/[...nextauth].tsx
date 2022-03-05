import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { verifyPassword } from "../../../lib/auth";
import prisma from "../../../lib/prisma";

interface User {
    userId: number,
    fullName: string,
    email: string,
    password: string,
    role: number,
}

interface UserProfile {
    email: string,
    profileImageURL: string,
    coverImageURL: string,
    aboutMe: string,
    privateProfile: boolean,
    totalPosts: number,
    totalMessages: number
}

export default NextAuth({
    session: {
        strategy: 'jwt'
    },
    secret: process.env.SECRET,
    adapter: PrismaAdapter(prisma),
    jwt: {
        encryption: true,
        secret: '4bq94PigRikFXJWsMoPjm0krYNAVW3dZBNCt/sJvOSyihYjW5kF1uflmbI4q1pVrecel/mtwXPeHTYisfm9TIw==',
        signingKey: process.env.JWT_SIGNING_KEY,
        encryptionKey: process.env.JWT_ENCRYPTION_KEY,
    } as any,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Username", type: "text", placeholder: 'Insert your email' },
                password: { label: "Password", type: "password", placeholder: 'Password' }
            },
            async authorize(credentials: any) {

                //const user = await User.findOne({ email: credentials.email });
                const user: any = await prisma.users.findFirst({ where: { email: credentials.email } });
                const userProfile: any = await prisma.userProfile.findFirst({ where: { email: credentials.email } });

                if (!user) {
                    throw new Error('Invalid username or password. Please check the data!');
                }

                const isValid = await verifyPassword(
                    credentials.password,
                    user.password
                );

                if (!isValid) {
                    throw new Error('Invalid username or password. Please check the data!');
                }

                return { user: user, profile: userProfile };
            },
        })
    ],
    pages: {
        signIn: '/login'
    },
    callbacks: {
        //FIX CALLBACKS
        jwt: async ({ token, user, account, profile, isNewUser }: any) => {
            //  "user" parameter is the object received from "authorize"
            //  "token" is being send below to "session" callback...
            //  ...so we set "user" param of "token" to object from "authorize"...
            //  ...and return it...            
            if (user) {
                console.log(user);
                token.id = user.userId;
                const { role } = user.user;
                const { email } = user.user;
                const { fullName } = user.user;
                const { profileImageURL } = user.profile;

                token.email = email;
                token.role = role;
                token.fullName = fullName;
                token.profileImageURL = profileImageURL;
            }
            return token;
        },
        session: async ({ session, token }: any) => {
            if (token) {
                session.id = token.id;
                session.user.role = token.role;
                session.user.fullName = token.fullName;
                session.user.profileImageURL = token.profileImageURL;
            }

            return session;
        }
    } as any
});