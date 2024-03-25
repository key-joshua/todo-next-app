import { db } from "./db"
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(db),
    secret: process.env.NEXT_AUTH_SECRET,
    session: { strategy: 'jwt' },
    pages: { signIn: '/' },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: 'Enter your email'},
                password: { label: 'Password', type: 'password', placeholder: 'Enter your password' }
            },

            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password) return null;

                const user = await db.users.findUnique({ where: { email: credentials?.email } });
                if(!user) return null;
                
                const passMatch = await compare(credentials?.password, user?.password);
                if (!passMatch) return null;

                return {
                    id: `${user?.id}`,
                    email: user?.email,
                    username: user?.username,
                }
            }
        })
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    username: user.username
                }
            }
            
            return token
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    username: token.username
                }
            }

            return session
        }
    }
}