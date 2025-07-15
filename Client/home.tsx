import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import "./styles/style.css"
import Profile from "./components/Profile/profile";
import GameRPS from "./components/game/RPS/RPS";
import GameBJ from "./components/game/BJ/BJ";
import backGround from './styles/images/wood_Block_texture.png'

function Home({user, refresh, darkmode, height, width}: {user: Object, refresh: void, darkmode: Boolean, height: number, width: number}) {
const [RPS, setRPS] = useState({})
const [BJ, setBJ] = useState({})
const [active, setActive] = useState('')
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
// height: `${screenHeight}px`, width: `${screenWidth}px`
  return (
<div >
  <img src={backGround} style={{height: `${height}px`,  width: `${width}px`}} ></img>
 <div className={`bg-linear-to-r from-cyan-500 to-blue-500 w-50 fixed top-0 left-0 z-1`} style={{  height: `${height}px`}}>
    <button onClick={()=>{ 
     if(active === 'profile'){
      setActive('')
     }else{
      setActive('profile')
     }
    }}className={`top-27 left-18 absolute font-[bubblegum] ${darkmode ? 'lightButton': 'darkButton'}`}>Profile</button>
    <button className={`top-47 left-18 absolute font-[bubblegum] ${darkmode ? 'lightButton': 'darkButton'}`}
    onClick={()=>{
      if(active === 'gameRPS'){
        setActive('')
       }else{
        setActive('gameRPS')
       }
    }}>Game RPS</button>
      <button onClick={()=>{ 
     if(active === 'BJ'){
      setActive('')
     }else{
      setActive('gameBJ')
     } 
    }}className={`top-67 left-18 absolute font-[bubblegum] ${darkmode ? 'lightButton': 'darkButton'}`}>Game BJ</button>
      
   </div>
   <div className={`fixed top-0 left-50`}>{active === 'profile' && <Profile user={user} RPS={RPS} BJ={BJ} refresh={refresh} darkmode={darkmode}/>}</div>
   <div className={`fixed top-50 left-50`}>{active === 'gameRPS' && <GameRPS user={user} RPS={RPS} refresh={getGameData} darkmode={darkmode}/>}</div>
   <div className={`fixed top-50 left-50`}>{active === 'gameBJ' && <GameBJ user={user} BJ={BJ} refresh={getGameData} darkmode={darkmode}/>}</div>
</div>
  
 
  );
}


export default Home;