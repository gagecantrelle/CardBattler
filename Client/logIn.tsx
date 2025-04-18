import React, { useEffect, useState } from "react";
import "./styles/style.css"
import dayjs from "dayjs";

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
<div className="w-screen h-screen flex justify-center items-center">
<div className="size-60 rounded-full bg-linear-to-r from-cyan-500 to-blue-500">
<a className={`top-27 left-10 relative font-[bubblegum] text-3xl ${nightTime ? 'dark' : 'light'}`} href="/auth/google">logIn/signUp</a>
</div>
</div>
  
 
  );
}


export default LogIn;