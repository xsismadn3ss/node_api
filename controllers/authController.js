const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Usuario = require("../models/usuario")(sequelize, DataTypes);
const {
  generateAccesToken,
  generateRefreshToken,
} = require("../utils/jwtUtils");
const refreshTokens = [];

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Usuario.findOne({
      where: { email },
    });
    if (!user) {
      return res.status(401).json({
        message: "Usuario no encontrado",
        status: 401,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Contraseña incorrecta",
        status: 401,
      });
    }

    const accesToken = generateAccesToken({
      id: user.id,
      email: user.email,
    });
    const refreshToken = generateRefreshToken({
      id: user.id,
      email: user.email,
    });

    refreshToken.push(refreshToken);

    return res.status(200).json({ accesToken, refreshToken });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

const register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await Usuario.findOne({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({
        message: "EL correo ya ha sido usado",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Usuario.create({
      username,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({ message: "Usuario registrado con exito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error en el servidor",
    });
  }
};

const refreshAccessToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token invalido o expirado",
      status: 401,
    });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const accesToken = generateAccesToken({
      id: payload.id,
      email: payload.email,
    });

    return res.json({ accesToken });
  } catch (error) {
    return res.status(401).json({
      message: "Refresh Token no valido",
      status: 401,
    });
  }
};

const logout = (req, res) => {
  const { refreshToken } = req.body;

  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) {
    refreshTokens.slice(index, 1);
  }
  return res.json({ message: "Sesion cerrada" });
};

module.exports = { login, register, refreshAccessToken, logout };
