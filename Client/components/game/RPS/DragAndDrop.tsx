import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import {useDrop} from 'react-dnd'
import CardRPS from "./card";
const cards = [
  {id: 1, text: 'Rock🪨'},
  {id: 2, text: 'Paper📄'},
  {id: 3, text: 'Siccors✂️'}
]

function DragAndDrop() {
  const [board, setBoard] = useState([])
  const [{isOver}, drop] = useDrop(()=>({
    accept: 'div',
    drop: ({id, text}: {id: Number, text: String}) => addImage(id),
collect: (monitor) => ({
  isOver: monitor.isOver(),
}),
    
  }))

  const addImage = (id: Number) =>{
console.log(id)
  }

  return (
<>
<div className="card">{cards.map((card)=>{
  return <CardRPS text={card.text} id={card.id}/>
})}</div>
<div className="dropOff" ref={drop}>

</div>
</>
  );
}

export default DragAndDrop;