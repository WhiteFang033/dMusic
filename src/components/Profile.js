import React, { useState } from 'react'
import Image from 'next/image'
import userSvg from '@/../public/svg/user.svg'
import { useSession, signOut } from 'next-auth/react'
import { useEffect} from 'react'
import Loading from './utilities/Loading'

const Profile = () => {
    const [menuHidden, setMenuHidden] = useState(true);
    const { data: session, status } = useSession();
    const [usernameCurrent, setUsernameCurrent] = useState();
    const [user, setUser] = useState();
    useEffect(() => {
        if (session?.user?.username) {
          setUsernameCurrent(session.user.username);
        }
          fetchUserDetails()
      });
    
      if (status === 'loading') {
        return <Loading />;
      }
  
      async function fetchUserDetails(){
          let username = usernameCurrent;
  
          try{
              const res = await fetch('api/user/details', {
                  method: "POST",
                  body: JSON.stringify({username})
              });
  
              if(res.ok){
                  const response = await res.json();
                  const userData = response.data
                  setUser(userData[0]);
                  console.log(user)
              }
          }
          catch(err){
              console.log("Error fetching user details: ", err);
          }
      }
    
    


    function handleClick(){
        if(menuHidden){
            setMenuHidden(false);
        }
        else{
            setMenuHidden(true);
        }
    }
  return (
    <div>
        <button onClick={handleClick}><Image src={userSvg} height={30} alt='profile'></Image></button>
    {!menuHidden && 
        <div className='absolute flex flex-col w-[330px] h-[420px] bg-zinc-800 top-[20px] right-[50px] rounded-xl justify-center items-center'>
            <div className="h-[90%] w-[90%] bg-zinc-950 rounded-xl flex flex-col items-center justify-center">
            <div className='w-[100%] h-[80%]  flex flex-col items-center justify-center'>
            <div className="h-[10%] w-[90%] flex items-center justify-center my-2">
                <h2 className='text-2xl font-bold'>{user?.first_name} {user?.last_name}</h2>
            </div>
            <div className="h-[10%] w-[90%] flex items-center justify-center my-2">
                <h4 className='text-lg font-light'>{user?.username}</h4>
            </div>
            <div className="h-[10%] w-[90%] flex items-center justify-center my-2">
                <h4 className='text-xl font-normal'>{user?.email}</h4>
            </div>
            </div>
            <button onClick={()=>{signOut()}} className='text-white text-lg font-light underline'>Log Out</button>
            </div>
        </div>
    }
    </div>
  )
}

export default Profile
