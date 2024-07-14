"use client"
import React from 'react'
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import Player from '@/components/home/Player'
import Search from '@/components/home/dashboard/Search'
import searchIcon from '@/../public/svg/search.svg'
import Library from '@/components/home/library/Library'
import Loading from '@/components/utilities/Loading'

const page = () => {
    const [searchStatus, setSearchStatus] = useState(false);
  const [song, setSong] = useState({});
  const [likedSongs, setLikedSongs] = useState();
  const {data: session, status} = useSession();
  var [username, setUsername] = useState();

  useEffect(() => {
    if (session?.user?.username) {
      setUsername(session.user.username);
      fetchLikedSongs();
    }
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
        console.log(result.data);
        if(result.data.length>0){
          setLikedSongs(result.data)
        }
      }
    }
    catch(err){
      console.log(err);
    }
  }

  console.log(likedSongs);
  return (
    <div className="flex flex-col h-[90vh] w-[100vw] justify-between bg-black">
      <div className='min-h-[75vh] w-[100vw] flex items-center justify-between bg-black'>
          {/* Left Side Bar */}
          <div className="flex h-[75vh] w-[20vw] bg-zinc-900 rounded-e-xl">
            <Library />
          </div>

          {/* Main Dashboard */}
          <div className="flex h-[75vh] w-[58vw] bg-zinc-900 rounded-xl justify-center">
          <div className='flex w-[100%] h-[75vh] justify-center'>
                {searchStatus? 
                  <Search setSearchStatus = {setSearchStatus} setSong = {setSong}/>
                : 
                  <div className='flex w-[100%] h-[80px] justify-between items-center'>
                    <div className="text-3xl font-extrabold text-white mx-5">Hey, {session?.user.fname}!</div>
                    <button className='mx-5' onClick={()=>{setSearchStatus(true)}}>
                      <Image src={searchIcon} height={50} alt='search'/>
                    </button>
                  </div>
                }
                </div>
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
    <Player song={song} />
    </div>
  )
}

export default page
