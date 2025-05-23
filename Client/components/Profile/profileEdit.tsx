import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../styles/style.css"
import {ColorPicker, Input, Button} from 'antd';
import { RollbackOutlined } from '@ant-design/icons'
import paper from '../../styles/paperString'
import { BlobOptions } from "buffer";

const defaultColor = [
  {
    color: 'rgb(6, 182, 212)',
     percent: 0,
  },
  {
    color: 'rgb(59, 130, 246)',
     percent: 100,
  }
]

function ProfileEdit({user, edit, refresh, darkMode}: {user: Object, edit: void, refresh: void, darkMode: boolean}) {
const [color, setColor] = useState('')
const [newName, setNewName] = useState('')

const editName = (name: string): void =>{
setNewName(name)
}

const updateName = (): void => {
axios.patch(`/ProfileUpdate/${user.id}`,{user_name: newName, ligthOrDark: darkMode})
.then(()=>{
  refresh()
})
.catch((err)=>{
  console.error('❌ERROR SOMETHING IS WRONG WITH THIS ID: ', err)
})
}

//left-[-72vh]
  return (
<div className=" border-1 border-solid w-48 h-82.5 absolute top-[5vh] bg-white bottom-10 z-0">
<div className="relative left-4 top-4 paperText">Info Update</div>
<div className="text-blue-200 tracking-tight">━━━━━━━━━━━━</div>
<div className="text-red-200 rotate-90 relative right-20 top-9 tracking-tight">━━━━━━━━━━━━━━━━━━━━━</div>
<div className="text-blue-200 relative bottom-8">{paper.paperString3}</div>
<div className="relative left-4 bottom-60 paperText">name:</div>
<div className="relative left-4 bottom-60 w-40"><Input placeholder={`${user.user_name}`} onInput={(e)=>{editName(e.target.value)}}></Input></div>
<Button onClick={()=>{updateName()}} className="relative left-4 bottom-60"><div className="paperText">confirm</div></Button>
 <ColorPicker
      defaultValue={defaultColor}
      allowClear
      mode="gradient"
      onChangeComplete={(color) => {
        setColor(color.toCssString());
      }}
    className="relative left-4 bottom-60" />
<Button onClick={()=>{edit()}} className="relative left-4 bottom-60"><div className="paperText">go Back</div><RollbackOutlined /></Button>
</div>
  );
}


export default ProfileEdit;