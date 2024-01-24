import React from 'react'
import { useContext } from 'react'
import {Link} from 'react-router-dom'
import { Context, server } from '..'
import axios from 'axios'
import {toast} from 'react-hot-toast'

const Header = () => {
  const {isauthenticated,setisauthenticated,loading,setloading}=useContext(Context);
  const Logouthandler=async(e)=>{
    setloading(true);
   try {
      const {data}= await axios.get(`${server}/users/logout`);
      console.log(data.message);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      toast.success(data.message);
      setisauthenticated(false);
      setloading(false);
   } catch (error) {
      toast.error(error.response.data.message);
      setisauthenticated(true);
      setloading(false);
   }
  }
  return (
    <>
    <nav>Here are your To-do Tasks!</nav>
    <div className='header'>
    <Link to="/">Home</Link>
    <Link to="/Profile">Profile</Link>
    
    {isauthenticated?(<button className='btn' onClick={Logouthandler} disabled={loading}>Logout</button>):(<Link to="/Login">Login</Link>)}
    </div>
    </>
  )
}

export default Header;