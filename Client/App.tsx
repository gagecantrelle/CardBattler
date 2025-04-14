import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import axios from "axios"
import "./styles/style.css"
import LogIn from "./logIn";
import Home from "./home";

function App() {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
const [user, setUser] = useState({})
const navigate = useNavigate();

const getOrCreateUser = (): void => {
  axios.get('/api/user')
  .then(({data})=>{
  axios.get(`Users/${data.user.google_id}`)
.then(({data})=>{
setUser(data)
})
.catch((err)=>{
  console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
})
  })
  .catch((err)=>{
    console.error(err)
  })
}

   useEffect(() => {
    getOrCreateUser()

   const screenCheck = () =>{
    const curHeight = window.innerHeight
   
    if(curHeight !== screenHeight){
      setScreenHeight(curHeight)
    }
   }

   window.addEventListener("resize", screenCheck)

   return()=>{
    window.removeEventListener("resize", screenCheck)
   }
  },[])

  return (
  //  <div style={{ backgroundColor: "blue", width: "150px", height: `${screenHeight}px`, position: 'fixed', top: '0px', left: '0px'}}>
  //   <button>Profile</button>
  //   <button>Game RPS</button>
  //   <button>Game BJ</button>
  //  </div>
  
  // <div className={`bg-blue-500 w-50 fixed top-0 left-0`} style={{  height: `${screenHeight}px`}}>
  //   <button>Profile</button>
  //    <button>Game RPS</button>
  //    <button>Game BJ</button>
  // </div>
  <Routes>
 <Route path="/" element={<Navigate to="/login" replace />} />

 <Route path='/login' element={<LogIn />} />
 <Route path='/Home' element={<Home />} />
  </Routes>
  );
}

{/* <div>hello█react█is█rendering ████████████
<div>{test}</div >
</div > */}

export default App;