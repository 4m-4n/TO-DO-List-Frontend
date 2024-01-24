import React, { useContext, useEffect } from 'react';
import './App.css';

import Footer from './components/Footer';
import Home from './components/Home';
import Header from './components/header';
import { BrowserRouter } from 'react-router-dom';
import { Route,Routes } from 'react-router-dom';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import { Context, server } from '.';
import axios from 'axios';
 export function App() {
  const {setuser,setisauthenticated}=useContext(Context);
 useEffect (()=>{
    axios.get(`${server}/users/me`,{headers:{Authorization:localStorage.getItem("token")}}).then(res=>{setuser(res.data.user);

      setisauthenticated(true)}).catch((error)=>{
        console.log(error);
    setuser({});
setisauthenticated(false);})},[]);      
                                
  return (
    <BrowserRouter>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Profile' element={<Profile/>}/>
      <Route path='/Login' element={<Login/>}/>
      <Route path='/Register' element={<Register/>}/>
    </Routes>
    <Footer/>
    </BrowserRouter>
  );
}

export default App;
