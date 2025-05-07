import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import {Input} from 'antd'
import DragAndDrop from "./DragAndDrop";
//import backGround from '../../../styles/images/th.jpg'


//import backGround from './styles/images/wood_Block_texture.png'

function GameRPS({user, RPS, refresh, darkmode}: {user: Object, RPS: Object, refresh: Object, darkmode: Boolean}) {
const [rounds, setRounds] = useState(3)
const [starterRound, setStarterRound] = useState(0)
const [gameStart, setGameStart] = useState(false)
const [winner, setWinner] = useState('none')

const gameOn = (status: string, highscore: number, win: string): void =>{
if(status === 'start'){
  setGameStart(true)
}else if(status === 'end'){
  setGameStart(false)
  setStarterRound(0)
  setWinner(win)
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

  return (
 <DndProvider backend={HTML5Backend}>
 {gameStart === false && <div className="rounded-xl w-22 h-30 relative left-20 bg-white">
    <button onClick={()=>{gameOn('start', null, null)}} className={`${darkmode ? 'lightButton': 'darkButton'}`}>start game</button>
    <div>rounds:</div>
    <Input placeholder="3" onInput={(e)=>{howManyRounds(e.target.value)}}></Input>
  
    <div>{winner} won</div>
  </div>}

  <div>
   {gameStart && <DragAndDrop gameOn={gameOn} rounds={rounds} nextRound={nextRound} starterRound={starterRound}/>} 
  </div>
 </DndProvider>
  );
}

export default GameRPS;