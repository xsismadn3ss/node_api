const bcrypt = require("bcrypt");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Usuario = require("../models/usuario")(sequelize, DataTypes);
const {
  notFoundResponse,
  conflictResponse,
} = require("../utils/responseUtils");
const { ValidationError } = require("sequelize");
const { request, response } = require("express");

const getUsuarios = async (req = request, res = response) => {
  const user = await Usuario.findAll({
    order: ["id"],
  });
};

const getUsuario = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await Usuario.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  if (user === null) {
    return notFoundResponse(res, "Usuario no ecnontrado");
  }
  return res.status(200).json(user);
};

const createUsuario = async (req = request, res = response) => {
  const { username, email, password: plainPassword } = req.body;

  const password = await bcrypt.hash(plainPassword, 10);

  let user;

  try {
    user = await Usuario.create({
      username,
      email,
      password,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return conflictResponse(res, "No se pudo crear el usuario");
    }
  }

  user.password = undefined;
  return res.status(201).json(user);
};

const updateUsuario = async (req = request, res = response) => {
  const { username, email, password, is_active } = req.body;
  const id = req.params.id;

  const user = await Usuario.findByPk(id);
  if (user == null) {
    return notFoundResponse(res, "usuario no encontrado");
  }

  if (username !== undefined) {
    user.username = username;
  }

  const existingUser = await Usuario.findOne({
    where: { email },
  });

  if (existingUser) {
    if (existingUser.id != user.id) {
      return res.status(400).json({ message: "El correo ya esta en uso" });
    }
  } else {
    user.email = email;
  }

  if (password !== undefined) {
    user.password = await bcrypt.hash(password, 10);
  }

  if (is_active !== undefined) {
    user.is_active = is_active;
  }

  await user.save();
  return res.status(200).json(user);
};

const deleteUsuario = async (req = request, res = response) => {
  const id = req.params.id;
  const user = await Usuario.findByPk(id);
  if (user === null) {
    return notFoundResponse(res, "Usuarion no encontrado");
  }
  user.destroy();
  return res.status(204).json();
};

module.exports = {
  getUsuario,
  getUsuarios,
  createUsuario,
  updateUsuario,
  deleteUsuario,
};
