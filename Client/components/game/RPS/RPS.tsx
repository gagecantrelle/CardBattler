import React, { useEffect, useState } from "react";
import "../../../styles/style.css"
import { DndProvider, useDrag, useDrop} from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import DragAndDrop from "./DragAndDrop";
//import backGround from '../../../styles/images/th.jpg'


//import backGround from './styles/images/wood_Block_texture.png'

function GameRPS({user, RPS, refresh, darkmode}: {user: Object, RPS: Object, refresh: Object, darkmode: Boolean}) {


  return (
 <DndProvider backend={HTML5Backend}>
  <div>
   <DragAndDrop /> 
  </div>
 </DndProvider>
  );
}

export default GameRPS;