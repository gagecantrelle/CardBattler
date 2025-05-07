import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import DragAndDrop from "./DragAndDrop";
//import backGround from '../../../styles/images/th.jpg'


//import backGround from './styles/images/wood_Block_texture.png'

function GameRPS({user, RPS, refresh, darkmode}: {user: Object, RPS: Object, refresh: Object, darkmode: Boolean}) {
const [rounds, setRounds] = useState(3)
const [gameStart, setGameStart] = useState(false)

const gameOn = (status: string, highscore: number, win: number, loss: number): void =>{
if(status === 'start'){
  setGameStart(true)
}else if(status === 'start'){
  setGameStart(false)
  console.log('highScore: ', highscore, ' win: ', win, ' loss: ', loss)
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
setRounds(rounds - 1)
console.log('next round')
}

  return (
 <DndProvider backend={HTML5Backend}>
  <div className="rounded-xl w-22 h-30 relative left-20 bg-white">
    <button onClick={()=>{gameOn('start', null, null, null)}} className={`${darkmode ? 'lightButton': 'darkButton'}`}>start game</button>
    <div>rounds:</div>
    <input placeholder="3" className="relative left-12 bottom-6 border-2 border-solid w-8" onInput={(e)=>{howManyRounds(e.target.value)}}></input>
  </div>

  <div>
   {gameStart && <DragAndDrop gameOn={gameOn} rounds={rounds} nextRound={nextRound}/>} 
  </div>
 </DndProvider>
  );
}

export default GameRPS;