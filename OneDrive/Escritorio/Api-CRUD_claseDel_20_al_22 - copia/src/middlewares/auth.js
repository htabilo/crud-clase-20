//creamos un middleware
//el require es el acceso a las variables de entorno(dotenv)
require("dotenv").config();
//llamamamos a la libreria que acabamos de crear
const jwt = require("express-jwt");
//crear una constante para el secreto
const secret = process.env.SECRET_JWT;
//definimos funcion llamada get token


const getToken = (req) => {
  //desestructurar una autorizacion desde l req.headers. dentro del header de la peticion yo necesito
  //obtener el valor que viene en la llave ded json
  let { authorization } = req.headers;
  //authorization es un arreglo
  if (authorization) {
    //hacecmos una nueva desestructuracion
    let [type, token] = authorization.split(' ')
    //se retorna token o null
    return(type === 'token' || type === 'Bearer') ? token : null
  }
}

//le pasamos un objeto
const auth = jwt.expressjwt({
    secret,
    //el algoritmo
     algorithms : ['HS256'],
    userProperty: 'user',
    getToken
})

module.exports = auth;
