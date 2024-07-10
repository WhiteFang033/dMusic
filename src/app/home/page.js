"use client"
import PurpleButton from '@/components/PurpleButton'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'

const page = () => {
    const {data: session} = useSession();
    console.log(session);
  return (
    <div>
        <div className='text-white text-lg'>{session.user.username}</div>
        <div className='text-white text-lg'>{session.user.email}</div>
        <button onClick={()=>{signOut()}} className="relative mx-3 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white ">
            <span className="relative text-lg px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Log out
            </span>
        </button>
    </div>
  )
}

export default page
