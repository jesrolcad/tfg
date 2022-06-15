const mongoose = require('mongoose');
const {Schema} = mongoose;

const ListaSchema = new Schema({

    nombre: {
        type: String,
        required: [true, "El nombre de la lista es obligatorio"]
    },

    programas: {
        type: [mongoose.Types.ObjectId]
    },

    
    usuario: {
        type: mongoose.Types.ObjectId,
        ref: 'Usuario',
        required: [true, "Una lista debe ser creada por un usuario"],
    }}, 
    
    {collection: 'listas'});

 module.exports = mongoose.model('Lista', ListaSchema) 