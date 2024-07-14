"use client"
import Link from 'next/link';
import React, {useState, useRef} from 'react'
import { redirect } from 'next/dist/server/api-utils';

const RegisterForm = () => {
  
  let fromRef = useRef(null);
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let handleSubmit = async (event)=>{
    event.preventDefault();
    
    if(username !== '' && password !=='' && email !== '' && name !== ''){
      if(username.length<3){
        setError("Username must be greater than 2 characters.")
        return
      }
      if(password.length<3){
        setError("Password must be greater than 2 characters.")
        return
      }

    try{
      const result = await fetch('api/register', {
        method: "POST",
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username,
          name,
          email,
          password,
        }),
      })

      if(result.ok){
        let response = await result.json();
        if(response.message !== undefined){
          fromRef.current.reset();
          redirect('/login')
          setError('')
        }
        else if(response.error !== undefined){
          setError(response.error)
        }
      }
      else{
        console.log("User Registration Failed")
      }
    }
    catch(err){
      console.log("Error during registration: ", err);
    }
    }
    else{
      setError("All fields are necessary!");
    }
  }


    return (
      <form ref={fromRef} onSubmit={handleSubmit} className='flex flex-col w-[20vw] h-[55vh] justify-evenly items-center my-8 border-4 border-white rounded-xl backdrop-blur-lg'>
        <input onChange={(e)=>{ setUsername(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-2 focus:border-purple-700 transition-colors' placeholder='Username' type="text" />
        <input onChange={(e)=>{ setName(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-2 focus:border-purple-700 transition-colors' placeholder='Name' type="text" />
        <input onChange={(e)=>{ setEmail(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-2 focus:border-purple-700 transition-colors' placeholder='Email' type="text" />
        <input onChange={(e)=>{ setPassword(e.target.value)}} className='h-[10%] w-[90%] bg-black text-white border-b-2 border-white outline-none text-lg px-4 rounded-sm my-2 focus:border-purple-700 transition-colors' placeholder='Password' type="password" />
        <div className='h-[5%] w-[90%] flex justify-center items-center '>{error && <div className='text-sm text-red-500'>{error}</div>}</div>
        <button className='h-[10%] w-[90%] text-lg my-5 rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-br hover:from-transparent hover:to-transparent hover:border-2 hover:border-purple-700 transition ease-in delay-1000'>Register</button>
        <Link href={"/login"}><h6 className="text-sm text-white hover:underline hover:text-purple-600">Already Registered? Log In.</h6></Link>
      </form>
    );
}

export default RegisterForm;
