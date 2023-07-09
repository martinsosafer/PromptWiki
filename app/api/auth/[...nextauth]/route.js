
//en caso de dudas ver documentacion en next-auth
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectToDB } from "@utils/database";
import User from "@models/user";


const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
    const sessionUser = await User.findOne({
      email:session.user.email
    })
    session.user.id =sessionUser._id.toString()
    return session
  },
  
  
  async signIn({ profile }) {
    //cada ruta de next es una ruta serverless quiere decir que esto es una lambda function osea que solo es llamada cuando se necesita,pero necesita estar conectada a la base de datos , la armaremos en utils/database
    try {
      await connectToDB();
        //checkear si un usuario existe 
      const userExist = await User.findOne({
        email: profile.email
      })
        // si no crear uno nuevo y guardarlo en la database
      if (!userExist) {
        await User.create({
          email: profile.email,
          username: profile.name.replace(" ", "").toLowerCase(),//queremos asergurarnos de que no haya espacios
          image:profile.picture
        })
      }
      return true
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  }
  
})
export { handler as GET , handler as POST}