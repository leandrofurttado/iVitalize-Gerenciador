import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const token = process.env.API_TOKEN;

const nextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const response = await ([
            fetch("https://ivitalize-api.onrender.com/api/v1/users/login", {
              method: "POST",
              headers: {
                "Content-type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }),
          ]);

          const data = await response.json();
         
          if (response.ok && !data.error) {
            // Retorna data se response.ok for true e data.error for false
            return data;
          }

          console.log(data)

        } catch (error) {

            if (data){
             
              return false
            }
            return 0;
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST, nextAuthOptions };
