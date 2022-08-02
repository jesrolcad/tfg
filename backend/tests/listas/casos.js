//CASOS GET GÉNEROS DE LISTA

const casosPositivosGetGenerosLista = [

    {
        key: 'OBTENER GÉNEROS LISTA VACÍA',
        nombreLista: 'listaVacía',
        generosEsperados: 0
    },

    {
        key: 'OBTENER GÉNEROS LISTA CON 1 PROGRAMA DE 1 GÉNERO',
        nombreLista: 'listaConUnGénero',
        generosEsperados: 1
    },

    {
        key: 'OBTENER GÉNEROS LISTA CON UN PROGRAMA DE DOS GÉNEROS',
        nombreLista: 'listaConUnPrograma',
        generosEsperados: 2
    },

    {
        key: 'OBTENER GÉNEROS LISTA CON VARIOS PROGRAMAS CON 4 GÉNEROS EN TOTAL',
        nombreLista: 'listaConVariosProgramas',
        generosEsperados: 4

    }
]

//CASOS OBTENER LISTA CONCRETA

const casosNegativosObtenerLista = [

    {
        key: 'OBTENER LISTA CONCRETA DE OTRO USUARIO',
        statusEsperado: 401,
        listaOtroUser: true
    },

    {
        key: 'OBTENER LISTA INEXISTENTE',
        statusEsperado: 400,
        listaInexistente: true,
        idLista: '62ab0378fca44224c2b226c7'
    },

    {
        key: 'OBTENER LISTA CON ID NO VÁLIDO',
        statusEsperado: 400,
        listaIdNoValido: true,
        idLista: 1
    }
]

//CASOS CREAR LISTA

const casosPositivosCrearLista = [

    {
        key: 'CREAR LISTA CON 5 CARACTERES',
        nombreLista: 'listaa',

    },

    {
        key: 'CREAR LISTA CON 25 CARACTERES',
        nombreLista: 'listaaaaaaaaaaaaaaaaaaaaa',

    },

    {
        key: 'CREAR LISTA CON NÚMEROS Y TILDES',
        nombreLista: 'l1stá',
    }

]

const casosNegativosCrearLista = [

    {
        key: 'CREAR LISTA SIN NOMBRE',
        nombreLista: '',
    },

    {
        key: 'CREAR LISTA QUE CONTENGA SOLO ESPACIOS',
        nombreLista: '     ',
    },

    {
        key: 'CREAR LISTA CON 4 CARACTERES',
        nombreLista: 'list',
    },

    {
        key: 'CREAR LISTA CON 26 CARACTERES',
        nombreLista: 'listaaaaaaaaaaaaaaaaaaaaaa',
    }, 

    {
        key: 'CREAR LISTA CON CARACTERES ESPECIALES',
        nombreLista: 'list@+',
    }, 

    {
        key: 'CREAR LISTA CON NOMBRE DUPLICADO',
        nombreLista: 'listaConUnPrograma',
    }


]

module.exports = {casosPositivosGetGenerosLista, casosNegativosObtenerLista, casosPositivosCrearLista, casosNegativosCrearLista}