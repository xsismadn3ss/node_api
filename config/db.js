const { Sequelize } = require("sequelize");
const developmnet = require("./config");

if(!developmnet.url){
  module.exports = undefined
}else{
  module.exports = new Sequelize(developmnet.url, {
    dialectOptions: developmnet.dialectOptions,
  })
}

