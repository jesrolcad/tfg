const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProgramaSchema = new Schema ({
    tipo: {type:String, enum:['Película','Serie']},
    titulo: String,
    titulo_url: String,
    imagen: String,
    fecha: Date,
    generos: Array,
    duracion: String,
    descripcion: String,
    estado: String,
    idioma_original: String,
    plataformas: Array,
    actoresIds: Array,
},
{collection: 'programas'});

const Programa = mongoose.model("Programa", ProgramaSchema);

module.exports = Programa;
