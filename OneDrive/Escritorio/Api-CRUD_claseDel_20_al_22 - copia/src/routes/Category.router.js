//llamamos a express
const express = require('express'), 
//exportamos todas las funciones de categoria 
router = express.Router(), 
{ 
    createCategory, 
    getCategories, 
    updateCategory, 
    deleteCategory 
} = require('../controllers/Category.controller')
const auth = require('../middlewares/auth')

//asignamos todas las funciones a mis controladores asignadas a sus rutas
router.post('/', auth, createCategory )
router.get('/', auth, getCategories )
router.put('/', auth,  updateCategory)
router.delete('/', auth, deleteCategory )


module.exports = router;