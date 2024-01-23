require('dotenv').config()
const express = require('express'),
mongoose = require('mongoose'),
routes = require('./src/routes/index') //distinto
const app = express()//al ejecutar npm install cors agregamos este codigo
const cors = require('cors')
const corsOptions = { //pegamos este codigo 
origin: '*', 
methods: 'GET, PUT, POST, DELETE', 
credentialS: true,
optionsSuccessStatus: 204, 
}; //le diremos a la api que utilice cors
app.use(cors(corsOptions))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
app.use('/v1', routes)
app.listen(process.env.PORT, ()=>{
    console.log('Servidor iniciado en el puerto' + process.env.BACKEND_URL)
});

