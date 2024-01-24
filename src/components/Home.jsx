import React, { useEffect } from 'react'
import { useState } from 'react';
import Task from './task';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { Context, server } from '..';
import { useContext } from 'react';
import { Navigate } from 'react-router-dom';


const Home = () => {
    const [tasks,settask]=useState([]);
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const [loading,setloading]=useState(false);
    const {user}=useContext(Context);
    const {isauthenticated}=useContext(Context);
    const submithandler=async(e)=>{
      setloading(true);
      e.preventDefault();
      settask([...tasks,{title,description}]);
      settitle("");
      setdescription("");
      try {
        
        const {data}=await axios.post(`${server}/task/newtask`,{
          title,description
        },{headers:{Authorization:localStorage.getItem("token")}})
        toast.success("task created");
      
        setloading(false);
      } catch (error) {
        toast.error(error.response.data.message);
        
        setloading(false);
      }
    }
    const updatehandler=async(id)=>{
      try {
        const {data}=await axios.put(`${server}/task/${id}`,{},{headers:{Authorization:localStorage.getItem("token")}})
      toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    const deletehandler=async(id)=>{
      try {
        const {data}=await axios.delete(`${server}/task/${id}`,{headers:{Authorization:localStorage.getItem("token")}})
      toast.success(data.message);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
    useEffect(()=>{
      axios.get(`${server}/task/mytask`,{headers:{Authorization:localStorage.getItem("token")}}).then((res)=>settask(res.data.tasks)).catch((error)=>{
        toast.error(error.response.data.message);
      })
    },[tasks]);
    if(!isauthenticated) return <Navigate to={"/login"}/>
    return(
  <div className='container'>
    <form onSubmit={submithandler}>
      <input type='text' placeholder='title' value={title} onChange={(e)=>{
        settitle(e.target.value);
      }}/>
      <textarea placeholder='description' 
       value={description} onChange={(e)=>{
        setdescription(e.target.value);
      }}></textarea>
      <button disabled={loading}>Submit</button><Toaster
      position="top-center"
      reverseOrder={true}
  />
    </form>
  {tasks.map((item,index)=>(
    <Task key={index} title={item.title} description={item.description} iscompleted={item.iscompleted} updatehandler={updatehandler} deletehandler={deletehandler} id={item._id} index={index}/>
  ))}
  </div>)
}

export default Home