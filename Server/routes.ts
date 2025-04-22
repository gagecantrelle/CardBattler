import express, {Request, Response } from 'express'
import db from './db'
import { DataTypes } from 'sequelize'

const router = express.Router()

db.createDb.authenticate()
.then(()=>{
  console.log('✅ authenticate successfull')
})
.catch((err)=>{
  console.error('❌ authenticate failed: ', err)
})

const users = db.createDb.define('users',{
  id:{
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  }, 
  user_name:{
    type: DataTypes.STRING,
    allowNull: false
  }, 
  google_id:{
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true
  }, 
  ligthOrDark:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  }
},{
  tableName: 'users',
  freezeTableName: true,
  timestamps: false
})

const gameRPS = db.createDb.define('gameRPS',{
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  highScore:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  win:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lose:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{ //use to stop sql from making a copt with s at the end
  modelName: 'GameRPS',
  tableName: 'gameRPS', 
  freezeTableName: true,
  timestamps: false
} )

const gameBJ = db.createDb.define('gameBJ',{
  id:{
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  highScore:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  win:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lose:{
    type: DataTypes.INTEGER,
    allowNull: false
  }
},{//use to stop sql from making a copt with s at the end
  modelName: 'GameBJ',
  tableName: 'gameBJ',  
  freezeTableName: true,
  timestamps: false 
} )

router.get('/Users/:id', (req: Request, res: Response) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    users.findOne({where:{google_id: id}})
    .then((result)=>{
      res.status(200).send(result);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND ANY USERS: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T CONNECT TO USERS TABLE: ', err)
    res.sendStatus(500)
  })
});

router.get('/GameRPS/:id', (req: Request, res: Response) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameRPS.findOne({where:{user_id: id}})
    .then((result)=>{
      res.status(200).send(result);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND ANY USERS: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T CONNECT TO USERS TABLE: ', err)
    res.sendStatus(500)
  })
});

router.get('/GameBJ/:id', (req: Request, res: Response) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameBJ.findOne({where:{user_id: id}})
    .then((result)=>{
      res.status(200).send(result);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND ANY USERS: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T CONNECT TO USERS TABLE: ', err)
    res.sendStatus(500)
  })
});

//when user is created also create gameBJ and gameRPS
router.post('/CreateUser', async (req: Request, res: Response) => {
const {user_name, google_id, ligthOrDark}: {user_name: String, google_id: Number, ligthOrDark: Boolean} = req.body

db.createDb.sync()
.then(async ()=>{
await users.create({
  user_name,
  google_id,
  ligthOrDark,
})
.then((userInfo)=>{
  gameRPS.create({
    user_id: userInfo.dataValues.id,
    highScore: 0,
    win: 0,
    lose: 0, 
  })
  .then(()=>{
    gameBJ.create({
      user_id: userInfo.dataValues.id,
      highScore: 0,
      win: 0,
      lose: 0, 
    })
    .then(()=>{
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T CREATE GAMEBJ: ', err)
      res.sendStatus(500)
    }) 
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T CREATE GAMERPS: ', err)
    res.sendStatus(500)
  })
})
.catch((err)=>{
  console.error('❌ERROR CAN\'T CREATE USERS: ', err)
  res.sendStatus(500)
})
})
.catch((err)=>{
  console.error('❌ERROR CAN\'T CONNECT TO USERS TABLE: ', err)
  res.sendStatus(500)
})
})

router.patch('/ProfileUpdate/:id', (req: Request, res: Response) => {
  const {user_name, ligthOrDark}: {user_name: String, ligthOrDark: Boolean} = req.body
  const {id} = req.params
  db.createDb.sync()
  .then(()=>{
    users.update({user_name, ligthOrDark},{where: {id}})
    .then(()=>{
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND USERS TABLE TO UPDATE: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T UPDATE USERS TABLE: ', err)
    res.sendStatus(500)
  })
})

router.patch('/RPSUpdate/:id', (req: Request, res: Response) => {
  const {highScore, win, lose}: {highScore: Number, win: Number, lose: Number} = req.body
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameRPS.update({highScore, win, lose},{where: {user_id: id}})
    .then(()=>{
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND GAMERPS TABLE TO UPDATE: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T UPDATE GAMERPS TABLE: ', err)
    res.sendStatus(500)
  })
})

router.patch('/BJUpdate/:id', (req: Request, res: Response) => {
  const {highScore, win, lose}: {highScore: Number, win: Number, lose: Number} = req.body
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameBJ.update({highScore, win, lose},{where: {user_id: id}})
    .then(()=>{
      res.sendStatus(200);
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND GAMEBJ TABLE TO UPDATE: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T UPDATE GAMEBJ TABLE: ', err)
    res.sendStatus(500)
  })
})

router.delete('/DeleteAccount/:id', (req: Request, res: Response) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameRPS.destroy({where:{user_id: id}})
    .then(()=>{
      gameBJ.destroy({where:{user_id: id}})
      .then(()=>{
        users.destroy({where:{id}})
        .then(()=>{
          res.sendStatus(200);
        })
        .catch((err)=>{
          console.error('❌ERROR CAN\'T FIND USERS TABLE', err)
          res.sendStatus(500)
        })
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND GAMEBJ TABLE', err)
      res.sendStatus(500)
      })
    .catch((err)=>{
    console.error('❌ERROR CAN\'T FIND GAMERPS TABLE', err)
    res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T DELETE THIS USER TABLES: ', err)
    res.sendStatus(500)
  })
})
})
// router.delete('/GameRPS', (req: Request, res: Response) => {})
// router.delete('/GameBJ', (req: Request, res: Response) => {})


//  db.createDb.sync()
//.then(()=>{})
//.catch((err)=>{
//console.error('❌', err)
//})



export default {router, users, gameBJ, gameRPS}