import React from 'react'
import { useState } from 'react';

const SideMenu= () => {

const [searchValue, setSearchValue] = useState("");
const [searchResults, setSearchResults] = useState([]);

async function handleSearch(event){
    setSearchValue(event.target.value);
    // if(searchValue === ''){
    //     setSearchResults([])
    //     return
    // }
    
    
}

  return (
    <div className="flex flex-col justify-evenly items-center w-[100%] h-[100%]">
        <div className="flex w-[90%] h-[45%] bg-zinc-950 rounded-xl justify-center p-3">
            <h2 className='text-2xl text-white font-semibold'>Notifications</h2>
        </div>
        <div className="flex flex-col items-center w-[90%] h-[45%] bg-zinc-950 rounded-xl p-5">
        <input type="text" placeholder='Search Users' value = {searchValue} onChange={handleSearch} className='flex w-[90%] h-[40px] border-none outline-none border-white bg-zinc-900 text-white rounded-full text-xl px-5 focus:outline-purple-700 focus:outline-1'/>
        </div>
    </div>
  )
}

export default SideMenu
