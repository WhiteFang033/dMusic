import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import returnSvg from '@/../public/svg/return_back.svg'
import SearchResults from './SearchResults'
import noResults from "@/../public/no_results.png"


const Search = ({setSearchStatus, setSongArray}) => {
    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    async function handleSearch(event){
        setSearchValue(event.target.value);
        // if(searchValue === ''){
        //     setSearchResults([])
        //     return
        // }

        try{
            let result = await fetch('api/search/search_songs',{
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                  },
                body: JSON.stringify({searchValue})
            })

            

            if(result.ok){
                let response = await result.json();
                setSearchResults(response.data);
            }
            else{
                console.log("Error fetching data");
            }
        }
        catch(err){
            console.log("ERROR: ", err);
        }
        
        
    }
  return (
    <div className='flex w-[100%] h-[] flex-col items-center'>
        <div className='flex w-[99%] h-[78px] justify-center rounded-xl'>
        <button className='mx-10' onClick={()=>{setSearchStatus(false)}}><Image  src={returnSvg} height={40} alt="go back"></Image></button>
        <input type="text" placeholder='Search song name' value = {searchValue} onChange={handleSearch} className='flex self-center w-[50%] h-[50px] border-none outline-none border-white bg-zinc-700 text-white rounded-full text-2xl px-5 focus:outline-purple-700 focus:outline-1'/>
    </div>
    <div className="flex bg-zinc-950 w-[95%] h-[85%] p-7 rounded-xl flex-col justify-start items-center overflow-x-auto">
        {
            (searchResults.length === 0)?
                <Image src={noResults} height={300} alt='no results found'/>
                :
                searchResults.map((result, index)=>{
                    return <SearchResults key={index} index={index+1} title = {result.name} songSource = {result.src} artist = {result.artist} setSongArray = {setSongArray}/>
                })
        }
    </div>
    </div>
  )
}

export default Search
