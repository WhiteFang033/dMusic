import React from 'react'
import GoogleSignInButton from '@/components/GoogleSignInButton'
import RegisterForm from '@/components/RegisterForm'
import Footer from '@/components/Footer'

const page = () => {
    return (
      <div className='flex justify-start items-center flex-col w-[100vw] h-[90vh] text-white [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]'>
  
        <div className="flex flex-col justify-center items-center">
        <h1 className='relative top-2 text-2xl font-semibold'>Sign Up to DMusic</h1>
          <RegisterForm  />
          <div>OR</div>
          <GoogleSignInButton />
        </div>
        
        <Footer/>
      </div>
    )
  // }
  
}

export default page
