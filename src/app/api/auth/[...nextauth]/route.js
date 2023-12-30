import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const token = process.env.API_TOKEN;

const TIMEOUT_DURATION = 5000; // Defina o tempo limite desejado em milissegundos (aqui é 5 segundos)

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
          const response = await Promise.race([
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
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("Timeout")), TIMEOUT_DURATION)
            ),
          ]);

          if (response instanceof Error && response.message === "Timeout") {
            console.error("API request timed out");
            return 0; // Retorna 0 em caso de timeout
          }

          const data = await response.json();
         
          if (response.ok && !data.error) {
            // Retorna data se response.ok for true e data.error for false
            return data;
          }

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
