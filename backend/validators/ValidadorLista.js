const {body} = require('express-validator');
const Lista = require('../models/Lista');

module.exports.ListaSchema = [

    body('nombre').exists({checkFalsy: true}).withMessage("El nombre es obligatorio")
    .isLength({min: 5, max: 50}).withMessage("El nombre debe contener entre 5 y 50 caracteres")
    .matches(/^[a-zA-Z0-9áéíóúÁÉÍÓÚñÑüÜ\s]+$/).withMessage("El nombre solo debe contener letras y números")
    .custom(async (value, {req}) => {
        //nombre must be unique
        console.log(req);
        const lista = await Lista.findOne({ nombre: value, usuario: req.user._id });
        if (lista) {
            return Promise.reject('El nombre de la lista ya existe');
        }
    }),

]

