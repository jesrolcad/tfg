//GET SUGERENCIAS
const casosSugerencias = [
    {
        key:'SUGERENCIAS USER 1 SOBRE PROG 5',
        usuario: 'userTester',
        programa: '62ab0378fca44224c2b22619',
        generos:["Action & Adventure","Drama","Crimen"],
        id: 'user1'
    },
    {
        key:'SUGERENCIAS USER 3 SOBRE PROG 2',
        usuario: 'usuario3',
        programa:'62ab039cfca44224c2b249e2',
        generos: ["Action & Adventure","Drama","Misterio"],
        id: 'user3'
    },
    {
        key:'SUGERENCIAS PROG 4 SIN GENERO',
        usuario: 'userTester',
        programa: '62ab0378fca44224c2b243b7',
        generos: [],
        id:"sin genero"
    },
    {
        key:'SUGERENCIAS PROG 3 SIN VOTAR',
        usuario: 'userTester',
        programa: '62ab0378fca44224c2b24322',
        generos:["Suspense","Drama"],
        id:"sin votar"
    }
]

//GET RECOMENDACIONES
const casosRecomendaciones = [
    {
        key:'RECOMENDACIONES USER 1',
        usuario: 'userTester',
        id: 'user1'
    },
    {
        key:'RECOMENDACIONES USER 2',
        usuario: 'anotherUserTester',
        id: 'user2'
    },
    {
        key:'RECOMENDACIONES USER PUNTUADOS SIN GENERO',
        usuario: 'usuario5',
        id:"sin genero"
    },
    {
        key:'RECOMENDACIONES USER SIN PUNTUADOS',
        usuario: 'usuario4',
        id:"sin votar"
    }
]

module.exports = {casosSugerencias, casosRecomendaciones}