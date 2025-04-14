import React, { useEffect, useState } from "react";
import {useNavigate} from 'react-router-dom';
import axios from "axios"
import "./styles/style.css"
import Profile from "./componets/Profile/profile";

function Home({user}: {user: Object}) {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
const [profilrTrue, setProfileTrue] = useState(false)
const navigate = useNavigate();
  return (
<div >
 <div className={`bg-blue-500 w-50 fixed top-0 left-0`} style={{  height: `${screenHeight}px`}}>
    <button onClick={()=>{ 
      let test = profilrTrue ? false : true
      setProfileTrue(test)}}
      >Profile</button>
    <button>Game RPS</button>
      <button>Game BJ</button>
      
   </div>
   <div className={`fixed top-0 left-50`}>{profilrTrue && <Profile user={user} />}</div>
</div>
  
 
  );
}


export default Home;