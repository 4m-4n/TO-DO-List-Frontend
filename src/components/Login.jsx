import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { toast,Toaster } from 'react-hot-toast';
import { Context, server } from '..';
import axios from 'axios';

const Login = () => {
  const {isauthenticated,setisauthenticated,loading,setloading}=useContext(Context);
  const [password,setpass]=useState("");
  const [email,setemail]=useState("");
  const submithandler=async(e)=>{
    e.preventDefault();
    setloading(true);
   try {
      console.log(email,password);
      const res= await axios.post(`${server}/users/login`,{
      email,password
      }
      );
      console.log(res);
      console.log(res.data.message);
      localStorage.setItem("token",res.data.token);
      localStorage.setItem("user",res.data.user);
      toast.success(res.data.message);
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
    <div className='login'>
      <section>
        <form onSubmit={submithandler}>
        <input value={email} onChange={(e)=>{setemail(e.target.value)}} type='email' placeholder='email' required/>
          <input value={password} onChange={(e)=>{setpass(e.target.value)}} type='password' placeholder='Password' required/>
          <button type='submit' disabled={loading}>Login</button>
          <Toaster
      position="top-center"
      reverseOrder={true}
  />
          <h4>Or</h4>
          <Link to="/Register">Sign Up</Link>
        </form>
      </section>
    </div>
  )
}

export default Login;