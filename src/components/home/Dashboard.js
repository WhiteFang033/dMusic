import React from 'react'
import Search from '@/components/home/dashboard/Search'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import searchIcon from '@/../public/svg/search.svg'
import playSvg from '@/../public/svg/play_button.svg'
import ExploreItems from './dashboard/ExploreItems'

const Dashboard = ({searchStatus, setSearchStatus, setSongArray, name}) => {
  const [randomSongs, setRandomSongs] = useState([]);

  useEffect(()=>{
    fetchRandomSongs()
  }, []);


  async function fetchRandomSongs(){
    try{
      const res = await fetch('api/songs/random', {
        method: 'POST'
      })
      
      if(res.ok){
        const response = await res.json();
        setRandomSongs(response.data);
      }
    }
    catch(err){
      console.log('Error fetching the songs: ', err);
    }
  }

  async function handleClick(){
    setSongArray([randomSongs[0]]);
  }


  return (
    <div  className='flex w-[100%] h-[75vh] justify-center'>
                {searchStatus? 
                  <Search setSearchStatus = {setSearchStatus} setSongArray = {setSongArray}/>
                : 
                  <div className='flex flex-col w-[100%] h-[100%] justify-between'>
                    <div className='flex w-[100%] h-[80px] justify-between items-center my-2'>
                    <div className="text-3xl font-extrabold text-white mx-5">Hey, {name}!</div>
                    <button className='mx-5' onClick={()=>{setSearchStatus(true)}}>
                      <Image src={searchIcon} height={40} alt='search'/>
                    </button>
                  </div>
                  <div className="flex flex-col w-[100%] h-[100%] justify-center items-center">
                    <div className=' flex justify-center items-center w-[95%] h-[35%] bg-zinc-950 rounded-xl px-10 mb-5'>
                      <div className="w-[90%] h-[100%] flex justify-center items-start flex-col">
                        <h1 className="text-2xl font-extrabold text-white my-3">{randomSongs[0]?.name}</h1>
                        <h3 className='text-md font-medium text-white'>By {randomSongs[0]?.artist}</h3>
                      </div>
                      <button onClick={handleClick}><Image src={playSvg} height={70} alt='play highlighted song'></Image></button>
                    </div>
                    <div className="flex flex-col w-[100%] h-[55%] justify-center items-center">
                      <div className="w-[95%] h-[15%] px-10">
                      <h2 className="text-2xl font-extrabold text-white">Explore more songs</h2>
                      </div>
                      <div className="flex flex-col flex-wrap justify-center items-center w-[95%] h-[85%] bg-zinc-950 rounded-xl p-7">
                        {randomSongs.map((song, index)=>{
                          if(index !== 0){
                            return <ExploreItems index={index} title = {song.name} artist={song.artist} songSource={song.src} setSongArray={setSongArray}></ExploreItems>
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  </div>
                  
                }
                </div>
  )
}

export default Dashboard
