const mongoose = require('mongoose');
const {Schema} = mongoose;

const ActorSchema = new Schema ({
    nombre: {
        
        type: String,
        required : [true, "El nombre del actor/actriz es obligatorio"]
    },
    imagen_actor: String,

    titulo: {
        type: String,
        required : [true, "El título del programa en el que participa el actor/actriz es obligatorio"]

    },
    
    titulo_url: String,
    personaje: {
        
        type: String,
        required : [true, "El nombre del personaje es obligatorio"]    
    
    },
    num_episodios: {

        type: Number,
        min: [1, "El número de episodios no puede ser negativo"]
    }
},
{collection: 'actores'});

const Actor = mongoose.model("Actor", ActorSchema);

module.exports = Actor;
