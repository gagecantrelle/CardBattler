import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import {useDrop} from 'react-dnd'
import CardRPS from "./card";
import { Button } from 'antd';
import paperString from "../../../styles/paperString";
const cards = [
  {id: 1, text: '🪨'},
  {id: 2, text: '📄'},
  {id: 3, text: '✂️'}
]

function DragAndDrop({gameOn, rounds, nextRound, starterRound, user, mode}:{gameOn: void, rounds: number, nextRound: void, starterRound: number, user: Object, mode: string}) {
  const [board, setBoard] = useState('')
  const [botCard, setBotCard] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false);
  const [dropCard, setDropCard] = useState('')
  const [gameMode, setGameMode] = useState(mode)
  const [{isOver}, drop] = useDrop(()=>({
    accept: 'div',
    drop: ({id, text}: {id: Number, text: String}) => addImage(id),
collect: (monitor) => ({
  isOver: monitor.isOver(),
}),
    
  }))

  const addImage = (id: number) =>{
    switch(id){
case 1:
  setBoard('🪨');
  setDropCard('🪨')
  break;
case 2: 
  setBoard('📄');
  setDropCard('📄')
  break;
case 3: 
  setBoard('✂️');
  setDropCard('✂️')
  break;
default:
  setBoard('');
  setDropCard('')
  break;
    }
  }

const botTurn = (): void =>{
  if(board !== ''){
  setDisabledButton(true)
    const cardNum = Math.floor(Math.random() * 3)
    let playedCard = ''
    if(board !== ''){
    switch(cardNum){
      case 0:
        setBotCard('🪨');
        playedCard='🪨'
        break;
      case 1: 
      setBotCard('📄');
      playedCard='📄'
        break;
      case 2: 
      setBotCard('✂️');
      playedCard='✂️'
        break;
    }
  }

  if(board === '🪨' && playedCard === '📄'){
    setBotScore(botScore + 1)
  }else if(board === '📄' && playedCard === '🪨'){
    setPlayerScore(playerScore + 1)
    setHighScore(highScore + 1)
    }else if(board === '📄' && playedCard === '✂️'){
      setBotScore(botScore + 1)
      }else if(board === '✂️' && playedCard === '📄'){
        setPlayerScore(playerScore + 1)
        setHighScore(highScore + 1)
        }else if(board === '✂️' && playedCard === '🪨'){
          setBotScore(botScore + 1)
          }else if(board === '🪨' && playedCard === '✂️'){
            setPlayerScore(playerScore + 1)
            setHighScore(highScore + 1)
            }
    

    setTimeout(() => {
    nextRound()
    setBoard('')
    setBotCard('')
    setDisabledButton(false)
    }, 3000);
  }else{
    console.warn('⚠️ NO CARD PlAYED: please pick from one of the 3 cards')
  }
  }

  useEffect(()=>{
    if(starterRound === rounds - 1 && gameMode === 'fast'){
      if(playerScore > botScore){
        gameOn('end', true)
      }else if (playerScore < botScore){
        gameOn('end', false)
      }
    }else if(starterRound === rounds){
      if(playerScore > botScore){
        gameOn('end', true)
      }else if (playerScore < botScore){
        gameOn('end', false)
      }else{
      gameOn('end', null)
      }
    }
  },[botTurn])

  return (
<>
<div className=" border-1 border-solid w-60 h-90 relative left-[10vh] bg-white bottom-10">
<div className="relative left-8 top-4 paperText">Rock, Paper, Scissors</div>
<div className="text-blue-200 tracking-tight">━━━━━━━━━━━━━━━</div>
<div className="text-red-200 rotate-90 relative right-22 top-15 tracking-tight">━━━━━━━━━━━━━━━━━━━━━━━</div>
<div className='relative bottom-10 left-8 paperText'>round: {starterRound + 1}</div>
<div className="text-blue-200 relative bottom-14">{paperString}</div>
<div className='relative left-8 bottom-88 paperText'>{user.user_name}: {playerScore}</div>
<div className='relative left-8 bottom-88 paperText'>Card Bot: {botScore}</div>
</div>

<div className="fixed left-[150vh] bottom-[25vh]">
<div className="bg-gray-400 size-[18vh] border-1 border-solid">
<Button onClick={()=>{botTurn()}} shape="circle" disabled={disabledButton} color='red' variant="solid" className="relative left-[4vh] top-[4vh]" style={{height: '10vh', width: '10vh'}}>Play</Button>
</div>
<div className="bg-gray-400 w-[18vh] h-[5vh] border-1 border-solid"></div>
</div>
 
<div className={`fixed left-[105.5vh] bottom-[45vh] ${disabledButton === true ? 'card' : 'border-2 border-dashed w-[10vh] h-[15vh]'}`}>{botCard}</div>
<div className="flex items-center justify-center fixed bottom-0 left-[95vh]">{cards.map((card)=>{
  return <CardRPS text={card.text} id={card.id} dropCard={drop}/>
})}</div>
<div className={`dropOff ${ board !== '' ? 'bg-white rounded-xl' : ''} ${ board !== '' ? 'border-solid ' : ''} fixed left-[105.5vh] bottom-40 `} ref={drop}>
{board}
</div>

<div className="rounded-full bg-gray-300 fixed left-[95vh] top-10 w-[30vh] h-[30vh]">
  <div className="bg-black size-[5vh] relative left-[8vh] top-[5vh]"></div>
  <div className="bg-black size-[5vh] relative left-[18vh]"> </div>
  <div className="bg-black h-[5vh] w-[10vh] relative left-[10vh] top-[10vh]">   </div>
</div>
</>
  );
}

export default DragAndDrop;