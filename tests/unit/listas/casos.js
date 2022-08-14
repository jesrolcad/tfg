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
    }
]

module.exports = {casosPositivosCrearLista, casosNegativosCrearLista}