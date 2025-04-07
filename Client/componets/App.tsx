import React, { useEffect, useState } from "react";
import axios from "axios"

function App() {
const [test, setTest] = useState('test')
  // useEffect(() => {
  // }, [])
  return (
    <div>hello█react█is█rendering ████████████
      <div>{test}</div >
    </div >
   
  );
}

export default App;