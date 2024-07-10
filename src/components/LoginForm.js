import React, {useState, useRef} from 'react'
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
    let fromRef = useRef(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    let handleSubmit = async (event)=>{
      event.preventDefault();
      
      if(username !== '' || password !==''){
      try{
        const result = await signIn('credentials', {
            username, password, redirect: false,
        })

        if(result.err){ 
            setError('Invalid Credentials');
            return
        }

        router.replace('home');
      }
      catch(err){
        console.log("Error during Login: ", err);
      }
      }
      else{
        setError("All fields are necessary!");
      }
    }
  
  
      return (
        <form ref={fromRef} onSubmit={handleSubmit} className='flex flex-col w-[20vw] h-[50vh] justify-center items-center my-8 border-4 border-white rounded-xl backdrop-blur-lg'>
          <input onChange={(e)=>{ setUsername(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-5 focus:border-purple-700 transition-colors' placeholder='Username' type="text" />
          <input onChange={(e)=>{ setPassword(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-5 focus:border-purple-700 transition-colors' placeholder='Password' type="password" />
          {error && <div className='text-sm text-red-500'>{error}</div>}
          <button className='h-[10%] w-[90%] text-lg my-5 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-transparent hover:to-transparent hover:border-2 hover:border-purple-700 transition ease-in delay-1000'>Sign In</button>
          <Link href={"/register"}><h6 className="text-sm text-white hover:underline hover:text-purple-600">New User? Sign Up.</h6></Link>
        </form>
      );
}

export default LoginForm
