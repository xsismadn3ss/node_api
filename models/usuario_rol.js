"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class usuario_rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      usuario_rol.belongsTo(models.usuario, {
        foreignKey: "usuario_id",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      });
      usuario_rol.belongsTo(models.rol, {
        foreignKey: "rol_id",
        onDelete: "CASCADE",
        onUpdate: "SET NULL",
      });
    }
  }
  usuario_rol.init(
    {
      usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
      },
      rol_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue:null
      },
    },
    {
      sequelize,
      modelName: "usuario_rol",
    }
  );
  return usuario_rol;
};
