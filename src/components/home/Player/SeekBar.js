import React from 'react'
import { useEffect, useRef, useState } from 'react';
const SeekBar = ({currentSong}) => {
    let [progress, setProgress] = useState(0);
    let [maxProgress, setMaxProgress] = useState(0);

     //for refrencing seek bar
    let seekerRef = useRef();
    //updating the current time in sync with seek bar progress

    useEffect(()=>{
        if(currentSong.src != null){
            setMaxProgress(currentSong.duration);
        }
    })

    currentSong.ontimeupdate = () =>{
    seekerRef.current.style.width = `${Math.floor((currentSong.currentTime/maxProgress)*100)}%`;
    setProgress(currentSong.currentTime);
  }

    //seeking through the song on clicking the seek bar
    function handleClick(e){
    currentSong.currentTime= (e.nativeEvent.offsetX/window.innerWidth)*maxProgress;
  }


  return (
    <div className='h-[5px]'>
      {/* seek bar */}
      <div onClick={handleClick} className="flex h-[5px] w-[100vw] hover:bg-purple-500 transition-all ease-in-out delay-150 cursor-pointer"><div ref={seekerRef} className="flex h-[2px] bg-purple-700 justify-end items-center transition ease-in delay-300"><div className='h-[12px] w-[12px] bg-purple-700 rounded-full'></div></div></div>

      {/* time tags */}
      <div className="flex h-[20px] w-[100vw] flex-col ">
      <div className="flex w-[100%] h-[10px] justify-between text-white text-sm px-5 py-2">
        <h4>{(Math.floor(progress/60)/10 === 0? `0${Math.floor(progress/60)}`: Math.floor(progress/60))}:{Math.floor(Math.floor(progress%60)/10) === 0 ? `0${Math.floor(progress%60)}`: Math.floor(progress%60)}</h4>
        <h4>{Math.floor(maxProgress/60)/10===0? `0${Math.floor(maxProgress/60)}`: Math.floor(maxProgress/60) }:{Math.floor(Math.floor(maxProgress%60)/10)===0? `0${Math.floor(maxProgress%60)}`: Math.floor(maxProgress%60)}</h4>
      </div>
      </div>
    </div>
  )
}

export default SeekBar
