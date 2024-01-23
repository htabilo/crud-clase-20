const User = require("../models/User.model");
const bcrypt = require('bcrypt') //una vez que se instala bcrypt debemos invocar o importar esto

const signUp = async(req, res)=>{
    try{  
        const{ mail, password } = req.body; // Se desestructuran las propiedades 'mail' y 'password' del cuerpo de la solicitud (request).
        const existingUser = await User.findOne({ mail });  // Busca si ya existe un usuario con el correo proporcionado en la base de datos.
        if(existingUser){
            return res.json({
                message: "User already existing"
            });
        }
      const user = new User(req.body); // Si no existe un usuario con el mismo correo, se crea un nuevo objeto de usuario con la información proporcionada en el cuerpo de la solicitud.
        user.hashPassword(password); // Se aplica el método 'hashPassword' para hashear la contraseña antes de almacenarla en la base de datos. poner password en vez de req.body.password es lo mismo
       const resp = await user.save();              // Se guarda el nuevo usuario en la base de datos.
        return res.json({
            message:'user was create successfully',
            detail: user.onSignUpGenerateJWT()  // Se devuelve una respuesta indicando que el usuario ha sido creado exitosamente, junto con algún detalle adicional generado por el método 'onSignUpGenerateJWT'.
        });            
    } catch(err){   // Si ocurre algún error durante el proceso, se maneja aquí y se devuelve una respuesta indicando el error.
        console.error("Error during user registration", err);
        return res.json({
            message: 'Error',
            detail: err.message
          });
        }
      };
      

const login = async (req, res) => {
  try {
      const { mail, password } = req.body
      const userFound = await User.findOne({ mail })
      if(!userFound) {  //¿What validates this? If the user is not registered in the database then he cannot login - si no encontramos su usuario retornamos un "user not found"
              return res.json({
              message: "user not found"
          })
      }
      const isCorrectPassword = await bcrypt.compareSync(password, userFound.password) //await to wait for the response and once it validates that the password is correct, continue with the flow
      if (!isCorrectPassword) {
        return res.json({
          message: 'wrong password'
           })
      }
      return res.json({
        message: 'OK',
        detail: { user: userFound, token: userFound.generateJWT() } 
    })
     
  } catch (error) {
      return res.json({
          message: 'Error',
          detail: error.message
      })
  }
}


const getUsers = async (req, res) => {  //consult the database, find out what other validation can be done
  try {
      const resp = await User.find()
      return res.json({
          message: 'Users',
          detail: resp
      })
  } catch (err) {
      return res.json({
          message: 'Error',
          detail: err.message
      })
  }
}



const updateUser = async (req, res) => {
  try {
      const newData = req.body

      const resp = await User.findByIdAndUpdate(
          newData.userId,
          { $set: newData },
          { new: true })

      return res.json({
          message: 'User updated successfully',
          detail: resp
      })
  } catch (err) {
      return res.json({
          message: 'Error',
          detail: err
      })
  }
}


const deleteUser = async (req, res) => {
  try {
      const resp = await User.findByIdAndDelete(req.body.userId)

      return res.json({
          message: 'User deleted successfully',
          detail: resp
      })
  } catch (err) {
      return res.json({
          message: 'Error',
          detail: err
      })
  }
}

module.exports = {
  signUp,
  login, //agregamos le login en cuaalquier pasrte de aca
  getUsers,
  updateUser,
  deleteUser,
};
