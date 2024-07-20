import React from 'react'
import Image from 'next/image'
import { useState } from 'react'
import dLogo from '@/../public/d_logo.png'
const PlaylistPlate = ({setDashboardStatus, setPlaylistName, name, thumbnail}) => {
  let playlistName = name;
  if(thumbnail === null || thumbnail === undefined){
    thumbnail = 'd_logo.png'
  }
  const [imageSrc, setImageSrc] = useState(null);

  const loadImage = async () => {
    const image = await import('@/../public/d_logo.png');
    setImageSrc(image);
  };

  return (
    <div onClick={()=>{ 
      console.log('yes')
      setDashboardStatus(false)
      setPlaylistName(name);
    }} className='flex justify-between w-[90%] h-[70px] bg-zinc-900 my-2 rounded-xl border-2 border-zinc-900 hover:border-2 hover:border-purple-700 transition-all ease-in-out delay-100'>
        <Image src={`/uploads/${thumbnail}`} width={70}  height={70} alt='playlist image' className='p-2 rounded-xl w-[25%]'></Image>
        <div className='flex flex-col text-white justify-center items-center w-[60%]'>
            <h3 className='text-lg font-semibold'>{playlistName}</h3>
        </div>
        <div className='w-[20%]'></div>
    </div>
  )
}

export default PlaylistPlate
