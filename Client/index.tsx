import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./componets/App";

const div = document.getElementById('app')
if(div){
const root = createRoot(div);
root.render(<App googleId="fakeId"/>);
}else{
  console.error('❌ERROR cant find div with the id of app')
}