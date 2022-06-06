const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');


//const router = require('./api/router');

require("dotenv").config();

app.use(express.json());
app.use(cors());

const connection_string = process.env.CONNECTION_STRING

app.listen(5000, () => {
    console.log('listening on port 5000')
})

//app.use('/api/v1', router);

// app.listen(process.env.EXPRESS_PORT, function() {
//     console.log("App running at http://localhost:" + process.env.EXPRESS_PORT);
//     console.log("________________________________________________________________");
// });

mongoose.connect(connection_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {console.log("MongoDB connection established")})
.catch((error) => {console.error("MongoDB connection failed:",error.message)})