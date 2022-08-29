const {body} = require('express-validator');
const Usuario = require('../../models/Usuario');

module.exports.LoginSchema = [

    body('nombreUsuario').exists({checkFalsy: true}).withMessage("Completa el nombre de usuario"),
    body('password').exists({checkFalsy: true}).withMessage("Completa la contraseña")


]
