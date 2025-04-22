import React, { useEffect, useState } from "react";
import axios from "axios"
import {Button, Card} from 'antd'
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
<div className="absolute left-80 top-50">
    <Card cover={<div className={`${darkmode ? 'lightName': 'darkName'} bg-linear-to-r from-cyan-500 to-blue-500 h-15 text-4xl`} style={{width: '600px',}}>
      <p className={`absolute top-4 ${darkmode ? 'light': 'dark'}`}>{user.user_name}</p>
      </div>}>
<button className={`${darkmode ? 'lightButton': 'darkButton'}`} onClick={()=>{ update()}}>mode: {darkmode ? 'Light' : 'Dark'}</button>
<div>
<div className={`underline decoration-solid ${darkmode ? 'light': 'dark'}`}>Rock, Paper, Scissors</div>
<div className="flex justify-start">
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>HighScore: {RPS.highScore}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Win: {RPS.win}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'}`}>Lose: {RPS.lose}</div>
</div>

</div>
<div>
<div className={`underline decoration-solid ${darkmode ? 'light': 'dark'}`}>BlackJacks</div>
<div className="flex justify-start">
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'} hover:disabled`}>HighScore: {BJ.highScore}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'} hover:disabled`}>Win: {BJ.win}</div>
<div className={`rounded-xl border-2 border-solid border-blue-500 ${darkmode ? 'light': 'dark'} hover:disabled`}>Lose: {BJ.lose}</div>
</div>
</div>
</Card>
  </div>
  );
}


export default Profile;