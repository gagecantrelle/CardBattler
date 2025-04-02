import express from 'express'
import runSQLFile from './db'


const app = express()
const port: number  = 8000;

app.use(express.json())

app.listen(port, ()=>{
  console.log(`listing on port ${port}`)
  runSQLFile()
  .then(()=>{
    console.log('run')
  })
  .catch((err)=>{
    console.log('ERROR server: ', err)
  })
})

export default port