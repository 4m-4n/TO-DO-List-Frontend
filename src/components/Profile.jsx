import React, { useContext, useEffect } from 'react'
import { Context, server } from '..';
import axios from 'axios';
import Loader from './Loader';

const Profile = () => {
  const {isauthenticated,loading,setloading,user,setuser, setisauthenticated}=useContext(Context);
  useEffect (()=>{
    setloading(true);
    axios.get(`${server}/users/me`,{headers:{Authorization:localStorage.getItem("token")}}).then(res=>{setuser(res.data.user);
     console.log(user);
      setisauthenticated(true);
      setloading(false)}
     ).catch((error)=>{
        console.log(error);
    setuser({});
setisauthenticated(false);
setloading(false)})},[]);    
  return(
    loading?<Loader/>:(<div className='about'>
      <h1>{user?.name}</h1>
      <p>{user?.email}</p>
    </div>
  ))
}

export default Profile;