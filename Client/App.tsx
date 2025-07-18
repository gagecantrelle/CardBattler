import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate} from 'react-router-dom'; //useNavigate
import axios from "axios"
import "./src/styles/style.css"
import LogIn from "./logIn";
import Home from "./home";

type User = {
  user_name: string,
  google_id: string,
  lightOrDark: boolean,
  cardColor: string,
  google_avatar: string,
  id: number
};

function App() {
const [screenHeight, setScreenHeight] = useState(window.innerHeight)
const [screenWidth, setScreenWidth] = useState(window.innerWidth)
const [user, setUser] = useState<User | null>(null)
const [darkMode, setDarkMode] = useState(true)

const checkUser = (): void =>{
  axios.get('/api/user')
  .then(({data})=>{
    let userTest = data.user
    if(userTest.real){
      axios.get(`Users/${data.user.google_id}`)
      .then(({data})=>{
      setUser(data)
      setDarkMode(data.lightOrDark)
      })
      .catch((err)=>{
        console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
      })
    }else{
      axios.post('/CreateUser',{user_name: userTest.user_name, google_id: userTest.google_id, lightOrDark: userTest.lightOrDark, google_avatar: userTest.google_avatar})
      .then(({data})=>{
        setUser({user_name: userTest.user_name, google_id: userTest.google_id, lightOrDark: userTest.lightOrDark, google_avatar: userTest.google_avatar, cardColor: userTest.cardColor, id: data.userId})
      })
      .catch((err)=>{
        console.error('ERROR CAN\'T CREATE NEW ACCOUNT: ', err)
      })
    }
  })
  .catch((err)=>{
    console.error('❌ERROR NO USER IN SESSION: ', err)
  })
}

   useEffect(() => {
    
    if(user === null || user === undefined){
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
 {user !== null && <Route path="/login" element={<Navigate to="/home" replace />} />}
 <Route path='/login' element={<LogIn />} errorElement={<div>404 Not Found</div>} />
 <Route path='/Home' element={<Home user={user} refresh={checkUser} darkMode={darkMode} height={screenHeight} width={screenWidth}/>} errorElement={<div>404 Not Found</div>}/>
  </Routes>
  );
}

{/* <div>hello█react█is█rendering ████████████
<div>{test}</div >
</div > */}

export default App;