
import { DefaultUser, User, UserRole } from "next-auth"
import "next-auth/jwt"

type UserID = string

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId
    }
}

declare module "next-auth" {
    interface Session {
        user: User & {
            id?: UserId
            firstName?: strin
            lastName?: string
            gender?: string
            email?: string
            role?: UserRole
        } & DefaultUser
    }
    
    interface User {
        id?: UserString
        firstName?: string
        lastName?: string
        gender?: string
        email?: string
        role?: UserRole
    }
}