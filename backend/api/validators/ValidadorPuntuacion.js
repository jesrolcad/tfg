const {body} = require('express-validator');

module.exports.PuntuacionSchema = [

    //check that puntuacion is between is required
    body('puntuacion').exists({checkFalsy: true}).withMessage("La puntuación es obligatoria")
    .isInt({min: 1, max: 5}).withMessage("La puntuación debe ser un número entre 1 y 5")

]