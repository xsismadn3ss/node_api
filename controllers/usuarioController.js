const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Usuario = require("../models/usuario")(sequelize, DataTypes);