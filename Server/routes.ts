import express, {Request, Response } from 'express'
import db from './db'
import { DataTypes } from 'sequelize'

const router = express.Router()

db.createDb.authenticate()
.then(()=>{
  console.log('✅ authenticate successful')
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
  lightOrDark:{
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  cardColor:{
    type: DataTypes.STRING,
    allowNull: false
  },
  google_avatar:{
    type: DataTypes.STRING,
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
const {user_name, google_id, lightOrDark, google_avatar}: {user_name: String, google_id: Number, lightOrDark: Boolean, google_avatar: String} = req.body

db.createDb.sync()
.then(async ()=>{
await users.create({
  user_name,
  google_id,
  lightOrDark,
  cardColor: 'linear-gradient(to right, #06b6d4, #3b82f6)',
  google_avatar
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
      res.sendStatus(200).json({ userId: userInfo.dataValues.id});
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T CREATE GAME_BJ: ', err)
      res.sendStatus(500)
    }) 
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T CREATE GAME_RPS: ', err)
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
  const {user_name, lightOrDark, cardColor, google_avatar}: {user_name: String, lightOrDark: Boolean, cardColor: String, google_avatar: String} = req.body
  const {id} = req.params
  db.createDb.sync()
  .then(()=>{
    users.update({user_name, lightOrDark, cardColor, google_avatar},{where: {id}})
    .then(([updatedRows])=>{
      if(updatedRows === 0){
        console.warn('⚠️ No rows updated, id exist but something went wrong');
        res.sendStatus(500)
      }else{
      res.sendStatus(200);
      }
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
    gameRPS.update({highScore, win, lose},{where: {id: id}})
    .then(([updatedRows])=>{
      if (updatedRows === 0) {
        console.warn('⚠️ No rows updated, id exist but something went wrong');
        res.sendStatus(500)
      }else{
      res.sendStatus(200);
      }
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND GAME_RPS TABLE TO UPDATE: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T UPDATE GAME_RPS TABLE: ', err)
    res.sendStatus(500)
  })
})

router.patch('/BJUpdate/:id', (req: Request, res: Response) => {
  const {highScore, win, lose}: {highScore: Number, win: Number, lose: Number} = req.body
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameBJ.update({highScore, win, lose},{where: {id: id}})
    .then(([updatedRows])=>{
      if (updatedRows === 0) {
        console.warn('⚠️ No rows updated, id exist but something went wrong');
        res.sendStatus(500)
      }else{
      res.sendStatus(200);
      }
    })
    .catch((err)=>{
      console.error('❌ERROR CAN\'T FIND GAME_BJ TABLE TO UPDATE: ', err)
      res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T UPDATE GAME_BJ TABLE: ', err)
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
      console.error('❌ERROR CAN\'T FIND GAME_BJ TABLE', err)
      res.sendStatus(500)
      })
    .catch((err)=>{
    console.error('❌ERROR CAN\'T FIND GAME_RPS TABLE', err)
    res.sendStatus(500)
    })
  })
  .catch((err)=>{
    console.error('❌ERROR CAN\'T DELETE THIS USER TABLES: ', err)
    res.sendStatus(500)
  })
})
})

export default {router, users, gameBJ, gameRPS}