import React, { useState } from 'react'
const Task=({title,description,deltask,index})=>{
  return (
    <div className='task'><div><p>{title}</p><span>{description}</span></div>
    <button onClick={()=>deltask(index)}>-</button></div>
  )
}
export default Task