import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom';
import axios from "axios"
import "./styles/style.css"
import LogIn from "./logIn";
import Home from "./home";


function App() {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
const [screenWidth, setScreenWidth] = useState(window.innerWidth)
const [user, setUser] = useState({})
const [darkmode, setDarkmod] = useState(true)

const checkUser = (): void =>{
  axios.get('/api/user')
  .then(({data})=>{
    let user = data.user
    if(user.real){
      axios.get(`Users/${data.user.google_id}`)
      .then(({data})=>{
      setUser(data)
      setDarkmod(data.ligthOrDark)
      })
      .catch((err)=>{
        console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
      })
    }else{
      axios.post('/CreateUser',{user_name: user.user_name, google_id: user.google_id, ligthOrDark: user.ligthOrDark, google_avatar: user.google_avatar})
      .then(()=>{
        setUser({user_name: user.user_name, google_id: user.google_id, ligthOrDark: user.ligthOrDark})
      })
      .then((err)=>{
        console.error('ERROR CAN\'T CREATE NEW ACCOUNT: ', err)
      })
    }
  })
  .catch((err)=>{
    console.error('❌ERROR NO USER IN SESSION: ', err)
  })
}

   useEffect(() => {
    
    if(!user.user_name){
checkUser()
    }
   const screenCheck = () =>{
    const curHeight = window.innerHeight
    const curWidth = window.innerWidth

    if(curHeight !== screenHeight){
      setScreenHeight(curHeight)
    }
    if(curWidth !== window.innerWidth){
      setScreenWidth(curWidth)
    }
   }

   window.addEventListener("resize", screenCheck)

   return()=>{
    window.removeEventListener("resize", screenCheck)
   }
  },[checkUser])

  return (
  <Routes>
 <Route path="/" element={<Navigate to="/login" replace />} />
 {user.user_name && <Route path="/login" element={<Navigate to="/home" replace />} />}
 <Route path='/login' element={<LogIn />} errorElement={<div>404 Not Found</div>} />
 <Route path='/Home' element={<Home user={user} refresh={checkUser} darkmode={darkmode} height={screenHeight} width={screenWidth}/>} errorElement={<div>404 Not Found</div>}/>
  </Routes>
  );
}

{/* <div>hello█react█is█rendering ████████████
<div>{test}</div >
</div > */}

export default App;