import React, { useEffect, useState } from "react";
import axios from "axios"
import "./styles/style.css"


function LogIn() {
  const [user, setUser] = useState({})

const checkUser = (): void =>{
  axios.get('/api/user')
  .then(({data})=>{
    let user = data.user
    if(user.real){
      console.log('real')
    setUser({user_name: user.user_name, google_id: user.google_id, ligthOrDark: user.ligthOrDark})
    }else{
      axios.post('/CreateUser',{user_name: user.user_name, google_id: user.google_id, ligthOrDark: user.ligthOrDark})
      .then(()=>{
        setUser({user_name: user.user_name, google_id: user.google_id, ligthOrDark: user.ligthOrDark})
      })
      .then((err)=>{
        console.error('ERROR CAN\'T CREATE NEW ACCOUNT: ', err)
      })
    }
  })
  .catch((err)=>{
    console.error(err)
  })
}

  useEffect(()=>{
    checkUser()
  },[])

  return (
<div>
<div>hello</div>
<a href="/auth/google">logIn/signUp</a>
</div>
  
 
  );
}


export default LogIn;