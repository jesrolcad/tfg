const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const Programa = require('../models/Programa');
const Lista = require('../models/Lista');
const Puntuacion = require('../models/Puntuacion');
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

//Creating some initial data for the tests
const setupData = async () => {

    try {

        //USUARIOS

        const usuario1 = await new Usuario({
            nombre: "Usuario Test",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'userTester',
            email: "test@user.com",
            password: bcrypt.hashSync('12345678', 10)
        }).save();

        const usuario2 = await new Usuario({
            nombre: "Usuario Testt",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'anotherUserTester',
            email: "anotherTest@user.com",
            password: bcrypt.hashSync('12345678', 10)
        }).save();

        const usuario3 = await new Usuario({
            nombre: "usuarioo",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'usuarioLista',
            email: "usuario3@gmail.com",
            password: bcrypt.hashSync('12345678', 10)
        }).save();

        //PROGRAMAS
        const programa1 = await new Programa({
            tipo: "Película",
            titulo: "La maldición (Cursed)",
            titulo_url: "https://www.themoviedb.org/movie/10012",
            imagen: "https://www.themoviedb.org/t/p/w220_and_h330_face/7v8VjNe3eTr83ocRBQ8ItEtjsSQ.jpg",
            fecha: "2020-07-17",
            generos: [
                "Terror",
                "Comedia"
            ],
            clasificacion_edad: "PG-13",
            duracion: "1h 36m",
            descripcion: `Descripción de prueba`,

            estado: "Estrenada",
            idioma_original: "Inglés",
            plataformas: [
                "HBO"
            ],
            actoresIds: []
        }).save();

        const programa2 = await new Programa({
            tipo: "Serie",
            titulo: "La maldición (Cursed)",
            titulo_url: "https://www.themoviedb.org/movie/10013",
            imagen: "https://www.themoviedb.org/t/p/w220_and_h330_face/7v8VjNe3eTr83ocRBQ8ItEtjsSQ.jpg",
            fecha: "2020-07-17",
            generos: [
                "Ciencia ficción",
                "Aventura"
            ],
            clasificacion_edad: "PG-13",
            duracion: "1h 36m",
            descripcion: `Descripción de prueba 2`,

            estado: "Estrenada",
            idioma_original: "Inglés",
            plataformas: [
                "Netflix"
            ],
            actoresIds: []
        }).save();

        const programa3 = await new Programa({
            tipo: "Serie",
            titulo: "Prueba Lista",
            titulo_url: "https://www.themoviedb.org/movie/10013",
            imagen: "https://www.themoviedb.org/t/p/w220_and_h330_face/7v8VjNe3eTr83ocRBQ8ItEtjsSQ.jpg",
            fecha: "2020-07-17",
            generos: [
                "Ciencia ficción"
            ],
            clasificacion_edad: "PG-13",
            duracion: "1h 36m",
            descripcion: `Descripción de prueba 2`,

            estado: "Estrenada",
            idioma_original: "Inglés",
            plataformas: [
                "Netflix"
            ],
            actoresIds: []
        }).save();

        //LISTAS
        const programasVistosUsuario1 = await new Lista({
            nombre: "Programas vistos",
            programas: [programa2._id],
            usuario: usuario1._id

        }).save();

        const programasVistosUsuario2 = await new Lista({
            nombre: "Programas vistos",
            programas: [programa1._id],
            usuario: usuario2._id
        }).save();

        const enSeguimientoUsuario2 = await new Lista({
            nombre: "En seguimiento",
            programas: [],
            usuario: usuario2._id
        }).save();

        const listaVacia = await new Lista({
            nombre: "listaVacía",
            programas: [],
            usuario: usuario1._id
        }).save();

        const listaConUnPrograma = await new Lista({
            nombre: "listaConUnPrograma",
            programas: [programa1._id],
            usuario: usuario1._id
        }).save();

        const listaConUnGenero = await new Lista({
            nombre: "listaConUnGénero",
            programas: [programa3._id],
            usuario: usuario1._id
        }).save();

        const listaConVariosProgramas = await new Lista({
            nombre: "listaConVariosProgramas",
            programas: [programa1._id, programa2._id, programa3._id],
            usuario: usuario2._id
        }).save();

        //Listas para las pruebas

        const lista1 = await new Lista({
            nombre: "lista1Usuario3",
            programas: [],
            usuario: usuario3._id
        }).save();

        const lista2 = await new Lista({
            nombre: "lista2Usuario3",
            programas: [programa1._id],
            usuario: usuario3._id
        }).save();

        const programasVistosUser3 = await new Lista({
            nombre: "Programas vistos",
            programas: [programa1._id, programa2._id],
            usuario: usuario3._id
        }).save();

        //PUNTUACIONES
        const puntuacion1 = await new Puntuacion({
            usuario: usuario2._id,
            programa: programa1._id,
            puntuacion: 5
        }).save();

        const puntuacionUser3 = await new Puntuacion({
            usuario: usuario3._id,
            programa: programa1._id,
            puntuacion: 1
        }).save();


    } catch (err) {
        console.log(err);

    }
}

module.exports = { connectDB, disconnectDB, setupData };