import {Sequelize} from "sequelize"
import fs from 'fs';
import path from 'path';

const sqlFilePath = path.join(__dirname, '../database.sql')
const sqlQuery = fs.readFileSync(sqlFilePath, 'utf8');

const sequelize = new Sequelize('mysql://root@localhost:3306',{
  dialect: 'mysql',
  dialectOptions: {
    multipleStatements: true // Allow multiple SQL statements in one query
  }});
const createDb = new Sequelize("cardBattle", "root", "", {host:"localhost", dialect: "mysql"}) 

async function runSQLFile() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connected to MySQL');

    // Run SQL file content
    await sequelize.query(sqlQuery);
    console.log('✅ Database and tables created successfully');

    await sequelize.close();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Error executing SQL file:', error);
  }
}
export default {runSQLFile, createDb}
