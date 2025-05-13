import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import {Input, Checkbox} from 'antd'
import type { CheckboxProps } from 'antd';
import DragAndDrop from "./DragAndDrop";
import axios from "axios"

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
 {gameStart === false && <div className="rounded-xl w-22 h-30 relative left-20 bg-white">
    <button onClick={()=>{gameOn('start', null, null)}} className={`${darkmode ? 'lightButton': 'darkButton'}`}>start game</button>
    <div>rounds:</div>
    <Input placeholder="3" onInput={(e)=>{howManyRounds(e.target.value)}}></Input>
  <Checkbox onChange={gameMode}>Fast mode</Checkbox>
    <div>{won} won</div>
  </div>}

  <div>
   {gameStart && <DragAndDrop gameOn={gameOn} rounds={rounds} nextRound={nextRound} starterRound={starterRound} user={user} mode={mode}/>} 
  </div>
 </DndProvider>
  );
}

export default GameRPS;