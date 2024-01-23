const express = require('express'),
router = express.Router(),
{
    signUp, 
    //aca tambien argregamos el login
    login,
    getUsers,
    updateUser,
    deleteUser
    
} = require('../controllers/User.controller')
//importamos auth desde la carpeta de middleware, con esto ya tenemos accesos esta variable
const auth = require('../middlewares/auth')
//como tenemso dos post, las rutas NO pueden ser iguales
//esta es para registro
//las primeras dos si permiten generar token
router.post('/signup', signUp)
//esta es para autenticar un usuario
router.post('/login', login)
router.get('/', auth, getUsers)  
router.put('/', auth, updateUser)
router.delete('/', auth, deleteUser)

module.exports = routes