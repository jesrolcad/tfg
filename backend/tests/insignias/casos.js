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
]
// CASOS RECIBIR UNA INSIGNIA LISTAS PROPIAS
const casosPositivosGetInsigniasListasPropias = [

    {
        key: 'OBTENER INSIGNIA LIST BEGINNER',
        nombreUsuario: 'usuarioInsignia',
        listaPropia: 1
    },

    {
        key: 'OBTENER INSIGNIA LIST EXPERT',
        nombreUsuario: 'userTester',
        listaPropia: 3
    },

    {
        key: 'OBTENER INSIGNIA LIST FREAK',
        nombreUsuario: 'usuarioLista',
        listaPropia: 5
    },

    {
        key: 'TODAS LAS INSIGNIAS',
        nombreUsuario: 'usuarioAllInsignias',
        listaPropia: 9

    },

    {
        key: 'YA TIENE LIST BEGINNER',
        nombreUsuario: 'anotherUserTester',
        listaPropia: 0
    },
    
    {
        key: 'SIN LISTA PROPIA',
        nombreUsuario: 'usuarioSinListaP',
        listaPropia: -1
    },
]

module.exports = {casosPositivosGetInsigniasUsuario, casosPositivosGetInsigniasListasPropias}