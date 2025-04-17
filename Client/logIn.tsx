import React, { useEffect, useState } from "react";
import "./styles/style.css"


function LogIn() {

  return (
<div className="w-screen h-screen flex justify-center items-center">
<div className="size-60 rounded-full bg-linear-to-r from-cyan-500 to-blue-500">
<a className="top-27 left-10 relative font-[bubblegum] text-3xl hover:text-white" href="/auth/google">logIn/signUp</a>
</div>
</div>
  
 
  );
}


export default LogIn;