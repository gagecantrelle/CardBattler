import React, { useEffect, useState } from "react";
import "../../styles/style.css"
import {useDrop} from 'react-dnd'
import CardRPS from "./cardRPS";
import { Button } from 'antd';
import paper from "../../styles/paperString";
import cards from "../../styles/cards"

function DragAndDrop({gameOn, rounds, nextRound, starterRound, user, mode}:{gameOn: void, rounds: number, nextRound: void, starterRound: number, user: Object, mode: string}) {
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [deck, setDeck] = useState<Array<{ id: number; num: number; type: string }>>(cards.Bj)
  const [playerHand, setPlayerHand] = useState([])
  const [botHand, setBotHand] = useState([])
  const [turn, setTurn] = useState('player')
  const [disabledButton, setDisabledButton] = useState(false);
  const [gameMode, setGameMode] = useState(mode)
  const [botWin, setBotWin] = useState('bg-black')
  
  const [{isOver}, drop] = useDrop(()=>({
    accept: 'div',
    drop: () => addCard(),
collect: (monitor) => ({
  isOver: monitor.isOver(),
}),
    
  }))

const removeCard = ():{ id: number, num: number, type: string } =>{
let deckCards: number = deck.length;
let cardId: number = Math.floor(Math.random()*deckCards )
let selectedCard = deck[cardId]
let newDeck = deck.filter((c, index)=>{ index !== cardId})

setDeck(newDeck)
return selectedCard;
  }
  
  const addCard = ():void =>{
if(turn === 'player'){
let cardsInHands = playerHand
cardsInHands.push(removeCard);
setPlayerHand(cardsInHands)
}else{
let cardsInHands = botHand
cardsInHands.push(removeCard);
setBotHand(cardsInHands)
}
  }


const botTurn = (): void =>{
  
    // setTimeout(() => {
    // nextRound()
    // setBotWin('bg-black')
    // setDisabledButton(false)
    // }, 2000);
  // }else{
  //   console.warn('⚠️ NO CARD PlAYED: please pick from one of the 3 cards')
  // }
  }

  // useEffect(()=>{
  //   if(starterRound === rounds - 1 && gameMode === 'fast'){
  //     if(playerScore > botScore){
  //       gameOn('end', true)
  //     }else if (playerScore < botScore){
  //       gameOn('end', false)
  //     }
  //   }else if(starterRound === rounds){
  //     if(playerScore > botScore){
  //       gameOn('end', true)
  //     }else if (playerScore < botScore){
  //       gameOn('end', false)
  //     }else{
  //     gameOn('end', null)
  //     }
  //   }
  // },[botTurn, addCard])

  return (
<>
<div className=" border-1 border-solid w-60 h-90 relative left-[10vh] bg-white bottom-10">
<div className="relative left-8 top-4 paperText">Rock, Paper, Scissors</div>
<div className="text-blue-200 tracking-tight">━━━━━━━━━━━━━━━</div>
<div className="text-red-200 rotate-90 relative right-22 top-15 tracking-tight">━━━━━━━━━━━━━━━━━━━━━━━</div>
<div className='relative bottom-10 left-8 paperText'>round: {starterRound + 1}</div>
<div className="text-blue-200 relative bottom-14">{paper.paperString}</div>
<div className='relative left-8 bottom-88 paperText'>{user.user_name}: {playerScore}</div>
<div className='relative left-8 bottom-88 paperText'>Card Bot: {botScore}</div>
</div>

<div className="fixed left-[150vh] bottom-[25vh]">
<div className="bg-gray-400 size-[18vh] border-1 border-solid">
<Button onClick={()=>{botTurn()}} shape="circle" disabled={disabledButton} color='red' variant="solid" className="relative left-[4vh] top-[4vh]" style={{height: '10vh', width: '10vh'}}>Play</Button>
</div>
<div className="bg-gray-400 w-[18vh] h-[5vh] border-1 border-solid"></div>
</div>
 
<div className={`fixed left-[105.5vh] bottom-[45vh] ${disabledButton === true ? 'card border-solid border-2 ' + cardBgBotColor : 'border-2 border-dashed w-[10vh] h-[15vh]'}`}>{botCard}</div>
{/* <div className="flex items-center justify-center fixed bottom-0 left-[95vh]">{cards.Bj.map((card)=>{
  return <CardRPS text={card.text} id={card.id} dropCard={dropCard}/>
})}</div> */}
{/* <div className={`dropOff ${ board !== '' ? 'border-solid border-2 ' + cardBgColor : ''} fixed left-[105.5vh] bottom-40 `} ref={drop}>
{board}
</div> */}

<div className="animate-headBounce rounded-full bg-gray-300 fixed left-[95vh] top-10 w-[30vh] h-[30vh]">
  <div className={`animate-eyeBounce ${botWin} size-[5vh] relative left-[8vh] top-[5vh]`}><div className="rounded-full bg-white size-[3vh] relative left-2 top-2" style={{visibility: botWin[3] === 'g' ? "" : "hidden"}}></div><div className="" style={{visibility: botWin[3] === 't' ? "" : "hidden"}}><div className=" bg-red-500 w-9.5 h-5 rotate-50 "></div><div className=" bg-red-500 w-9.5 h-5 relative bottom-5 -rotate-50 "></div></div></div>
  <div className={`animate-eyeBounce ${botWin} size-[5vh] relative left-[18vh]`}><div className="rounded-full bg-white size-[3vh] relative left-1 top-2" style={{visibility: botWin[3] === 'g' ? "" : "hidden"}}></div><div className="" style={{visibility: botWin[3] === 't' ? "" : "hidden"}}><div className=" bg-red-500 w-9.5 h-5 rotate-50 "></div><div className=" bg-red-500 w-9.5 h-5 relative bottom-5 -rotate-50 "></div></div></div>
  <div className="bg-black h-[5vh] w-[10vh] relative left-[10vh] top-[10vh]" style={{visibility: botWin[3] === 't' ? "hidden" : ""}}>   </div>
</div>
</>
  );
}
//style={{visibility: botWin[3] === 'r' ? "" : "hidden"}}
export default DragAndDrop;