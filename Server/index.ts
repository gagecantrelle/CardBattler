import express from 'express'
import db from './db'
import router from './routes';


const app = express()
const port: number = 8080;

app.use(express.json())
app.use(router)

router.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, ()=>{
  console.log(`listing on port ${port}`)
  db.runSQLFile()
  .then(()=>{})
  .catch((err)=>{
    console.error('ERROR server: ', err)
  })
})

export default port