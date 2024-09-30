import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. "Sign in with...")
          name: "Credentials",
          // `credentials` is used to generate a form on the sign in page.
          // You can specify which fields should be submitted, by adding keys to the `credentials` object.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {
            email: { label: "email", type: "email", placeholder: "test@test.com" },
            password: { label: "Password", type: "password" },
          },
          async authorize(credentials, req) {
            // Add logic here to look up the user from the credentials supplied
            const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
      
            if (user) {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
                    {
                      method: "POST",
                      body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password,
                      }),
                      headers: { "Content-Type": "application/json" },
                    }
                  );
                  const user = await res.json();
                  console.log(user);
          
                  if (user.error) throw user;
          
                  return user;
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              return null
      
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {
          return { ...token, ...user };
        },
        async session({ session, token }) {
          session.user = token as any;
          return session;
        },
      },
      pages: {
        signIn: "/login",
      },
})

export { handler as GET, handler as POST }
