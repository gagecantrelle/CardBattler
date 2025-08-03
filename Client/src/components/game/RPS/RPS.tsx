import { useState } from "react";
import "../../../styles/style.css"
import { DndProvider} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import {Input, Checkbox} from 'antd'
import type { CheckboxProps } from 'antd';
import { EnterOutlined } from '@ant-design/icons'
import DragAndDrop from "./DragAndDropRPS";
import axios from "axios"

import paper from '../../../styles/images/Screenshot paper.png'

type Rps ={
    id: number,
    user_id: number,
    highScore: number,
    win: number,
    lose: number
}

function GameRPS({user, RPS, refresh, darkMode}: {user: Object, RPS: Rps, refresh: () => void, darkMode: Boolean}) {
const [rounds, setRounds] = useState(3)
const [starterRound, setStarterRound] = useState(0)
const [gameStart, setGameStart] = useState(false)
const [highScore, setHighScore] = useState(0)
const [won, setWon] = useState('none')
const [mode, setMode] = useState('normal')

const gameOn = (status: string, win: boolean): void =>{
  const str: string = `/RPSUpdate/${RPS.id}`
if(status === 'start'){
  setGameStart(true)
}else if(status === 'end'){
  setGameStart(false)
  setStarterRound(0)
  if(win){
  const scoreCheck: number = highScore + 1
    setWon('player')
if(scoreCheck > RPS.highScore){
  console.log(scoreCheck > RPS.highScore, scoreCheck, RPS.highScore)
axios.patch(str,{highScore: scoreCheck, win: RPS.win + 1, lose: RPS.lose})
.then(()=>{
  refresh()
})
.catch((err)=>{
  console.error('ERROR CAN\'T UPDATE WIN COUNT AND HIGHSCORE: ', err)
})
}else{
axios.patch(str,{highScore: RPS.highScore, win: RPS.win + 1, lose: RPS.lose})
.then(()=>{
  setHighScore(scoreCheck)
  refresh()
})
.catch((err)=>{
  console.error('ERROR CAN\'T UPDATE WIN COUNT: ', err)
})
}
  }else if(win === false && win !== null){
    setHighScore(0)
    setWon('bot')
    axios.patch(str,{highScore: RPS.highScore, win: RPS.win, lose: RPS.lose + 1})
.then(()=>{
  refresh()
})
.catch((err)=>{
  console.error('ERROR CAN\'T UPDATE LOSE COUNT: ', err)
})
  }else if(win === null){
    setWon('tie')
    setHighScore(0)
  }
}
} 

const howManyRounds = (num: string): void =>{
  if(num === undefined || num === '0'){
    setRounds(3)
  }else{
    setRounds(parseFloat(num))
  }
}

const nextRound = (): void => {
setStarterRound(starterRound + 1)
}

const gameMode: CheckboxProps['onChange'] = (e) => {
  console.log(`checked = ${e.target.checked}`);
  if(e.target.checked ===false){
    setMode('normal')
  }else{
    setMode('fast')
  }
};

  return (
 <DndProvider backend={HTML5Backend}>
 {gameStart === false && <>
  <div>
    <img src={paper} className="h-120 w-90"></img>
    <button onClick={()=>{gameOn('start', null)}} className={`${darkMode ? 'lightButton': 'darkButton'} relative bottom-37 left-6 paperText`}> start game</button>
    <div className="w-10 relative bottom-30 left-6 paperText">rounds:<Input placeholder="3" onInput={(e)=>{howManyRounds((e.target as HTMLInputElement).value)}} className="relative bottom-7 left-12" style={{border: '1px dashed rgb(6, 182, 212)'}}></Input></div>
  <Checkbox onChange={gameMode} className='relative bottom-32 left-0.5'><div className="paperText">Fast mode</div></Checkbox>
  <div className="absolute left-51 bottom-95" style={{ fontSize: '10vh' }}>📄</div>
<div className="absolute left-32 bottom-75" style={{ fontSize: '10vh' }}>🪨</div>
<div className="absolute left-15 bottom-95" style={{ fontSize: '10vh' }}>✂️</div>
<EnterOutlined style={{ fontSize: '10vh' }} className="absolute bottom-85 left-20 z-6" rotate={105}/>
<EnterOutlined style={{ fontSize: '10vh' }} className="absolute bottom-109 left-36 z-6" rotate={220}/>
<EnterOutlined style={{ fontSize: '10vh' }} className="absolute bottom-82.5 left-52.5 z-6" rotate={-9}/>
  </div>
  </>}
   {gameStart && <DragAndDrop gameOn={gameOn} rounds={rounds} nextRound={nextRound} starterRound={starterRound} user={user} mode={mode}/>} 
 </DndProvider>
  );
}

export default GameRPS;