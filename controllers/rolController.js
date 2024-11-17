const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Rol = require("../models/rol")(sequelize, DataTypes);
