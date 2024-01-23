//importamos mongoose en este nuevo flujo
const mongoose = require('mongoose')

//creamos un esquema y creamos dentro del {} un objeto, como es un campo requerido hacemos un true
const categoryShema = new mongoose.Schema({
    //objeto
name: { type: String, required: true }
})
 
//declaramos una constante y le asignamos el esquema que acabamos de crear
const Category = mongoose.model('Category', categoryShema)

//ahora exportamos
module.exports = Category