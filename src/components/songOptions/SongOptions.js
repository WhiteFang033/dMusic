import React from 'react'
import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { useSession } from 'next-auth/react'
import DotMenuSvg from '@/../public/svg/dot_menu.svg'
const SongOptions = ({songTitle, songArtist}) => {
    const [optionsHidden, setOptionsHidden] = useState(true);
    const [playlists, setPlaylists] = useState([]);
    const {data: session, status} = useSession();
    const [usernameCurrent, setUsernameCurrent] = useState();
    const optionsRef = useRef();
    useEffect(() => {
        if (session?.user?.username) {
          setUsernameCurrent(session.user.username);
        }
        if(optionsHidden === false){
            fetchPlaylists()
        }
    
      }, [session, optionsHidden]);
    
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

    async function handleButtonClick(e){
        setOptionsHidden(true);
        let playlistName = e.target.innerHTML;
        let title = songTitle;
        let artist = songArtist;

        try{
            const res = await fetch('api/playlist/addSong',{
                method: "POST",
                body: JSON.stringify({
                    playlistName,
                    title,
                    artist,
                    usernameCurrent
                })
            })

            if(res.ok){
                let response = await res.json();
                let result = response.data
            }
        }
        catch(err){
            console.log(err);
        }
    }

    document.addEventListener("click", (e)=>{
        if(e.target.matches('.options')){
            return
        }
        else{
            setOptionsHidden(true);
        }
    })
  return (
    <div className='relative options z-10'>
        {optionsHidden?
            <button onClick={()=>{setOptionsHidden(false)}}><Image className='options' src={DotMenuSvg} height={15} alt='options'></Image></button>
        :
            <div className="relative top-[100px] flex flex-col min-h-[200px] w-[200px] bg-zinc-950 rounded-xl items-center">
                <div className="flex h-[50px] w-[95%] items-center justify-start border-b-2 border-zinc-500 px-5 mb-2">
                    <h3 className='text-white text-lg font-semibold'>Add To Playlist</h3>
                </div>
                <div className="flex flex-col w-[100%] min-h-[150px] justify-start items-center text-white text-lg">
                    {
                        playlists.map((playlist, index)=>{
                            return <button onClick={handleButtonClick} key={index} data-playlistName={playlist.playlist_name} className='options w-[100%] h-[50px] hover:bg-zinc-900 rounded-xl'>{playlist.playlist_name}</button>
                        })
                    }
                </div>
            </div>
    }
    </div>
  )
}

export default SongOptions
