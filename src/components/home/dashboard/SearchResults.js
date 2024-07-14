import React from 'react'
import { useState } from 'react'
import Image from 'next/image'
import smallPlaySvg from '@/../public/svg/small_play_button.svg'
import Player from '../Player'
import SongOptions from '@/components/songOptions/SongOptions'


const SearchResults = ({index, title, artist, songSource, setSongArray}) => {
    const [cursorStatus, setCursorStatus] = useState(false);
   

    function handleClick(){
      setSongArray([{
        title: title,
        artist: artist,
        src: songSource
      }])
      return;
    }


  return (
      <div onMouseOver={()=>{setCursorStatus(true)}} onMouseOut={()=>{setCursorStatus(false)}} className="flex w-[90%] min-h-[70px] bg-zinc-900 rounded-xl px-5 my-2 items-center border-2 border-zinc-900 justify-between hover:bg-purple-700 hover:border-purple-700 transition-all delay-75">
        <div className='flex items-center justify-start'>
        {cursorStatus?
         <button className='mx-5 w-[20px]' onClick={handleClick}><Image src={smallPlaySvg} height={20} alt='play'></Image></button>
         :
         <h2 className='text-xl w-[20px] font-semibold text-white mx-5'>{index}</h2>
        }
        <div className="flex flex-col mx-5 cursor-pointer">
            <h3 className='text-lg font-semibold text-white'>{title}</h3>
            <h5 className='text-sm font-normal text-white'>{artist}</h5>
        </div>
        </div>
        <SongOptions songTitle={title} songArtist = {artist}/>
      </div>
  )
}

export default SearchResults
