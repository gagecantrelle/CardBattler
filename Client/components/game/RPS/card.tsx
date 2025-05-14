import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import {useDrag} from 'react-dnd'


function CardRPS({id, text, dropCard}: {id: Number, text: String, dropCard: String}) {
  const [isDrop, setIsDrop] = useState(false)
  const [textColor, setTextColor] = useState('')
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div", // Type can be anything, it's just a label for the drag item
    item: {id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Correct way to use monitor
    }),
  }));

  useEffect(()=>{
    if(text === dropCard){
      setIsDrop(true)
    }else{
      setIsDrop(false)
    }

    if(text === '🪨'){
     setTextColor('#e5e7eb')
    }else if(text === '✂️'){
     setTextColor('#fecaca')
    }else{
      setTextColor('white')
    }

  },[dropCard])

  return (
    <div
      ref={drag} // This connects the div to the drag source
      style={{
        background: isDragging ? "" : textColor,
        color: isDragging ? "transparent" : "",
        visibility: isDrop ? "hidden" : "",
         border: isDragging ? '' : '2px solid black'
      }}
      className="card "
    >
      {text}
    </div>
  );
}

export default CardRPS;