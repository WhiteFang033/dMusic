import React from 'react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import playlistSvg from '@/../public/svg/music_symbol.svg'
import PlaylistPlate from './PlaylistPlate'
import addSvg from "@/../public/svg/add.svg"
import CreatePlaylist from './CreatePlaylist'
import { useSession } from 'next-auth/react'
import Loading from '@/components/utilities/Loading'
const Library = ({dashboardStatus, setDashboardStatus, setPlaylistName, username}) => {

  const [createMenu, setCreateMenu] = useState(false);
  const [playlists, setPlaylists] = useState([])
  const {data: session, status} = useSession()
  const [usernameCurrent, setUsernameCurrent] = useState();
  const [addedPlaylist, setAddedPlaylist] = useState(false);

  useEffect(() => {
    if (session?.user?.username) {
      setUsernameCurrent(session.user.username);
    }
    fetchPlaylists()

    if(addedPlaylist === true){
      setAddedPlaylist(false)
    }
  }, [session, addedPlaylist, dashboardStatus]);

  if (status === 'loading') {
    return <Loading />;
  }

  async function fetchPlaylists(){
    let username = usernameCurrent
    try{
      const res = await fetch('api/playlist/fetch',{
        method: "POST",
        body: JSON.stringify({
          username
        })
      })

      if(res.ok){
        let response = await res.json();
        setPlaylists(response.data)
      }
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div onLoad={fetchPlaylists} className='flex w-[100%] h-[100%] flex-col items-center'>
      <div className="flex w-[100%] h-[13%] justify-center items-center">
        <Image src={playlistSvg} height={30} alt='Playlists Section'></Image>
      <h2 className='text-2xl text-white font-extrabold mx-3'>Your Playlists!</h2>
      </div>
      {createMenu?
      <CreatePlaylist setCreateMenu={setCreateMenu} username={username} setAddedPlaylist={setAddedPlaylist}/>
      :
      <div className="flex flex-col h-[82%] w-[90%] bg-zinc-950 rounded-xl">
      <div className="flex w-[100%] h-[10%] justify-end items-center px-5">
        <button onClick={()=>{setCreateMenu(true)}}><Image src={addSvg} height={20} alt="create playlist" /></button>
      </div>
      <div className="flex flex-col h-[90%] w-[100%] bg-zinc-950 rounded-xl justify-start items-center py-2 overflow-x-auto">
        <PlaylistPlate name={'Liked Songs'}  setDashboardStatus={setDashboardStatus} setPlaylistName={setPlaylistName}/>
        {playlists.map((playlist, index)=>{
          return <PlaylistPlate key={index} name={playlist.playlist_name} setDashboardStatus={setDashboardStatus} setPlaylistName={setPlaylistName}/>
        })}
      </div>
      </div>
      }
    </div>
  )
}

export default Library
