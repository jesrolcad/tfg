// CASOS GET INSIGNIAS USUARIO
const casosPositivosGetInsigniasUsuario = [

    {
        key: 'OBTENER INSIGNIAS USUARIO userTester',
        nombreUsuario: 'userTester',
        insigniasEsperadas: 0
    },

    {
        key: 'OBTENER INSIGNIAS USUARIO anotherUserTester',
        nombreUsuario: 'anotherUserTester',
        insigniasEsperadas: 1
    },
    {
        key: 'OBTENER INSIGNIAS USUARIO usuarioLista',
        nombreUsuario: 'usuarioLista',
        insigniasEsperadas: 15
    }
]
// CASOS RECIBIR UNA INSIGNIA LISTAS PROPIAS
const casosPositivosGetInsigniasListasPropias = [

    {
        key: 'OBTENER INSIGNIA LIST BEGINNER',
        nombreUsuario: 'userTester',
        listaPropia: [{listasPropias: 1}]
    },

    {
        key: 'OBTENER INSIGNIA LIST EXPERT',
        nombreUsuario: 'userTester',
        listaPropia: [{listasPropias: 3}]
    },

    {
        key: 'OBTENER INSIGNIA LIST FREAK',
        nombreUsuario: 'userTester',
        listaPropia: [{listasPropias: 5}]
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioLista',
        listaPropia: [{listasPropias: 9}]

    },

    {
        key: 'YA TIENE LIST BEGINNER',
        nombreUsuario: 'anotherUserTester',
        listaPropia: [{listasPropias: 0}]
    },

    {
        key: 'SIN LISTA PROPIA',
        nombreUsuario: 'usuarioCuatro',
        listaPropia:[]
    },
]

// CASOS RECIBIR UNA INSIGNIA PROGRAMAS LISTAS PROPIAS
const casosPositivosGetInsigniasProgramasLP = [

    {
        key: 'OBTENER INSIGNIA BRONCE LIST',
        nombreUsuario: 'userTester',
        result: [{programas: [1,2,3,4,5]},{programas: [1,2,3,4,5,6,7,8]}],
        insignia: "Bronce"
    },

    {
        key: 'OBTENER INSIGNIA SILVER LIST AND GOLD LIST Y YA TIENE BRONCE',
        nombreUsuario: 'userTester',
        result: [{programas: [1,2,3,4,5,6,7,8,9,10]},{programas: [1,2,3,4,5]},
        {programas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]},{programas: [1,2,3]}],
        insignia: "Plata, Oro"
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioLista',
        result: [{programas: [1,2,3,4,5,6,7,8,9,10]},{programas: [1,2,3,4,5]},
        {programas: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]}],
        insignia: "Todas"

    },

    {
        key: 'SIN LISTA INSIGNIA',
        nombreUsuario: 'usuarioCuatro',
        result:[]
    },
]

// CASOS RECIBIR UNA INSIGNIA ACTORES
const casosPositivosGetInsigniasActores = [

    {
        key: 'OBTENER INSIGNIA Actor/Actress Fan',
        nombreUsuario: 'userTester',
        result: [{ "_id": "Stan Lee", "count": 1},{"_id": "Chris Evans", "count": 3}],
        insignia: "Fan"
    },

    {
        key: 'OBTENER INSIGNIA Actor/Actress Lover AND Actor/Actress Addict Y YA Actor/Actress Fan',
        nombreUsuario: 'userTester',
        result: [{"_id": "Chris Evans", "count": 3},{"_id": "Scarlett Johansson", "count": 5},{"_id": "Robert Downey Jr.", "count": 10}],
        insignia: "Lover, Addict"
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioLista',
        result: [{"_id": "Chris Evans", "count": 3},{"_id": "Scarlett Johansson", "count": 5},{"_id": "Robert Downey Jr.", "count": 10}],
        insignia: "Todas"

    },

    {
        key: 'SIN LISTA INSIGNIA',
        nombreUsuario: 'usuarioCuatro',
        result: []
    },
]

const casosPositivosGetInsigniasProgramasV = [

    {
        key: 'OBTENER INSIGNIA Bronce Watcher',
        nombreUsuario: 'userTester',
        result: [{programa: 10}],
        insignia: "Bronce"
    },

    {
        key: 'OBTENER INSIGNIA Silver Watcher',
        nombreUsuario: 'userTester',
        result: [{programa: 25}],
        insignia: "Silver"
    },

    {
        key: 'SIN INSIGNIA NUEVA',
        nombreUsuario: 'userTester',
        result: [{programa: 42}],
        insignia: "Otro"
    },

    {
        key: 'OBTENER INSIGNIA Gold Watcher',
        nombreUsuario: 'userTester',
        result: [{programa: 50}],
        insignia: "Gold"
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioLista',
        result: [{programa: 100}],
        insignia: "Todas"

    },

    {
        key: 'SIN INSIGNIA PROGRAMA V',
        nombreUsuario: 'usuarioCuatro',
        result: []
    },
]

const casosPositivosGetInsigniasGeneros = [

    {
        key: 'OBTENER INSIGNIA Amateur Genre Watcher',
        nombreUsuario: 'userTester',
        result: [{"_id": "Familia","count": 5}],
        insignia: "Amateur"
    },

    {
        key: 'OBTENER INSIGNIA Intermediate Genre Watcher AND Professional Genre Watcher Y YA Amateur Genre Watcher',
        nombreUsuario: 'userTester',
        result: [{"_id": "Ciencia ficción", "count": 10},{"_id": "Comedia", "count": 20},{"_id": "Familia","count": 5}],
        insignia: "Intermediate, Professional"
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioLista',
        result: [{"_id": "Ciencia ficción", "count": 15},{"_id": "Comedia", "count": 20},{"_id": "Familia","count": 5}],
        insignia: "Todas"

    },

    {
        key: 'SIN INSIGNIA',
        nombreUsuario: 'usuarioCuatro',
        result: []
    },
]

module.exports = {casosPositivosGetInsigniasUsuario, casosPositivosGetInsigniasListasPropias,
    casosPositivosGetInsigniasProgramasLP,casosPositivosGetInsigniasActores,
    casosPositivosGetInsigniasProgramasV, casosPositivosGetInsigniasGeneros}