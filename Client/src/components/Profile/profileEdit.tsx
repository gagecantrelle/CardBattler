import { useState } from "react";
import axios from "axios"
import "../../styles/style.css"
import {ColorPicker, Input} from 'antd';
import { RollbackOutlined, ArrowLeftOutlined } from '@ant-design/icons'
import paper from '../../styles/images/Screenshot paper.png'

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
 <div className={`${animate}`}>
     <div className="whitespace-pre-line absolute top-4.5 left-4 paperText" style={{ lineHeight: '1.06' }}>We hear that you want to {'\n'}update you id card, please {'\n'}fill in the boxes below.</div>
      <div className="absolute left-3.5 top-16.5 paperText">name: </div>
      <div  className="absolute left-12 top-16.5"><Input placeholder={`${user.user_name}`} onInput={(e)=>{editName((e.target as HTMLInputElement).value)}} style={{border: '1px dashed #bfdbfe', height:'25px'}}></Input></div>
      <ColorPicker
       defaultValue={defaultColor}
       allowClear
      mode="gradient"
       onChangeComplete={(color) => {
         editColor(color.toCssString());
       }}
     className="absolute left-4 top-23"
     style={{border: '1px dashed #bfdbfe'}} />
     <div className="paperText absolute left-12 top-25"><ArrowLeftOutlined />Pick a color</div>
     <div className="absolute left-4 h-4 w-42 top-32 rounded-xl" style={{ background: color !== '' ? color : 'linear-gradient(90deg, rgb(6, 182, 212) 0%, rgb(59, 130, 246) 100%)'}}></div>
      <img src={paper} className="h-80 w-50"></img>
     <button onClick={()=>{update()}} className={`${darkMode ? 'lightButtonNoFont': 'darkButtonNoFont'} absolute left-4 top-37 paperText `}>confirm</button>
     <button onClick={()=>{editReturn()}} className={`${darkMode ? 'lightButtonNoFont': 'darkButtonNoFont'} absolute left-32 top-71.5 paperText`}>go Back <RollbackOutlined /></button>
    </div> 
  );
}
{/* <button onClick={()=>{update()}} className="absolute left-1 top-[-158px]" type="text"><div className="paperText">confirm</div></button>
     <button onClick={()=>{editReturn()}} className="absolute left-12 top-[-36px]" type="text"><div className="paperText">go Back</div><RollbackOutlined /></button> */}
export default ProfileEdit;