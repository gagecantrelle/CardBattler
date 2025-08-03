import { act, useEffect, useState } from "react";
import axios from "axios"
import "./src/styles/style.css"
import Profile from "./src/components/Profile/profile";
import GameRPS from "./src/components/game/RPS/RPS";
import GameBJ from "./src/components/game/BJ/BJ";
import backGround from './src/styles/images/wood_Block_texture.png'
import { HomeOutlined } from "@ant-design/icons"

type User = {
  user_name: string,
  google_id: string,
  lightOrDark: boolean,
  cardColor: string,
  google_avatar: string,
  id: number
};

type Games = {
   id: number,
    user_id: number,
    highScore: number,
    win: number,
    lose: number
}

function Home({user, refresh, darkMode}: {user: User, refresh: () => void, darkMode: boolean}) {
const [RPS, setRPS] = useState<Games | null>(null)
const [BJ, setBJ] = useState<Games | null>(null)
const [active, setActive] = useState('')
const [hideButtons, setHideButtons] = useState(true)
const [pendingAnimation, setPendingAnimation] = useState(false)


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
  <img src={backGround} style={{height: '100dvh',  width: '100dvw'}} ></img>
 <div onAnimationStart={()=>{setHideButtons(true)}} className={`bg-linear-to-r from-cyan-500 to-blue-500 fixed top-0 left-0 z-1 ${pendingAnimation === false ? 'animate-homeIn' : 'animate-homeOut'}`} onAnimationEnd={()=>{setTimeout(() => {
setHideButtons(false)
 }, 25);}}>
  {hideButtons === false && <>
  <button onClick={()=>{ 
     if(active === 'profile'){
      setPendingAnimation(false)
      setTimeout(() => {
        setActive('')
      }, 1000);
     }else{
      setPendingAnimation(true)
      setTimeout(() => {
        setActive('profile')
      }, 1000);
     }
    }}className={`top-27 left-10 absolute font-[bubblegum] ${darkMode ? 'lightButton' : 'darkButton'} ${active !== ''? 'hidden' : ''}`}>Profile</button>
    <button className={`top-47 left-10 absolute font-[bubblegum] ${darkMode ? 'lightButton' : 'darkButton'} ${active !== '' ? 'hidden' : ''}`}
    onClick={()=>{
      if(active === 'gameRPS'){
      setPendingAnimation(false)
      setTimeout(() => {
        setActive('')
      }, 1000);
       }else{
        setPendingAnimation(true)
        setTimeout(() => {
        setActive('gameRPS')
      }, 1000);
       }
    }}>Game RPS</button>
      <button onClick={()=>{ 
     if(active === 'BJ'){
      setPendingAnimation(false)
      setTimeout(() => {
      setActive('')
      }, 1000);
     }else{
      setPendingAnimation(true)
      setTimeout(() => {
      setActive('gameBJ')
      }, 1000);
     } 
    }}className={`top-67 left-10 absolute font-[bubblegum] ${darkMode ? 'lightButton': 'darkButton'} ${active !== '' ? 'hidden' : ''}`}>Game BJ</button>
    <button onClick={()=>{ 
      setActive('') 
      setPendingAnimation(false)
      }}className={`top-1 left-[1.5vw] absolute font-[bubblegum] ${darkMode ? 'lightButton': 'darkButton'} ${active !== '' && hideButtons === false ? '' : 'hidden'}`}><HomeOutlined style={{ fontSize: '5vh' }}/></button>
  </>}
    
   </div>
   <div className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>{active === 'profile' && <Profile user={user} RPS={RPS} BJ={BJ} refresh={refresh} darkMode={darkMode}/>}</div>
   <div className={`fixed top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>{active === 'gameRPS' && <GameRPS user={user} RPS={RPS} refresh={getGameData} darkMode={darkMode}/>}</div>
   <div className={`fixed top-50 left-50`}>{active === 'gameBJ' && <GameBJ user={user} BJ={BJ} refresh={getGameData} darkMode={darkMode}/>}</div>
</div>
  );
}

export default Home;