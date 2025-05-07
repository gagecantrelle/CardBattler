import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import {useDrop} from 'react-dnd'
import CardRPS from "./card";
import { type } from "os";
const cards = [
  {id: 1, text: '🪨'},
  {id: 2, text: '📄'},
  {id: 3, text: '✂️'}
]

function DragAndDrop({gameOn, rounds, nextRound}:{gameOn: void, rounds: number, nextRound: void}) {
  const [board, setBoard] = useState('')
  const [botCard, setBotCard] = useState('')
  const [playerScore, setPlayerScore] = useState(0)
  const [botScore, setBotScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [disabledButton, setDisabledButton] = useState(false);
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
  break;
case 2: 
  setBoard('📄');
  break;
case 3: 
  setBoard('✂️');
  break;
default:
  setBoard('');
  break;
    }
  }

const botTurn = (): void =>{
  setDisabledButton(true)
    const cardNum = Math.floor(Math.random() * 3)
    let playedCard = ''
    console.log(cardNum)
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
    }else if(board === '📄' && playedCard === '✂️'){
      setBotScore(botScore + 1)
      }else if(board === '✂️' && playedCard === '📄'){
        setPlayerScore(playerScore + 1)
        }else if(board === '✂️' && playedCard === '🪨'){
          setBotScore(botScore + 1)
          }else if(board === '🪨' && playedCard === '✂️'){
            setPlayerScore(playerScore + 1)
            }
    

    setTimeout(() => {
    nextRound()
    setBoard('')
    setBotCard('')
    setDisabledButton(false)
    }, 3000);
  }

  return (
<>
<div className="rounded-xl w-20 h-30 relative left-20 bg-white">
<div>you: {playerScore}</div>
<div>bot: {botScore}</div>
<div>round: {rounds}</div>

</div> 
<button onClick={()=>{botTurn()}} disabled={disabledButton} style={{color: disabledButton ? 'red' : 'black'}}>play</button>
<div className="fixed fixed left-1/2 bottom-80">{botCard}</div>
<div className="flex items-center justify-center fixed bottom-0 left-[calc(50%-80px)]">{cards.map((card)=>{
  return <CardRPS text={card.text} id={card.id}/>
})}</div>
<div className={`dropOff ${ board !== '' ? 'bg-white' : ''} fixed left-1/2 bottom-40 `} ref={drop}>
{board}
</div>
</>
  );
}

export default DragAndDrop;