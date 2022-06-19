const {body} = require('express-validator');

module.exports.ListaSchema = [

    body('nombre').exists({checkFalsy: true}).withMessage("El nombre es obligatorio")
    .isLength({min: 1, max: 50}).withMessage("El nombre no debe superar los 50 caracteres")
]
