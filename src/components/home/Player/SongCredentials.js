import { useState, useEffect} from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
//importing SVGs
import likeFilledSvg from '@/../public/svg/like_dark.svg'
import likeSvg from '@/../public/svg/like_light.svg'
import dislikeFilledSvg from '@/../public/svg/dislike_dark.svg'
import dislikeSvg from '@/../public/svg/dislike_light.svg'

const SongCredentials = ({song}) => {

    let [preference, setPreference] = useState(null);
    let {data: session} = useSession();

    useEffect(()=>{
        fetchLike('fetch');
    }, [song] )

    async function fetchLike(operation, songPreference){
        if(song?.src === null){
          return
        }
    
        try{
          let title = song?.title? song.title: song?.name;
          let username = session?.user.username;
          let preference = songPreference
          const res = await fetch('api/songs/like', {
            method: "POST",
            headers:{
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              title,
              username,
              operation,
              preference
            })
          })
          if(res.ok){
            const result = await res.json();
            let pref = result.data;
            if(pref?.length>0){ 
              setPreference(pref[0].preference);
            }
            else{
              setPreference(null);
            }
          }
        }
        catch(err){
          console.log("Error fetching like songs: ", err);
        }
      }

  return (
    <div className="flex w-[40%] h-[90%] ">
        <div className="flex w-[75%] h-[100%] flex-col justify-evenly items-center">
          <h2 className='text-xl font-bold text-white'>{song?.title !== undefined? song.title: song?.name}</h2>
          <h4 className="text-sm font-medium text-white">{song?.artist}</h4>
        </div>

        {/* like dislike buttons */}
          {(preference === null || preference === undefined)? 
              <div className='flex w-[15%] justify-evenly items-center'>
                <button onClick={async ()=>{

                  setPreference(true);
                  await fetchLike('like', true)

                  }}><Image src={likeSvg} height={20} alt='like song'></Image></button>
                <button onClick={async ()=>{

                  setPreference(false);
                  await fetchLike("dislike", false);

                  }}><Image src={dislikeSvg} height={20} alt='dislike song'></Image></button>
              </div>
            :
             preference === true?
                <button onClick={ async ()=>{

                  setPreference(null);

                  await fetchLike('null', null)
                }}><Image src={likeFilledSvg} height={30} alt='liked song'></Image></button>
              :
                <button onClick={async ()=>{

                  setPreference(null);
                  await fetchLike('null')
                }}><Image src={dislikeFilledSvg} height={30} alt='disliked song'></Image></button>
          }
        </div>
  )
}

export default SongCredentials
