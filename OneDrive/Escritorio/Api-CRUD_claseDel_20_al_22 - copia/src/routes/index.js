
  const express = require('express'),
   router = express.Router(),
   userRoutes = require('./User.router'),
   postRoutes = require('./Post.router'),
//agregamos el Category 
 categoryRoutes = require('./Category.router')

//una vez importado arriba lo asociamos ala ruta
router.use('/user', userRoutes)
router.use('/post', postRoutes)
router.use('/category', categoryRoutes)

module.exports = router;  // <-- Corregir "Exports" a "exports"




