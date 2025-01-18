import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { compare } from 'bcryptjs'

// This would typically come from a database
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'admin@exclusiveafrica.com'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4oL4LGiu7K' // "admin123" hashed

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Missing credentials')
        }

        if (credentials.email !== ADMIN_EMAIL) {
          throw new Error('Invalid credentials')
        }

        const isValid = await compare(credentials.password, ADMIN_PASSWORD)
        if (!isValid) {
          throw new Error('Invalid credentials')
        }

        return {
          id: '1',
          email: ADMIN_EMAIL,
          name: 'Admin',
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
    error: '/admin/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = 'admin'
      }
      return token
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
      }
      return session
    },
  },
})

export { handler as GET, handler as POST } 