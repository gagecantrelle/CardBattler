import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import CardRPS from "./card";
const cards = [
  {id: 1, text: 'hello'},
  {id: 2, text: '🀱'},
  {id: 3, text: '🁑'}
]

function DragAndDrop() {
  const [board, setBoard] = useState([])

  return (
<>
<div className="card">{cards.map((card)=>{
  return <CardRPS text={card.text} id={card.id}/>
})}</div>
<div className="dropOff">
</div>
</>
  );
}

export default DragAndDrop;