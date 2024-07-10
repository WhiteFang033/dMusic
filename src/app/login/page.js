"use client"
import React from 'react'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import LoginForm from '@/components/LoginForm'
import { getServerSession } from 'next-auth'
import {redirect} from 'next/navigation'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'


const page = async () => {
  // const session = await getServerSession();

  // if(session){
  //   redirect('/home');
  // }else{
    return (
      <div className='flex justify-start items-center flex-col w-[100vw] h-[80vh] text-white'>
  
        <div className="flex flex-col justify-center items-center">
        <h1 className='relative top-2 text-2xl font-semibold'>Sign In to DMusic</h1>
          <LoginForm />
          <div>OR</div>
          <GoogleSignInButton />
        </div>
      </div>
    )
  // }
  
}

export default page
