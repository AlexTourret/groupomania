require('dotenv').config();
module.exports = {
    HOST: process.env.DB_HOST,
    USER: "root",
    PASSWORD: process.env.DB_PWD,
    DB: "groupomania",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };