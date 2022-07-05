const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router_programas =  require('./routes/router_programas');
const router_actores =  require('./routes/router_actores');
const router_usuarios = require('./routes/usuarios');
require("dotenv").config();
const path = require('path');

//Server is listening
app.listen(5000, () => {
    console.log('listening on port 5000')
})

//Conexion MongoDB
mongoose.Promise = global.Promise;

const connection_string = process.env.CONNECTION_STRING;
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("MongoDB connection established")})
.catch((error) => {console.error("MongoDB connection failed:",error.message)})


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




