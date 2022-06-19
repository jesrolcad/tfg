const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const router_programas =  require('./routes/router_programas');
/*const dotenv = require("dotenv");
dotenv.config();*/
require("dotenv").config();
const path = require('path');
// const cookieParser = require("cookie-parser");
// const sessions = require('express-session');

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



//Configuración de sesiones
// const oneDay = 1000 * 60 * 60 * 24;
// app.use(sessions({
//     secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
//     saveUninitialized:true,
//     cookie: { maxAge: oneDay },
//     resave: false 
// }));

app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

//Static files
app.use(express.static(path.join(__dirname, 'public')));


app.use(morgan('dev'));
app.use(express.json());
app.use(cors());



//Routes
app.use('/programas', router_programas);
app.use('/usuarios', require('./routes/usuarios'));

//Token de autenticación
process.env.CADUCIDAD_TOKEN = '48h';

//Seed de autenticación

process.env.SEED_AUTENTICACION = process.env.SEED_AUTENTICACION ||  'este-es-el-seed-desarrollo';




