import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import { Context, server } from '..';
import {toast,Toaster} from 'react-hot-toast'
const Register = () => {
    const [name,setname]=useState("");
    const [email,setemail]=useState("");
    const [password,setpass]=useState("");
    const {isauthenticated,setisauthenticated,loading,setloading}=useContext(Context);
    const submithandler=async(e)=>{
      e.preventDefault();
      setloading(true);
     try {
        console.log(name,email,password);
        const {data}= await axios.post(`${server}/users/new`,{
          name,email,password
        }
        );
        console.log(data.message);
        toast.success(data.message);
        setisauthenticated(true);
        setloading(false);
     } catch (error) {
      toast.error(error.response.data.message);

        setisauthenticated(false);
        setloading(false);
     }
    }
    if(isauthenticated) return <Navigate to={"/"}/>
  return (
    <div className='register'>
        <section>
        <form onSubmit={submithandler}>
          <input value={name} onChange={(e)=>{setname(e.target.value)}} type='text' placeholder='Name' required/>
          <input value={email} onChange={(e)=>{setemail(e.target.value)}} type='email' placeholder='email' required/>
          <input value={password} onChange={(e)=>{setpass(e.target.value)}} type='password' placeholder='Password' required/>
          <button type='submit' disabled={loading}>Register</button>
          <Toaster
      position="top-center"
      reverseOrder={true}
  />
          <h4>Or</h4>
          <Link to="/Login">Login</Link>
        </form>
      </section>
    </div>
      
  )
}

export default Register