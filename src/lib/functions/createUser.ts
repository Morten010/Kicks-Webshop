"use server"
import bcrypt from "bcrypt";
import {db} from "@/src/lib/db"
import { userProps } from "@/types";

export default async function createUser(user: userProps){

  // check if user is empty
  if(!user.email && !user.firstName && !user.lastName && !user.gender && !user.email){
    // send content is missing for user signup msg
    return {
      "msg": "Fill out all the fields.",
      status: false //gives red error msg
    }
  }
  
  //check if user email exists if not create a user
  const exists = await db.user.findUnique({
    where: {email: user.email}
  })
  console.log(exists);
  

  if(!exists){
    const hashedPassword = await bcrypt.hash(user.password as string, 10)
    const newUser = await db.user.create({
      data: {...user, password: hashedPassword}
    })

    if(newUser){
      // send back success msg
      return {
        "msg": "Sucessfully created an account,",
        status: true //gives green error msg
      }

    } else{
      // send back something went wrong msg
      return {
        "msg": "Something went wrong, try again.",
        status: false //gives red error msg
      }

    }
  } else{
    // send email already exist error
    return {
      "msg": "An account with this email already exist",
      status: false //gives red error msg
    }

  }
}
