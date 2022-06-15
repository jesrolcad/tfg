const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const router =  require('./api/router');
const morgan = require('morgan');

require("dotenv").config();

//Server is listening
app.listen(5000, () => {
    console.log('listening on port 5000')
})

//Conexion MongoDB
const connection_string = process.env.CONNECTION_STRING
mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("MongoDB connection established")})
.catch((error) => {console.error("MongoDB connection failed:",error.message)})

//Static files
app.use(express.static('./public'));

//Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));

//Routes
app.use('/api/v1', router);