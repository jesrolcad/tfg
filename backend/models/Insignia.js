const mongoose = require('mongoose');
const {Schema} = mongoose;

const InsigniaSchema = new Schema({

    nombre: {
        type: String,
    },

    insignia: {
        type: String
    }},

    {collection: 'insignias'});

module.exports = mongoose.model('Insignia', InsigniaSchema)