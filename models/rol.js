'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  rol.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'rol',
  });
  return rol;
};