import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import "./styles/style.css"
import Profile from "./componets/Profile/profile";

function Home({user, refresh, darkmode}: {user: Object, refresh: void, darkmode: Boolean}) {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
const [profilrTrue, setProfileTrue] = useState(false)
const [RPS, setRPS] = useState({})
const [BJ, setBJ] = useState({})
const navigate = useNavigate();

const getGameData = (): void =>{
  axios.get(`/GameRPS/${user.id}`)
  .then(({data})=>{
    setRPS(data)
  })
  .catch((err)=>{
    console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID for RPS TABLE: ', err)
  })
  axios.get(`/GameBJ/${user.id}`)
  .then(({data})=>{
    setBJ(data)
  })
  .catch((err)=>{
    console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID BJ TABLE: ', err)
  })
}

useEffect(()=>{
getGameData()
},[])
  return (
<div >
 <div className={`bg-linear-to-r from-cyan-500 to-blue-500 w-50 fixed top-0 left-0`} style={{  height: `${screenHeight}px`}}>
    <button onClick={()=>{ 
      let test = profilrTrue ? false : true
      setProfileTrue(test)}}
      className={`hover:${darkmode ? 'text-neutral-900': 'text-white' } top-27 left-18 absolute font-[bubblegum] ${user.lightOrDark ? 'text-neutral-900' : 'text-neutral-100'}`}>Profile</button>
    <button className="hover:text-white top-47 left-18 absolute font-[bubblegum] dark:text-neutral-100">Game RPS</button>
      <button className="hover:text-white top-67 left-18 absolute font-[bubblegum] dark:text-neutral-100">Game BJ</button>
      
   </div>
   <div className={`fixed top-0 left-50`}>{profilrTrue && <Profile user={user} RPS={RPS} BJ={BJ} refresh={refresh}/>}</div>
</div>
  
 
  );
}


export default Home;