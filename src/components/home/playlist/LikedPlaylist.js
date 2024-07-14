import React from 'react'
import PlaylistItem from './PlaylistItem'
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import playSvg from '@/../public/svg/play_button.svg'
import pauseSvg from '@/../public/svg/pause_button.svg'
import deleteSvg from '@/../public/svg/delete.svg'

import returnSvg from '@/../public/svg/return_back.svg'

const LikedPlaylist = ({setSongArray, username, setDashboardStatus}) => {
    const {data: session, status} = useSession()
    const [likedSongs, setLikedSongs] = useState([]);

    useEffect(() => {
        fetchLikedSongs(username);
    }, [session]);

    if (status === 'loading') {
        return <Loading />;
    }

    let fetchLikedSongs = async ()=>{
        try{
          const res  = await fetch('api/songs/likedsong/',{
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              username
            })
          })
    
          if(res.ok){
            let result = await res.json();
            if(result.data.length>0){
              setLikedSongs(result.data)
            }
          }
        }
        catch(err){
          console.log(err);
        }
      }

      async function handleClick(e){
        setSongArray(likedSongs);
      }

  return (
    <div className='flex flex-col w-[100%] h-[100%] bg-zinc-900 rounded-xl items-center justify-start'>
        <div className=" w-[100%] h-[13%] flex items-center justify-start px-10">
        <button onClick={()=>{setDashboardStatus(true)}}><Image src={returnSvg} height={30} alt='go back'></Image></button>
        <h1 className='text-4xl text-white font-extrabold mx-10'>Liked Songs</h1>
        </div>
        <div className="flex flex-col h-[82%] w-[95%] bg-zinc-950 rounded-xl">
        <div className="w-[100%] h-[15%] flex items-center justify-between px-14">
          <button onClick={handleClick} className='relative top-5'><Image src={playSvg} height={70} alt='play playlist songs'></Image></button> 
        </div>
        <div className="scrollbar flex flex-col h-[95%] w-[100%] bg-zinc-950 rounded-xl justify-start items-center py-10 overflow-auto">
        {likedSongs.map((song, index)=>{
            return <PlaylistItem key={index} index = {index+1} title={song.name} artist={song.artist} songSource={song.src} setSongArray = {setSongArray} playlistName = {"Liked Songs"}/>
        })}

        </div>
        </div>
    </div>
  )
}

export default LikedPlaylist
