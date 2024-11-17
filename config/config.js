require("dotenv").config();

const developmnet = {
    url: process.env.DB_URL,
    dialect: "postgres",
    dialectOptions: { ssl: { require: true } },
  }

module.exports = developmnet