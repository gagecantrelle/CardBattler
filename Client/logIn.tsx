import { useEffect, useState } from "react";
import "./src/styles/style.css"
import dayjs from "dayjs";
import backGround from './src/styles/images/wood_Block_texture.png'

function LogIn() {
  const [nightTime, setNightTime] = useState(false);

  useEffect(()=>{
    const hour = dayjs().hour()
    if(hour > 11){
      setNightTime(true)
    }else{
      setNightTime(false)
    }
  },[])

  return (
    <div style={{backgroundImage: `url(${backGround})`, height: `100dvh`, width: `100dvw`}}>
<div className="w-screen h-screen flex justify-center items-center">
<div className="size-60 rounded-full bg-linear-to-r from-cyan-500 to-blue-500">
<a className={`top-27 left-10 relative font-[bubblegum] text-3xl ${nightTime ? 'darkButton' : 'lightButton'}`} href="/auth/google">logIn/signUp</a>
</div>
</div>
</div>
  );
}


export default LogIn;