import React from 'react'
import Image from 'next/image'
import { useState, useRef, useEffect } from 'react'
import returnSvg from '@/../public/svg/return_back.svg'

const CreatePlaylist = ({setCreateMenu, setAddedPlaylist, username}) => {
    const formRef = useRef();
    const inputRef = useRef();
    const [playlistName, setPlaylistName] = useState('white');
    const [borderColor, setBorderColor] = useState()

    async function handleSubmit(e){
        e.preventDefault();

        let formData = new FormData();
        if(img.files[0] !== undefined){
            console.log(img.files[0]);
            formData.append('thumbnail', img.files[0]);
        }


        console.log(formData);  
        if(playlistName === ''){
            setBorderColor('red');
            inputRef.current.style.borderColor = borderColor
            return
        }

        const jsonObj = { playlistName: playlistName,
            usernameCurrent: username
        }

        formData.append('json', JSON.stringify(jsonObj));

        try{
            const res = await fetch('api/playlist/create', {
                method: "POST",
                body: formData
            })
    
            if(res.ok){
                const response = await res.json();
                const result = response.data;
                setAddedPlaylist(true);
                setCreateMenu(false);
            }
        }
        catch(err){
            console.log(err);
        }
        
    }


  return (
    <div ref={formRef} className="flex flex-col h-[82%] w-[90%] bg-zinc-950 rounded-xl items-center justify-start">
        <div className="flex w-[100%] h-[13%] items-center justify-between px-5">
            <button className='w-[20%] h-[100%]' onClick={()=>{setCreateMenu(false)}}><Image src={returnSvg} height={30} alt='go back'></Image></button>
            <h3 className='text-white text-lg text-bold w-[60%] h-[100%] flex items-center justify-center'>Create Playlist</h3>
            <div className='w-[20%] h-[100%]'></div>
        </div>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-start w-[100%] h-[85%]' encType='multipart/form-data'>

        <div className= "h-[150px] w-[150px] bg-zinc-900 rounded-xl flex justify-center items-center">
        <input className='h-[150px] w-[150px] bg-zinc-900 opacity-0 cursor-pointer' type="file" id="img" name="thumbnail" accept="image/*" /> 
        </div>
        <input  ref={inputRef}  onChange={(e)=>{
                setBorderColor("#9502f7")
                inputRef.current.style.borderColor = borderColor
                setPlaylistName(e.target.value)
                }} className='h-[40px] w-[200px] place-items-center bg-black text-white border-b-2 rounded-sm border-white outline-none text-lg px-4 my-5 focus:border-b-4 focus:border-purple-700 transition-all duration-100 py-5' placeholder='Playlist Name' type="text" />
        <button className='w-[100px] h-[40px] border-2 border-purple-700 text-white font-medium rounded-xl hover:bg-purple-700 transition-all delay-75'>Create</button>
        </form>
                
    </div>
  )
}

export default CreatePlaylist
