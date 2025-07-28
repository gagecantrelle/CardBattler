import { useState, useEffect } from "react";
import axios from "axios"
import "../../styles/style.css"
import {ColorPicker, Input, Button} from 'antd';
import { RollbackOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import paper from '../../styles/paperString'
import backGround from '../../styles/images/Screenshot paper.png'

type User = {
  user_name: string,
  google_id: string,
  lightOrDark: boolean,
  cardColor: string,
  google_avatar: string,
  id: number
};

function ProfileEdit({user, edit, refresh, darkMode, colorEdit}: {user: User, edit: () => void, refresh: () => void, darkMode: boolean, colorEdit: (newColor: string) => void}) {
const [newName, setNewName] = useState('')
const [animate, setAnimate] = useState('animate-editProfileIn')
  const [color, setColor] = useState(()=>{
  if(user.cardColor !== 'linear-gradient(to right, #06b6d4, #3b82f6)'){
return user.cardColor;
  }else{
    return '';
  }
})
const [defaultColor, setDefaultColor] = useState(()=>{
const arr = user.cardColor.split(' ').slice(1)
if(user.cardColor !== 'linear-gradient(to right, #06b6d4, #3b82f6)'){
return [{color: arr[0], percent: parseFloat(arr[1].replace('%,',''))}, {color: arr[2], percent: parseFloat(arr[3].replace('%)',''))}];
}else{
return [{color: 'rgb(6, 182, 212)', percent: 0}, {color: 'rgb(59, 130, 246)', percent: 100}];
}
})

const editName = (name: string): void =>{
setNewName(name)
}

const editColor = (str: string): void =>{
  setColor(str)
}

const editReturn = (): void =>{
if(animate === 'animate-editProfileIn'){
  setAnimate('animate-editProfileOut')
}else{
  setAnimate('animate-editProfileIn')
}

  setTimeout(() => {
    edit()
  }, 500);
}

const update = (): void =>{
  console.log('profile edit')
  let changeName = user.user_name;
  let changeColor = 'linear-gradient(to right, rgb(6, 182, 212), rgb(59, 130, 246))'
  if(newName !== ''){
    changeName = newName
  }
  if(color !== ''){
    changeColor = color
  }
  axios.patch(`/ProfileUpdate/${user.id}`,{user_name: changeName, lightOrDark: darkMode , cardColor: changeColor, google_avatar: user.google_avatar})
.then(()=>{
colorEdit(changeColor)
  refresh()
})
.catch((err)=>{
  console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
})
}

  return (
<div className={`${animate} border-1 border-solid w-48 h-82.5 absolute top-[5vh] bg-white bottom-10 z-0`}>
<div className="relative left-4 top-4 paperText">Info Update</div>
<div className="text-blue-200 tracking-tight">━━━━━━━━━━━━</div>
<div className="text-red-200 rotate-90 relative right-20 top-9 tracking-tight">━━━━━━━━━━━━━━━━━━━━━</div>
<div className="text-blue-200 relative bottom-8">{paper.paperString3}</div>
<div className="relative left-4 bottom-81 paperText">We hear that you want to</div>
<div className="relative left-4 bottom-81 paperText">update you id card, please fill in</div>
<div className="relative left-4 bottom-81 paperText">the boxes below.</div>
<div className="relative left-4 bottom-81 paperText">name:</div>
<div className="relative left-4 bottom-82.5 w-40"><Input placeholder={`${user.user_name}`} onInput={(e)=>{editName((e.target as HTMLInputElement).value)}} style={{border: '1px dashed #bfdbfe', height:'25px'}}></Input></div>
 <ColorPicker
      defaultValue={defaultColor}
      allowClear
      mode="gradient"
      onChangeComplete={(color) => {
        editColor(color.toCssString());
      }}
    className="relative left-4 bottom-78"
    style={{border: '1px dashed #bfdbfe'}} />
    <div className="paperText relative left-12 bottom-85"><ArrowLeftOutlined />Pick a color</div>
    <div className="relative left-4 h-4 w-42 bottom-84 rounded-xl" style={{ background: color !== '' ? color : 'linear-gradient(90deg, rgb(6, 182, 212) 0%, rgb(59, 130, 246) 100%)'}}></div>
    <Button onClick={()=>{update()}} className="relative left-2 bottom-83" type="text"><div className="paperText">confirm</div></Button>
<Button onClick={()=>{editReturn()}} className="relative left-8 bottom-65" type="text"><div className="paperText">go Back</div><RollbackOutlined /></Button>
</div> 
  );
}
//will replace return div with this after figuring out home bar update
{/* <div className={`${animate}`}>
     <div className="whitespace-pre-line absolute">We hear that you want to{'\n'}update you id card, please fill in{'\n'}the boxes below.</div>
     <img src={backGround} className="h-70 w-50"></img>
    </div> */}

export default ProfileEdit;