import React, { useEffect, useState } from "react";
import axios from "axios"
import "./styles/style.css"


function Home() {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
  return (
<div >
 <div className={`bg-blue-500 w-50 fixed top-0 left-0`} style={{  height: `${screenHeight}px`}}>
    <button>Profile</button>
    <button>Game RPS</button>
      <button>Game BJ</button>
   </div>
</div>
  
 
  );
}


export default Home;