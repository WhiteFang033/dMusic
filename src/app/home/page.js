"use client"
import React, { useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useState, useRef } from 'react'
import Image from 'next/image'
import Player from '@/components/home/Player'
import Library from '@/components/home/library/Library'
import Loading from '@/components/utilities/Loading'
import Dashboard from '@/components/home/Dashboard'
import Playlist from '@/components/home/playlist/Playlist'
import LikedPlaylist from '@/components/home/playlist/LikedPlaylist'

const page = () => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [songArray, setSongArray] = useState([]);
  
  const [dashbardStatus, setDashboardStatus] = useState(true);
  const [playlistName, setPlaylistName] = useState('likedSongs')
  const {data: session, status} = useSession();
  var [username, setUsername] = useState();

  useEffect(() => {
    if (session?.user?.username) {
      setUsername(session.user.username);
    }
  }, [session]);

  if (status === 'loading') {
    return <Loading />;
  }

  

  return (
    <div className="flex flex-col h-[90vh] w-[100vw] justify-between bg-black">
      <div className='min-h-[75vh] w-[100vw] flex items-center justify-between bg-black'>
          {/* Left Side Bar */}
          <div className="flex h-[75vh] w-[20vw] bg-zinc-900 rounded-e-xl">
            <Library dashboardStatus={dashbardStatus} setDashboardStatus={setDashboardStatus} setPlaylistName = {setPlaylistName} username={username}/>
          </div>

          {/* Main Dashboard */}
          <div className="flex h-[75vh] w-[58vw] bg-zinc-900 rounded-xl justify-center">
          {dashbardStatus? 
            <Dashboard searchStatus={searchStatus} setSearchStatus={setSearchStatus} setSongArray={setSongArray} name={session?.user.fname} />
          :
            playlistName === 'Liked Songs'?
              <LikedPlaylist setSongArray = {setSongArray} username = {username} setDashboardStatus={setDashboardStatus}/>
            : 
              <Playlist setSongArray = {setSongArray} name={playlistName} setPlaylistName={setPlaylistName} setDashboardStatus={setDashboardStatus}/>
          }
          </div>

          {/* Right Side Bar */}

          <div className="flex h-[75vh] w-[20vw] bg-zinc-900 rounded-s-xl justify-center items-center">
            <button onClick={()=>{signOut()}} className=" h-[50px] inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white ">
              <span className="relative text-lg px-7 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Log out
              </span>
            </button>
          </div>
    </div>
    <Player songArray={songArray} setSongArray={setSongArray}/>
    </div>
  )
}

export default page
