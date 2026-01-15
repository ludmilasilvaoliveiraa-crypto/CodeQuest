// CodeQuest - NextAuth.js Configuration
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';

export const authConfig: NextAuthConfig = {
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID || process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET || process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: 'Guest Login',
            credentials: {
                name: { label: "Nome", type: "text", placeholder: "Seu nome" }
            },
            async authorize(credentials) {
                if (!credentials?.name) return null;
                return {
                    id: `guest-${Date.now()}`,
                    name: credentials.name as string,
                    email: `${credentials.name}@local.guest`,
                    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${credentials.name}`
                };
            }
        })
    ],

    pages: {
        signIn: '/login',
        error: '/login',
    },
    callbacks: {
        async session({ session, token }) {
            // Add user ID to session
            if (session.user && token.sub) {
                session.user.id = token.sub;
            }
            return session;
        },
        async jwt({ token, user, account }) {
            // Initial sign in
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async signIn({ user, account, profile }) {
            // Allow all sign ins
            return true;
        },
        async redirect({ url, baseUrl }) {
            // After login, redirect to dashboard
            if (url.startsWith(baseUrl)) return url;
            if (url.startsWith('/')) return `${baseUrl}${url}`;
            return baseUrl + '/dashboard';
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
            const isOnProfile = nextUrl.pathname.startsWith('/profile');

            // Protected routes
            if (isOnDashboard || isOnProfile) {
                if (isLoggedIn) return true;
                return false; // Redirect to login
            }

            return true;
        },
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET,
    trustHost: true,
};

export const { handlers, auth, signIn, signOut }: any = NextAuth(authConfig);
