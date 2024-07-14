import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import PlaylistItem from './PlaylistItem'
import returnSvg from '@/../public/svg/return_back.svg'
import playSvg from '@/../public/svg/play_button.svg'
import pauseSvg from '@/../public/svg/pause_button.svg'
import deleteSvg from '@/../public/svg/delete.svg'

const Playlist = ({ name, setDashboardStatus, setSongArray}) => {

  const { data: session, status } = useSession();
  const [usernameCurrent, setUsernameCurrent] = useState();
  const [songs, setSongs] = useState([]);


  useEffect(() => {
    if (session?.user?.username) {
      setUsernameCurrent(session.user.username);
    }
      fetchPlaylistsSongs()
  }, [session, name]);

  if (status === 'loading') {
    return <Loading />;
  }

  
  async function fetchPlaylistsSongs(){
    let playlistName = name;
    try {
      const res = await fetch('api/playlist/fetchSongs', {
        method: "POST",
        body: JSON.stringify({
          playlistName,
          usernameCurrent
        })
      })
  
      if (res.ok) {
        let response = await res.json();
        setSongs(response.data);
      }
    }
    catch (err) {
      console.log(err);
    }
  }

  async function handleClick(e){
    setSongArray(songs);
  }


return (
  <div onLoad={async ()=>{await fetchPlaylistsSongs()}} className='flex flex-col w-[100%] h-[100%] bg-zinc-900 rounded-xl items-center justify-start'>
    <div className=" w-[100%] h-[13%] flex items-center justify-start px-10">
      <button onClick={() => { setDashboardStatus(true) }}><Image src={returnSvg} height={30} alt='go back'></Image></button>
      <h1 className='text-4xl text-white font-extrabold mx-10'>{name}</h1>
    </div>

    <div className="flex flex-col h-[82%] w-[95%] bg-zinc-950 rounded-xl">
      <div className="scrollbar flex flex-col h-[95%] w-[100%] bg-zinc-950 rounded-xl justify-start items-center py-2 overflow-auto">
      <div className="w-[100%] h-[15%] flex items-center justify-between px-14 mb-5">
          <button onClick={handleClick} className='relative top-5'><Image src={playSvg} height={70} alt='play playlist songs'></Image></button>
          <button className='flex text-white w-[180px] h-[50px] border-2 border-red-600 rounded-xl items-center justify-evenly hover:bg-red-700 transition-all delay-75'><Image src={deleteSvg} height={30} alt='delete playlist'></Image>Delete Playlist</button>
        </div>
      {songs.map((song, index)=>{
            return <PlaylistItem key={index} index = {index+1} title={song.name} artist={song.artist} songSource={song.src} setSongArray = {setSongArray} playlistName ={song.playlist_name} fetchPlaylistsSongs ={fetchPlaylistsSongs}/>
        })}

      </div>
    </div>
  </div>
)
}

export default Playlist
