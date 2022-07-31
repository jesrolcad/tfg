const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');

let mongod = null;

const connectDB = async () => {
    try {
        let dbUrl = process.env.CONNECTION_STRING;
        if (process.env.NODE_ENV.trim() === 'test') {
            mongod = await MongoMemoryServer.create();
            dbUrl = mongod.getUri();
        }

        mongoose.connect(dbUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log(dbUrl);
        console.log('MongoDB connected');

    } 
    
    
    catch (err) {
        console.log(err);
        process.exit(1);
    }
};

const disconnectDB = async () => {
    try {
        await mongoose.connection.close();
        if (mongod) {
            await mongod.stop();
        }
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

//Creating some users for the tests that
const setupUsuarios = async () => {

    try {

        const usuario1 = new Usuario({
            nombre: "Usuario Test",
            nombreUsuario: 'userTester',
            email: "test@user.com",
            password: bcrypt.hashSync('12345678', 10)
        })

        await usuario1.save();

    } catch (err) {
        console.log(err);

    }
}

module.exports = { connectDB, disconnectDB, setupUsuarios };