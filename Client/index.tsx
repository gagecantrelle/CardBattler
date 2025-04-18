import React from "react";
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import App from "./App";
import { BrowserRouter } from 'react-router-dom'

const div = document.getElementById('app')
if(div){
const root = createRoot(div);
root.render(
  <React.StrictMode>
  <BrowserRouter>
        <App />
  </BrowserRouter>
  </React.StrictMode>
);
}else{
  console.error('❌ERROR cant find div with the id of app')
}
