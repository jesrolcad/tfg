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

const casosNegativosEliminarLista = [
    {
        key: 'ELIMINAR LISTA DE PROGRAMAS VISTOS',
        nombreLista: "Programas vistos",
        statusEsperado: 400
    },

    {
        key: 'ELIMINAR LISTA DE EN SEGUIMIENTO',
        nombreLista: "En seguimiento",
        statusEsperado: 400

    },

    {
        key: 'ELIMINAR LISTA DE OTRO USUARIO',
        nombreLista: "listaConUnPrograma",
        statusEsperado: 401
    },

    {
        key: 'ELIMINAR LISTA INEXISTENTE',
        idLista: '62ab0378fca44224c2b226c7',
        statusEsperado: 400
    }, 

    {
        key: 'ELIMINAR LISTA CON ID NO VÁLIDO',
        idLista: '1',
        statusEsperado: 400

    }
]

const casosNegativosAgregarProgramaLista = [

    {
        key: 'AÑADIR PROGRAMA A LISTA DE OTRO USUARIO',
        statusEsperado: 401,
        otroUser: true
    },

    {
        key: 'AÑADIR PROGRAMA A LISTA INEXISTENTE',
        statusEsperado: 400,
        idLista: "62ab0378fca44224c2b226c7"
    },

    {
        key: 'AÑADIR PROGRAMA INEXISTENTE A LISTA',
        statusEsperado: 400,
        idPrograma: "62ab0378fca44224c2b226c7"
    },

    {
        key: 'AÑADIR PROGRAMA A LISTA CON ID NO VÁLIDO',
        statusEsperado: 400,
        idLista: "1"
    },

    {
        key: 'AÑADIR PROGRAMA CON ID NO VÁLIDO A LISTA',
        statusEsperado: 400,
        idPrograma: "1"
    },

    {
        key: 'AÑADIR PROGRAMA DUPLICADO A LISTA',
        statusEsperado: 400,
        programaDuplicado: true
    }
]


const casosPositivosEliminarProgramaLista = [

    {
        key: 'ELIMINAR PROGRAMA DE LISTA CONCRETA',
        nombreLista: 'lista2Usuario3'
    }, 

    {
        key: 'ELIMINAR PROGRAMA DE PROGRAMAS VISTOS (PROGRAMA CON PUNTUACIÓN)',
        nombreLista: 'Programas vistos'
    },

    {
        key: 'ELIMINAR PROGRAMA DE PROGRAMAS VISTOS (PROGRAMA SIN PUNTUACIÓN)',
        nombreLista: 'Programas vistos',
        log: true
    }
]

const casosNegativosEliminarProgramaLista = [

        {
            key: 'ELIMINAR PROGRAMA DE LISTA DE OTRO USUARIO',
            statusEsperado: 401,
            otroUser: true
        },
    
        {
            key: 'ELIMINAR PROGRAMA DE LISTA INEXISTENTE',
            statusEsperado: 400,
            idLista: "62ab0378fca44224c2b226c7"
        },
    
        {
            key: 'ELIMINAR PROGRAMA INEXISTENTE DE LISTA',
            statusEsperado: 400,
            idPrograma: "62ab0378fca44224c2b226c7"
        },
    
        {
            key: 'ELIMINAR PROGRAMA DE LISTA CON ID NO VÁLIDO',
            statusEsperado: 400,
            idLista: "1"
        },
    
        {
            key: 'ELIMINAR PROGRAMA CON ID NO VÁLIDO DE LISTA',
            statusEsperado: 400,
            idPrograma: "1"
        },
    
        {
            key: 'ELIMINAR PROGRAMA DUPLICADO DE LISTA',
            statusEsperado: 400,
            programaDuplicado: true
        },

        {
            key: 'ELIMINAR PROGRAMA QUE NO ESTÁ EN LA LISTA',
            statusEsperado: 400,
            programaNoEnLista: true
        }
]

module.exports = {casosPositivosGetGenerosLista, casosNegativosObtenerLista,
    casosPositivosCrearLista, casosNegativosCrearLista, casosNegativosEliminarLista,
    casosNegativosAgregarProgramaLista, casosPositivosEliminarProgramaLista, casosNegativosEliminarProgramaLista}