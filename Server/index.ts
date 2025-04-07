import express from 'express'
import db from './db'
import router from './routes';
import path, { dirname } from 'path';

const app = express()
const port: number = 8080;
const DIST_PATH = path.resolve(__dirname, '../Client/dist');

app.use(express.json())
app.use(router)
app.use(express.static(DIST_PATH))

// router.get('/', (req, res) => {
//   res.send('Hello World!');
// });

app.listen(port, ()=>{
  console.log(`listing on port ${port}`)
  db.runSQLFile()
  .then(()=>{})
  .catch((err)=>{
    console.error('❌ERROR server: ', err)
  })
})

export default port