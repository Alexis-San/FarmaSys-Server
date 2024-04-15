import { Sequelize } from 'sequelize'; 

const db =new Sequelize('farmasysdb','root','mysql',{
    host:'localhost',
    dialect:'mysql',
});
export default db;