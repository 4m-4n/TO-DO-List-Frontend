import React, { useEffect } from 'react'
import { useState } from 'react';
import Task from './task';


const Home = () => {
    const [tasks,settask]=useState(localStorage.getItem("tasks")?JSON.parse(localStorage.getItem("tasks")):[]);
    const [title,settitle]=useState("");
    const [description,setdescription]=useState("");
    const submithandler=(e)=>{
      e.preventDefault();
      settask([...tasks,{title,description}]);
      settitle("");
      setdescription("");
    }
    const deltask=(index)=>{
    const filteredarr=tasks.filter((val,i)=>{
     return i!==index;
    })
    settask(filteredarr);
    }
    useEffect(()=>{
      localStorage.setItem("tasks",JSON.stringify(tasks));
    },[tasks]);
    
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
      <button>Submit</button>
    </form>
  {tasks.map((item,index)=>(
    <Task key={index} title={item.title} description={item.description} deltask={deltask} index={index}/>
  ))}
  </div>)
}

export default Home