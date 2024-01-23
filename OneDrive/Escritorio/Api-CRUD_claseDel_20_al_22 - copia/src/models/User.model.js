const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); //llamamos a crypto, ya esta instalada, solamente se llama
const jwt = require("jsonwebtoken"); //esta hace referencia a la libreria que instalamos
const secret = process.env.SECRET_JWT; //llamamos al secreto, y con estas 3 cosas podemos empezar a trabajar con la encriptacion de contraseña en el modelo de usuario

const userSchema = new mongoose.Schema({
  firstName: { type: String }, //tambien puede ser asi   firstName: { type:  String, required:true },
  lastName: { type: String },
  dob: { type: Date },
  mail: { type: String },
  password: { type: String }, //con salt generamos la contraseña encriptada // quitamos el salt: String, clase22
});

userSchema.methods.hashPassword = function (password) {
  // el hashSync hace encriptacion de una contraseña
  this.password = bcrypt.hashSync(password, 16); //le pasamos la password, el 16 es para hacer la encriptación. ver esto en user controller
};

userSchema.methods.generateJWT = function () {
  //se saca de chatGTPthis.password = crypto //llamamos a una funcioon de crypto, le pasamos la password, el salt, las iteraciones le damos 10000, al final el algoritmo //.pbkdf2Sync(password, this, this.salt, 10000, 512, 'sha512') //this.password = crypto.pbkdf2Sync(password, this, this.salt, 10000, 512, 'sha512').toString('hex') }
  return jwt.sign({ userId: this._id }, secret); //la pasamos un user ID que va a ser igual al ID, tambien le pasamos el secreto que está arriba //llamamamos de nuevo a user esquema y generamos un JWT
};

userSchema.methods.onSignUpGenerateJWT = function () {
  return {
    //crear una ultima funcion invocando al esquema onSignUp, el this es una palabra reservada para cuando se usan clases para referenciar a algo que esta en otro lado
    userId: this._id,
    token: this.generateJWT(), //devolver el token que se esta creando; este metodo cuando me registre en la respuesta se le envía al usuario es su id junto con el jwt
  };
};

const User = mongoose.model("User", userSchema);
module.exports = User;
