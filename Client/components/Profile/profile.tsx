import React, { useEffect, useState } from "react";
import axios from "axios"
import {Button} from 'antd'
import "../../styles/style.css"

function Profile({user, RPS, BJ, refresh, darkmode}: {user: Object, RPS: Object, BJ: Object, refresh: void, darkmode: Boolean}) {
const [name, setName] = useState(user.user_name)

const update = (): void => {
  console.log(document.documentElement.classList.contains('dark'))
axios.patch(`/ProfileUpdate/${user.id}`,{user_name: name, ligthOrDark: darkmode ? false : true})
.then(()=>{
  refresh()
})
.catch((err)=>{
  console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
})
}

  useEffect(()=>{
  },[])
  return (
<div className="border-4 border-double border-cyan-500 w-60">
  <div className="border-4 border-double border-blue-500 w-58 bg-green-500">
  <div>Image</div>
  <Button color="cyan" variant="text">
            Filled
          </Button>
<div className={`underline decoration-solid ${darkmode ? 'light': 'dark'}`}>{user.user_name}</div>
<button className={`${darkmode ? 'light': 'dark'}`} onClick={()=>{ update()}}>mode: {darkmode ? 'Light' : 'Dark'}</button>
<div className="rounded-xl border-2 border-solid border-cyan-500">
<div className={`underline decoration-solid ${darkmode ? 'light': 'dark'}`}>Rock, Paper, Scissors</div>
<div className="flex justify-start">
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>HighScore: {RPS.highScore}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Win: {RPS.win}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Lose: {RPS.lose}</div>
</div>

</div>
<div className="rounded-xl border-2 border-solid border-cyan-500">
<div className={`underline decoration-solid ${darkmode ? 'light': 'dark'}`}>BlackJacks</div>
<div className="flex justify-start">
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>HighScore: {BJ.highScore}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Win: {BJ.win}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Lose: {BJ.lose}</div>
</div>
</div>
  </div>
</div>
  
 
  );
}


export default Profile;