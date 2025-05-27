import React, { useEffect, useState } from "react";
import axios from "axios"
import {Button, Card, Avatar} from 'antd'
import { EditOutlined } from '@ant-design/icons'
import "../../styles/style.css"
import ProfileEdit from "./profileEdit";

function Profile({user, RPS, BJ, refresh, darkmode}: {user: Object, RPS: Object, BJ: Object, refresh: void, darkmode: Boolean}) {
const [name, setName] = useState(user.user_name)
const [edit, setEdit] = useState(false)
const [color, setColor] =useState(user.cardColor)

const update = (): void => {
axios.patch(`/ProfileUpdate/${user.id}`,{user_name: name, ligthOrDark: darkmode ? false : true, cardColor: color, google_avatar: user.google_avatar})
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

const colorEdit = (newColor: string): void =>{
  setColor(newColor)
}

  return (
<div className="absolute left-80 top-50">
    <Card cover={<div className={`${darkmode ? 'lightName': 'darkName'} h-15 text-4xl`} style={{width: '600px', background: color}}>
      <p className={`absolute top-4 ${darkmode ? 'light': 'dark'}`}>{user.user_name}</p>
      {edit === false && <Button onClick={()=>{editMode()}} className="relative left-135"><EditOutlined /></Button>}
      </div>} className="w-[600px] h-60">
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
<Avatar key={user.google_avatar} className="absolute left-90 bottom-32" size={150} src={user.google_avatar} crossOrigin="anonymous"/>
</Card>
{edit === true && <ProfileEdit user={user} edit={editMode} refresh={refresh} darkMode={darkmode} colorEdit={colorEdit}/>}
  </div>
  );
}


export default Profile;