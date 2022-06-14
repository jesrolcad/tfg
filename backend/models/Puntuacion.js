const mongoose = require('mongoose');
const {Schema} = mongoose;

const PuntuacionSchema = new Schema({

    puntuacion: {
        type: Number,
        min: [1, "La puntuación debe estar entre 1 y 5"],
        max: [5, "La puntuación debe estar entre 1 y 5"],
        required: [true, "La puntuación es obligatoria"]
    },

    programa: {
        type: mongoose.Types.ObjectId,
        ref: 'Programa',
        required: [true, "Se debe puntuar un programa"]
    },

    
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "Un programa debe ser puntuado por un usuario"],
    }}, 
    
    {collection: 'puntuaciones'});

 module.exports = mongoose.model('Puntuacion', PuntuacionSchema) 