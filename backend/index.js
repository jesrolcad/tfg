const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router_programas = require('./routes/router_programas');
const router_actores = require('./routes/router_actores');
const router_usuarios = require('./routes/router_usuarios');
const router_listas = require('./routes/router_listas');
const router_recomendaciones = require('./routes/router_recomendaciones');
const router_puntuaciones = require('./routes/router_puntuaciones');
const router_insignias = require('./routes/router_insignias');
const router_estadisticas = require('./routes/router_estadisticas');

require("dotenv").config();
const path = require('path');

const node_env = process.env.NODE_ENV.trim();
const connection_string = process.env.CONNECTION_STRING;

let server = '';

//Server is listening
if (node_env === 'test') {

    server = app.listen(0, () => {
        console.log('listening on port ' + server.address().port);
    })

} else {

    server = app.listen(5000, () => {
        console.log('listening on port 5000');
    })

}


//Conexion MongoDB
mongoose.Promise = global.Promise;

if (node_env == 'development') {
    mongoose.connect(connection_string, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("MongoDB connection established") })
        .catch((error) => { console.error("MongoDB connection failed:", error.message) })
}

if(node_env === 'production') {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    })
}
app.use(express.urlencoded({ extended: true }));

//Static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



//Routes
app.use('/programas', router_programas);
app.use('/actores', router_actores);
app.use('/usuarios', router_usuarios);
app.use('/', router_listas);
app.use('/puntuaciones', router_puntuaciones);
app.use('/recomendaciones', router_recomendaciones);
app.use('/insignias', router_insignias);
app.use('/estadisticas', router_estadisticas);



module.exports = { app, server };