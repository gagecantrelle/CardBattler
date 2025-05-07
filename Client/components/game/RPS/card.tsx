import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import {useDrag} from 'react-dnd'


function CardRPS({id, text}: {id: Number, text: String}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div", // Type can be anything, it's just a label for the drag item
    item: {id},
    collect: (monitor) => ({
      isDragging: monitor.isDragging(), // Correct way to use monitor
    }),
  }));

  return (
    <div
      ref={drag} // This connects the div to the drag source
      style={{
        background: isDragging ? "" : "white",
        color: isDragging ? "transparent" : "",
      }}
      className="card"
    >
      {text}
    </div>
  );
}

export default CardRPS;