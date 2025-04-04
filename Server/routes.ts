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
    primaryKey: true
  }, 
  user_name:{
    type: DataTypes.STRING,
    allowNull: false
  }, 
  google_id:{
    type: DataTypes.STRING,
    allowNull: false
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
    primaryKey: true
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
    primaryKey: true
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

router.get('/Users', (req, res) => {
  db.createDb.sync()
  .then(()=>{
    users.findAll()
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

router.get('/GameRPS/:id', (req, res) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameRPS.findOne({where:{id: id}})
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

router.get('/GameBJ/:id', (req, res) => {
  const {id} = req.params

  db.createDb.sync()
  .then(()=>{
    gameBJ.findOne({where:{id: id}})
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



//  db.createDb.sync()
//.then(()=>{})
//.catch((err)=>{
//console.error('❌', err)
//})

export default router