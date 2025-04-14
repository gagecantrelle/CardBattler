import React, { useEffect, useState } from "react";
import axios from "axios"
import "../../styles/style.css"

function Profile({user}: {user: Object}) {

  useEffect(()=>{
    console.log(user)
  },[])
  return (
<div >
  <div>hey I'm here</div>
<div>{user.user_name}</div>
<div>{user.ligthOrDark ? 'true' : 'false'}</div>
</div>
  
 
  );
}


export default Profile;