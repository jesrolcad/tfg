const mongoose = require('mongoose');
const {Schema} = mongoose;

var uniqueValidator = require('mongoose-unique-validator');

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },

    nombreUsuario: {
        type: String,
        unique: true,
        required: [true, "El nombre de usuario es obligatorio"],
    },

    
    email: {
        type: String,
        unique: true,
        required: [true, "La dirección de correo electrónico es obligatoria"],
    },

    password: {
        type: String,
        required: [true, "Le contraseña es obligatoria"],
    }}, 
    
    {collection: 'usuarios'});


// elimina la key password del objeto que retorna al momento de crear un usuario
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }

 usuarioSchema.plugin(uniqueValidator,  {
    message: "{PATH} debe ser único"
 })

 module.exports = mongoose.model('Usuario', usuarioSchema)