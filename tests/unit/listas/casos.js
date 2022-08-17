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

const casosPositivosManipulacionListas = [
    {
        key: 'SETPROGRAMAVISTO: RESPUESTA STATUS 204',
        setProgramaVisto: true
    }, 
    {
        key: 'DELETEPROGRAMAVISTO: RESPUESTA STATUS 204',
        deleteProgramaVisto: true
    },
    {
        key: 'SETPROGRAMASEGUIMIENTO: RESPUESTA STATUS 204',
        setProgramaSeguimiento: true
    },
    {
        key: 'DELETEPROGRAMASEGUIMIENTO: RESPUESTA STATUS 204',
        deleteProgramaSeguimiento: true
    }
]

const casosNegativosManipulacionListas = [
    {
        key: 'SETPROGRAMAVISTO: RESPUESTA STATUS 400',
        setProgramaVisto: true
    },
    {
        key: 'DELETEPROGRAMAVISTO: RESPUESTA STATUS 400',
        deleteProgramaVisto: true
    },
    {
        key: 'SETPROGRAMASEGUIMIENTO: RESPUESTA STATUS 400',
        setProgramaSeguimiento: true
    },
    {
        key: 'DELETEPROGRAMASEGUIMIENTO: RESPUESTA STATUS 400',
        deleteProgramaSeguimiento: true
    }
]

const casosPropiedadesComputadas = [
    {
        key: 'CALCULO PROPIEDAD PROGRAMAESTAVISTO',
        programaEstaVisto: true
    },

    {
        key: 'CALCULO PROPIEDAD PROGRAMAESTASEGUIMIENTO',
        programaEstaEnSeguimiento: true
    }
]

module.exports = {casosPositivosCrearLista, casosNegativosCrearLista, casosPositivosManipulacionListas, casosNegativosManipulacionListas, casosPropiedadesComputadas}