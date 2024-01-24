import React from "react"
const Task=({title,description,iscompleted,updatehandler,id,deletehandler,index})=>{
  return (
    <div className='task'><div><p>{title}</p><span>{description}</span></div>
    <input className="check" onChange={()=>{updatehandler(id)}}
     type="checkbox" checked={iscompleted}/>
    <button onClick={()=>deletehandler(id)}>-</button>
    </div>
  )
}
export default Task