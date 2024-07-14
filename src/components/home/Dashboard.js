import React from 'react'
import Search from '@/components/home/dashboard/Search'
import searchIcon from '@/../public/svg/search.svg'
import Image from 'next/image'

const Dashboard = ({searchStatus, setSearchStatus, setSongArray, name}) => {
  return (
    <div className='flex w-[100%] h-[75vh] justify-center'>
                {searchStatus? 
                  <Search setSearchStatus = {setSearchStatus} setSongArray = {setSongArray}/>
                : 
                  <div className='flex w-[100%] h-[80px] justify-between items-center'>
                    <div className="text-3xl font-extrabold text-white mx-5">Hey, {name}!</div>
                    <button className='mx-5' onClick={()=>{setSearchStatus(true)}}>
                      <Image src={searchIcon} height={50} alt='search'/>
                    </button>
                  </div>
                }
                </div>
  )
}

export default Dashboard
