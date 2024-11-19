const express = require('express')

const {
    getUsuario, getUsuarios, createUsuario, updateUsuario, deleteUsuario
} = require('../controllers/usuarioController')

const authMiddleware = require('../middlewares/authMiddleware')

const router = express.Router()

router.get('/users', authMiddleware, getUsuarios)
router.get('/users/:id', authMiddleware, getUsuario)
router.post('/users', authMiddleware, createUsuario)
router.put('/users/:id', authMiddleware, updateUsuario)
router.delete('/users/:id', authMiddleware, deleteUsuario)

module.exports = router