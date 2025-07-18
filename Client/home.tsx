import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import "./src/styles/style.css"
import Profile from "./src/components/Profile/profile";
import GameRPS from "./src/components/game/RPS/RPS";
import GameBJ from "./src/components/game/BJ/BJ";
import backGround from './src/styles/images/wood_Block_texture.png'

type User = {
  user_name: string,
  google_id: string,
  lightOrDark: boolean,
  cardColor: string,
  google_avatar: string,
  id: number
};

function Home({user, refresh, darkMode, height, width}: {user: User, refresh: () => void, darkMode: boolean, height: number, width: number}) {
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
    }}className={`top-27 left-18 absolute font-[bubblegum] ${darkMode ? 'lightButton': 'darkButton'}`}>Profile</button>
    <button className={`top-47 left-18 absolute font-[bubblegum] ${darkMode ? 'lightButton': 'darkButton'}`}
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
    }}className={`top-67 left-18 absolute font-[bubblegum] ${darkMode ? 'lightButton': 'darkButton'}`}>Game BJ</button>
      
   </div>
   <div className={`fixed top-0 left-50`}>{active === 'profile' && <Profile user={user} RPS={RPS} BJ={BJ} refresh={refresh} darkMode={darkMode}/>}</div>
   <div className={`fixed top-50 left-50`}>{active === 'gameRPS' && <GameRPS user={user} RPS={RPS} refresh={getGameData} darkMode={darkMode}/>}</div>
   <div className={`fixed top-50 left-50`}>{active === 'gameBJ' && <GameBJ user={user} BJ={BJ} refresh={getGameData} darkMode={darkMode}/>}</div>
</div>
  
 
  );
}


export default Home;