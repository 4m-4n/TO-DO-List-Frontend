import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createContext } from 'react';

export const server="http://localhost:4000/api/v1";
export const Context=createContext({isauthenticated:false});
const Appwrapper=()=>{
  const [isauthenticated,setisauthenticated]=useState(false);
  const [loading,setloading]=useState(false);
  const [user,setuser]=useState({});
  return(
    <Context.Provider value={{isauthenticated,setisauthenticated,loading,setloading,user,setuser}}>
     <App/> 
    </Context.Provider>
  )
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appwrapper /> 
</React.StrictMode>
);

