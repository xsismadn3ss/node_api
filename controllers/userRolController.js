const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const UserRol = require('../models/usuario_rol')(sequelize, DataTypes)