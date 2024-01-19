import bcrypt from "bcrypt"
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/src/lib/db";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions: NextAuthOptions  = {
    adapter: PrismaAdapter(db),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {

                // check to see if email and password is valid
                if(!credentials?.email || !credentials?.password){
                    return null
                }

                // check if user exist
                const user = await db.user.findUnique({
                    where: {
                        email: credentials?.email
                    }
                })

                if(!user){
                    return null
                }

                //check to see if password match
                const passwordMatch = await bcrypt.compare(credentials?.password, user.password as string)

                if(!passwordMatch){
                    return null
                }

                // return user object if everything is valid
                return user as any;
            },
        }),
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user, session}){
            // console.log("jwt callback", {token, user, session});
            
            // pass in user id and adress to token
            if(user){
                return {
                    ...token,
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    gender: user.gender,
                    email: user.email,
                    role: user.role
                }
            }
            return token
        },
        
        async session({session, token, user}) {
            // console.log("session callback", {session, token, user});
            // pass in user id and address to session
            
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    firstName: token.firstName,
                    lastName: token.lastName,
                    gender: token.gender,
                    role: token.role
                }
            }
        }

    },

    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === "development",

    pages: {
        signIn: "/auth/signin",
    },

}