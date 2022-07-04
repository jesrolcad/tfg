const {body} = require('express-validator');
const Usuario = require('../models/Usuario');

module.exports.registroSchema = [
    
body('nombre').exists({checkFalsy: true}).withMessage("El nombre es obligatorio").isLength({min: 5, max:50})
.withMessage("El nombre y apellidos deben tener entre 5 y 50 caracteres").isAlpha('es-ES', {ignore: " "}).withMessage("El nombre y apellidos solo deben contener letras"),
body('nombreUsuario').exists({checkFalsy: true}).withMessage("El nombre de usuario es obligatorio")
.isAlpha().withMessage("El nombre de usuario solo puede contener letras")
.isLength({min: 5, max: 30}).withMessage("El nombre de usuario debe contener entre 5 y 30 caracteres")
.custom(async value => {
  return Usuario.findOne({nombreUsuario: value}).then(user => {
    if(user){
      return Promise.reject("Nombre de usuario en uso");
    }
  })
}),
body('email').isEmail().withMessage("No sigue el formato adecuado").custom(async value => {
  return Usuario.findOne({email: value}).then(user => {
    if(user){
      return Promise.reject('Correo electrónico en uso');
    }})}),
body('password').isLength({ min: 8 }).withMessage("La contraseña debe tener como mínimo 8 caracteres")
]