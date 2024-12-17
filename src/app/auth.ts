import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db"
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub, Google],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id
      
      return session
    }
  }
})
