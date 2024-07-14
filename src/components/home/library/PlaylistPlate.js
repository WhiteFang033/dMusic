import React from 'react'
import Image from 'next/image'
import dLogo from '@/../public/d_logo.png'
const PlaylistPlate = ({setDashboardStatus, setPlaylistName, name}) => {
  let playlistName = name;
  return (
    <div onClick={()=>{ 
      console.log('yes')
      setDashboardStatus(false)
      setPlaylistName(name);
    }} className='flex w-[90%] h-[70px] bg-zinc-900 my-2 rounded-xl border-2 border-zinc-900 hover:border-2 hover:border-purple-700 transition-all ease-in-out delay-100'>
        <Image src={dLogo} height={70} alt='Liked Songs'></Image>
        <div className='flex flex-col text-white justify-center items-start'>
            <h3 className='text-lg font-semibold'>{playlistName}</h3>
        </div>
    </div>
  )
}

export default PlaylistPlate
