import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import pg from 'pg';
import connection from "@/database/connectSql";
import { compareSync } from "bcrypt";

var userName = null;

const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                username: {label: "Email", type: "text"},
                password: {label: "Password", type: "password"}
            },
            
            async authorize(credentials){
                const {username, password} = credentials;
                userName = username;
                const db = new pg.Client(connection);
                try{
                    await db.connect();
                    const storedPasswordData = await db.query("SELECT password FROM users WHERE username = $1", [username]);
                    const storedPassword = storedPasswordData.rows[0].password;
                    const result = await compareSync(password, storedPassword);
                    console.log(result);
                    if(result){
                        const userData = await db.query("SELECT * FROM users WHERE username = $1", [username])
                        return userData.rows[0];
                    }
                    else{
                        return null;
                    }
                }
                catch(err){
                    console.log("Error:",  err);
                }
                finally{
                    await db.end();
                }
            }   
        })
    ],
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
        signIn: '/login'
    },

    callbacks: {
        async session({ session, token, user }) {
            let userData = null;
            console.log(userName);
            if(userName!=null){
                const db = new pg.Client(connection);
                await db.connect();
                const userDataObject = await db.query("SELECT * FROM users WHERE username = $1", [userName]);
                userData = userDataObject.rows[0];
                console.log(userData);
        }
          // Send properties to the client, like an access_token and user id from a provider.
          session.accessToken = token.accessToken
          session.user.id = token.id
          
          if(userData !=null){
            session.user.username = userData.username
            session.user.fname = userData.first_name
            session.user.lname = userData.last_name
            session.user.rollNo = userData.roll_no
          }
          
          return session
        }
      }
}


const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}
export {authOptions}