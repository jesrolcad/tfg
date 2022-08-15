const mongoose = require('mongoose');
const Usuario = require('../models/Usuario');
const Programa = require('../models/Programa');
const Actor = require('../models/Actor');
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
            password: bcrypt.hashSync('12345678', 10),
            insignias: ["List Beginner"]
        }).save();

        const usuario3 = await new Usuario({
            nombre: "usuarioo",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'usuarioLista',
            email: "usuario3@gmail.com",
            password: bcrypt.hashSync('12345678', 10),
            insignias: ['Bronce Watcher','Silver Watcher','Gold Watcher','Amateur Genre Watcher','Intermediate Genre Watcher',
            'Professional Genre Watcher','Actor/Actress Fan','Actor/Actress Lover','Actor/Actress Addict','List Beginner',
            'List Expert','List Freak','Bronce List','Silver List','Gold List']
        }).save();

        const usuario4 = await new Usuario({
            nombre: "Usuario Test4",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'usuarioCuatro',
            email: "usuarioCuatro@user.com",
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
            programa: programa3._id,
            puntuacion: 1
        }).save();


    } catch (err) {
        console.log(err);

    }
}

const setupDataActor = async () => {

    try {

        //USUARIOS

        const usuario1 = await new Usuario({
            nombre: "Usuario Test",
            fechaNacimiento: "2000-06-07",
            nombreUsuario: 'userTester',
            email: "test@user.com",
            password: bcrypt.hashSync('12345678', 10)
        }).save();

        //PROGRAMAS
        const programa1 = await new Programa({
            tipo: "Serie",
            titulo: "El inocente",
            titulo_url: "https://www.themoviedb.org/tv/119988",
            imagen: "https://www.themoviedb.org/t/p/w220_and_h330_face/gA49CDurmOaF9T09gwI6GfIlBeM.jpg",
            fecha: "2021-04-30",
            generos: ["Crimen","Misterio","Drama"],
            clasificacion_edad: "16",
            duracion: "58m",
            descripcion: "Una noche, hace nueve años, Mateo intercedió inocentemente en una pelea y terminó convirtiéndose en un asesino. Ahora es un ex convicto que no da nada por sentado. Su mujer, Olivia, está embarazada, y los dos están a punto de conseguir la casa de sus sueños. Pero una llamada impactante e inexplicable desde el móvil de Olivia vuelve a destrozar la vida de Mateo por segunda vez.",
            estado: "Finalizado",
            idioma_original: "Español; Castellano",
            plataformas: ["Netflix"],
            actoresIds: [
                {
                "$oid": "6278e2f84de5a9a89916e4e6"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4e7"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4e8"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4e9"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4ea"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4eb"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4ec"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4ed"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4ee"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4ef"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4f0"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4f1"
                },
                {
                "$oid": "6278e2f84de5a9a89916e4f2"
                }
            ]
          }).save();

        const programa2 = await new Programa({
            tipo: "Serie",
            titulo: "Outer Banks",
            titulo_url: "https://www.themoviedb.org/tv/100757",
            imagen: "https://www.themoviedb.org/t/p/w220_and_h330_face/oPxi7n5w4GRMi67MfLBxXwuaotz.jpg",
            fecha: "2020-04-15",
            generos: ["Action & Adventure","Drama","Misterio"],
            clasificacion_edad: "TV-MA",
            duracion: "49m",
            descripcion: "En una isla de ricos y pobres, un grupo de adolescentes formado por John B, JJ, Pope y Kiara, encuentran un misterioso barco hundido tras un huracán, y se adentran en una peligrosa aventura para buscar un legendario tesoro vinculado a la desaparición del padre de John B.",
            estado: "Volverá a emitirse",
            idioma_original: "Inglés",
            plataformas: ["Netflix"],
            actoresIds: [
                {
                    "$oid": "6278e2f84de5a9a89916d6ec"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6ed"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6ee"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6ef"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f0"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f1"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f2"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f3"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f4"
                },
                {
                    "$oid": "6278e2f84de5a9a89916d6f5"
                }
            ]
          }).save();

        const programa3 = await new Programa({
            tipo:"Película",
            titulo:"Hogar",
            titulo_url: "https://www.themoviedb.org/movie/674944",
            imagen:"https://www.themoviedb.org/t/p/w220_and_h330_face/gShIscjUsRrrJ0LeKbaN…",
            fecha:"2020-03-25",
            generos:[],
            clasificacion_edad:"16",
            duracion:"1h 43m",
            descripcion:"Narra la historia de Javier Muñoz, un ejecutivo publicitario de éxito,…",
            estado:"Estrenada",
            idioma_original:"Español; Castellano",
            plataformas:[],
            actoresIds:[]
        }).save();

        const programa4 = await new Programa({
            tipo:"Película",
            titulo:"El Proyecto Adam",
            titulo_url:"https://www.themoviedb.org/movie/696806",
            imagen:"https://www.themoviedb.org/t/p/w220_and_h330_face/k5waciRFMN5bwudDrgFL…",
            fecha:"2022-03-11",
            generos:[],
            clasificacion_edad:"12",
            duracion:"1h 46m",
            descripcion:"Adam Reed es un piloto de caza que viaja en el tiempo. Cuando se estre…",
            estado:"Estrenada",
            idioma_original:"Inglés",
            plataformas:[],
            actoresIds:[]
        }).save();

        //ACTORES
        const actor1 = await new Actor({
            "_id": "6278e2f74de5a9a89916d00b",
            "nombre": "Aria Bedmar",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/oMWWFondWiWSjKkSZKLXs7vYScj.jpg",
            "titulo": "Los herederos de la tierra",
            "titulo_url": "https://www.themoviedb.org/tv/128008",
            "personaje": "Mercè",
            "num_episodios": 8
        }).save();

        const actor2=await new Actor({
            "_id": "6278e2f74de5a9a89916d00d",
            "nombre": "Michelle Jenner",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/g3JyHqwBcV7g1ds3dHtWkDXyXqb.jpg",
            "titulo": "Los herederos de la tierra",
            "titulo_url": "https://www.themoviedb.org/tv/128008",
            "personaje": "Mar Estanyol",
            "num_episodios": 8
        }).save();

        const actor3=await new Actor({
            "_id": "6278e2f74de5a9a89916d007",
            "nombre": "Elena Rivera",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/tbLA4rAOfXaJXxFOXUYMYR204u9.jpg",
            "titulo": "Los herederos de la tierra",
            "titulo_url": "https://www.themoviedb.org/tv/128008",
            "personaje": "Caterina Llor",
            "num_episodios": 8
        }).save();

        const actor4=await new Actor({
            "_id": "6278e2f74de5a9a89916d006",
            "nombre": "Mercedes León",
            "titulo": "Los herederos de la tierra",
            "titulo_url": "https://www.themoviedb.org/tv/128008",
            "personaje": "Barcha",
            "num_episodios": 8,
            "imagen_actor": null
        }).save();

        const actor5=await new Actor({
            "_id": "6278e2f74de5a9a89916d003",
            "nombre": "Yon González",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/p8PNt1BoZobAF3vhbqE5ulXedMw.jpg",
            "titulo": "Los herederos de la tierra",
            "titulo_url": "https://www.themoviedb.org/tv/128008",
            "personaje": "Hugo Llor",
            "num_episodios": 8
        }).save();

        const actor6= await new Actor({
            "nombre": "Mario Casas",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/dqXRFhBB4OJQSWonymV8BfVghds.jpg",
            "titulo": "El inocente",
            "titulo_url": "https://www.themoviedb.org/tv/119988",
            "personaje": "Mateo",
            "num_episodios": 8
        }).save();

        const actor7 = await new Actor({
            "nombre": "Mario Casas",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/dqXRFhBB4OJQSWonymV8BfVghds.jpg",
            "personaje": "Tomás",
            "titulo": "Hogar",
            "titulo_url": "https://www.themoviedb.org/movie/674944"
        }).save();

        const actor8 = await new Actor({
            "nombre": "Madelyn Cline",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/xDr0s8nXYPZ4ZPAJA6pX8fx5hD2.jpg",
            "titulo": "Outer Banks",
            "titulo_url": "https://www.themoviedb.org/tv/100757",
            "personaje": "Sarah Cameron",
            "num_episodios": 20
        }).save();

        const actor9 = await new Actor({
            "nombre": "Ryan Reynolds",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/4SYTH5FdB0dAORV98Nwg3llgVnY.jpg",
            "personaje": "Adam Reed",
            "titulo": "El Proyecto Adam",
            "titulo_url": "https://www.themoviedb.org/movie/696806"
        }).save();


    } catch (err) {
        console.log(err);

    }
}

module.exports = { connectDB, disconnectDB, setupData, setupDataActor };