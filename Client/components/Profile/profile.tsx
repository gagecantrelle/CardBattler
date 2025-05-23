import React, { useEffect, useState } from "react";
import axios from "axios"
import {Button, Card} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import "../../styles/style.css"
import ProfileEdit from "./profileEdit";

function Profile({user, RPS, BJ, refresh, darkmode}: {user: Object, RPS: Object, BJ: Object, refresh: void, darkmode: Boolean}) {
const [name, setName] = useState(user.user_name)
const [edit, setEdit] = useState(false)
const [color, setColor] =useState('linear-gradient(to right, #06b6d4, #3b82f6)')

const update = (): void => {
axios.patch(`/ProfileUpdate/${user.id}`,{user_name: name, ligthOrDark: darkmode ? false : true})
.then(()=>{
  refresh()
})
.catch((err)=>{
  console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
})
}

const editMode = (): void =>{
  setEdit(!edit)
} 

  useEffect(()=>{
  },[])
  return (
<div className="absolute left-80 top-50">
  {edit !== true && <>
    <Card cover={<div className={`${darkmode ? 'lightName': 'darkName'} h-15 text-4xl`} style={{width: '600px', background: color}}>
      <p className={`absolute top-4 ${darkmode ? 'light': 'dark'}`}>{user.user_name}</p>
      <Button onClick={()=>{editMode()}} className="relative left-90"><EditOutlined /></Button>
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
</>}
{edit === true && <ProfileEdit user={user} edit={editMode} refresh={refresh} darkMode={darkmode}/>}

  </div>
  );
}


export default Profile;