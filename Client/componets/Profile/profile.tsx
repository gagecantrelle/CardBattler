import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../styles/style.css"

function Profile({user, RPS, BJ, refresh}: {user: Object, RPS: Object, BJ: Object, refresh: void}) {
const [name, setName] = useState(user.user_name)
const [lightOrDark, setLightOrDark] = useState(user.ligthOrDark)

const update = (): void => {
  console.log(document.documentElement.classList.contains('dark'))
axios.patch(`/ProfileUpdate/${user.id}`,{user_name: name, ligthOrDark: lightOrDark ? false : true})
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
  <div className="border-4 border-double border-blue-500 w-58">
  <div>Image</div>
<div className="underline decoration-solid">{user.user_name}</div>
<button onClick={()=>{ 
  setLightOrDark(lightOrDark ? false : true)
  update()
  }}>mode: {user.ligthOrDark ? 'Light' : 'Dark'}</button>
<div className="rounded-xl border-2 border-solid border-cyan-500">
<div className="underline decoration-solid">Rock, Paper, Scissors</div>
<div className="flex justify-start">
<div className="rounded-xl border-2 border-solid border-blue-500">HighScore: {RPS.highScore}</div>
<div className="rounded-xl border-2 border-solid border-blue-500">Win: {RPS.win}</div>
<div className="rounded-xl border-2 border-solid border-blue-500">Lose: {RPS.lose}</div>
</div>

</div>
<div className="rounded-xl border-2 border-solid border-cyan-500">
<div className="underline decoration-solid">BlackJacks</div>
<div className="flex justify-start">
<div className="rounded-xl border-2 border-solid border-blue-500">HighScore: {BJ.highScore}</div>
<div className="rounded-xl border-2 border-solid border-blue-500">Win: {BJ.win}</div>
<div className="rounded-xl border-2 border-solid border-blue-500">Lose: {BJ.lose}</div>
</div>
</div>
  </div>
</div>
  
 
  );
}


export default Profile;