"use client"
import React from 'react'
import Logo from './Logo'
import PurpleButton from './PurpleButton'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Profile from './Profile'
const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className='bg-black text-white h-[10vh] flex justify-between'>
      <div className="text-5xl justify-start w-[25%] self-center mx-5 flex items-center">
        <Logo height={60}/>
        <p className='px-5'>dTunes</p>
        </div>
        <ul className='flex gap-2 h-[100%] mx-5 items-center'>
            {pathname === '/' && <Link href={"/register"} className='text-xl h-[50%]'> <PurpleButton content= {"Sign Up"} /></Link>}
            {pathname === '/home' && <Profile></Profile>}
        </ul>
    </nav>
  )
}

export default Navbar
