"use client"
import React from 'react'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import LoginForm from '@/components/LoginForm'
import Footer from '@/components/Footer'


const page = () => {
    return (
      <div className='flex justify-start items-center flex-col w-[100vw] h-[80vh] text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
  
        <div className="flex flex-col justify-center items-center">
        <h1 className='relative top-2 text-2xl font-semibold'>Sign In to dTunes</h1>
          <LoginForm />
          <div>OR</div>
          <GoogleSignInButton />
          <Footer/>
        </div>
      </div>
    )
}

export default page
