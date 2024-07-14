import React from 'react'
import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

//importing components
import SeekBar from './Player/SeekBar';
import SongCredentials from './Player/SongCredentials';

//importing SVGs
import playSvg from '@/../public/svg/play_button.svg'
import pauseSvg from '@/../public/svg/pause_button.svg'
import playNext from '@/../public/svg/play_next.svg'
import playPrevious from '@/../public/svg/play_previous.svg'


const Player = ({ songArray, setSongArray}) => {

  let [playingStatus, setPlayingStatus] = useState(false);
  let [volume, setVolume] = useState(0.50);
  let currentSong = useRef(new Audio());
  let [songChange, setSongChange] = useState({});
  let currentSongCount = useRef();
  let maxSongCount = useRef();

  let status = currentSong.current.paused
  //monitoring the changes in song source

  useEffect(() => {
    console.log(songArray)
    if (songArray.length != 0) {
      currentSongCount.current = 0;
      maxSongCount.current = songArray.length;
      currentSong.current.pause();
      
      console.log(currentSong.current.src);
      setPlayingStatus(false);
      //chaning the song track

      if (songArray[currentSongCount.current].src !== null) {

        currentSong.current.src = songArray[currentSongCount.current].src;
        setSongChange(songArray[currentSongCount.current])
        currentSong.current.onloadedmetadata = () => {
          setPlayingStatus(true);
          currentSong.current.play();
        }
      }
    }
  }, [songArray])

  useEffect(() => {
    if (currentSong.current.paused) {
      setPlayingStatus(false);
    }
    else {
      setPlayingStatus(true)
    }
  }, [])


  //stop playing the song if user is not on the dashboard
  const currentPath = usePathname();
  if (currentPath !== '/home') {
    currentSong.current.pause();
  }

  //setting the volume of the song
  currentSong.current.volume = volume


  currentSong.current.onended = () => {
    if (currentSongCount.current < maxSongCount.current && songArray !== undefined) {
      
      currentSongCount.current++;

      currentSong.current.pause();
      setPlayingStatus(false);
      if (songArray[currentSongCount.current]!== undefined && songArray[currentSongCount.current] !== null) {
        
        currentSong.current.src = songArray[currentSongCount.current].src;
        setSongChange(songArray[currentSongCount.current])
        currentSong.current.onloadedmetadata = () => {
          setPlayingStatus(true);
          currentSong.current.play();
        }
      }
    }
    else{
      setSongArray([])
    }
  }

  async function handleClick(operation){
    console.log(currentSongCount.current);
    if(currentSongCount.current >=0 && currentSongCount.current < maxSongCount.current){
      if(operation === 'previous'){
        if(currentSongCount.current>0){
          currentSongCount.current -= 1;
        }
      }
      else if(operation  === 'next'){
          currentSongCount.current += 1;
      }
      if(songArray[currentSongCount.current]!== undefined && songArray[currentSongCount.current]!== null){
        setSongChange(songArray[currentSongCount.current]);
        console.log(songChange);
        currentSong.current.src = songArray[currentSongCount.current].src;
        currentSong.current.play();
      }
    }
    else{
      currentSongCount.current -= 1;
    }
  }


  return (
    <div className='flex flex-col h-[12vh] justify-end  bg-zinc-900'>

      {/* SeekBar */}
      <SeekBar currentSong={currentSong.current} />
      {/* song headers */}

      <div className="flex w-[100vw] h-[15vh] justify-between items-center">

        <SongCredentials song={songChange} /> 


        <div className="flex w-[20%] justify-evenly items-center">
          <button onClick={async ()=>{ await handleClick("previous")}}><Image src={playPrevious} height={50} alt='previous song' /></button>

          {playingStatus ?
            <button onClick={() => {
              setPlayingStatus(false)
              currentSong.current.pause()
            }
            }>
              <Image src={pauseSvg} height={50} alt='pause' />
            </button>
            :
            <button onClick={() => {
              setPlayingStatus(true)
              currentSong.current.play()
            }
            }>
              <Image src={playSvg} height={50} alt='play' />
            </button>
          }


          <button onClick={async ()=>{await handleClick("next")}}><Image src={playNext} height={50} alt='next song' /></button>
        </div>

        <div className="flex w-[40%] justify-center items-center">
          <input type='range' min={0} max={1} step={0.01} onChange={(event) => { setVolume(event.target.valueAsNumber) }} />

        </div>

      </div>
    </div>
  )
}


export default Player
