import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import {Input, Checkbox} from 'antd'
import type { CheckboxProps } from 'antd';
import { EnterOutlined } from '@ant-design/icons'
import DragAndDrop from "./DragAndDrop";
import axios from "axios"
import paper from "../../../styles/paperString";

function GameRPS({user, RPS, refresh, darkmode}: {user: Object, RPS: Object, refresh: void, darkmode: Boolean}) {
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

const howManyRounds = (num: number): void =>{
  if(num === undefined || num === 0){
    setRounds(3)
  }else{
    setRounds(num)
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
  <div className="bg-white fixed w-[40vh] h-[60vh] left-[93vh] bottom-[24vh] bottom-[18vh] border-1 border-solid">
    <div className="text-red-200 rotate-90 relative right-30 top-33 tracking-tight">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
    <div className="text-blue-200 tracking-tight">━━━━━━━━━━━━━━━━━━</div>
    <div className="text-blue-200 relative">{paper.paperString2}</div>
    <button onClick={()=>{gameOn('start', null, null)}} className={`${darkmode ? 'lightButton': 'darkButton'} relative bottom-[21vh] left-6 paperText`}> start game</button>
    <div className="w-10 relative bottom-[18vh] left-6 paperText">rounds:<Input placeholder="3" onInput={(e)=>{howManyRounds(e.target.value)}} className="relative bottom-[3.5vh] left-12"></Input></div>
  <Checkbox onChange={gameMode} className='relative bottom-[19vh] left-1'><div className="paperText">Fast mode</div></Checkbox>
  </div>
<div className="fixed left-[98vh] top-[25vh]" style={{ fontSize: '10vh' }}>📄</div>
<div className="fixed left-[115vh] top-[25vh]" style={{ fontSize: '10vh' }}>🪨</div>
<div className="fixed left-[105vh] top-[39vh]" style={{ fontSize: '10vh' }}>✂️</div>
<EnterOutlined style={{ fontSize: '10vh' }} className="fixed bottom-[52vh] left-[98vh] z-6" rotate={105}/>
<EnterOutlined style={{ fontSize: '10vh' }} className="fixed bottom-[69vh] left-[109vh] z-6" rotate={220}/>
<EnterOutlined style={{ fontSize: '10vh' }} className="fixed bottom-[51vh] left-[115vh] z-6" rotate={-9}/>
  </>}




  <div>
   {gameStart && <DragAndDrop gameOn={gameOn} rounds={rounds} nextRound={nextRound} starterRound={starterRound} user={user} mode={mode}/>} 
  </div>
 </DndProvider>
  );
}

export default GameRPS;