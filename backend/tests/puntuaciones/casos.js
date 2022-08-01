// OBTENER PUNTUACIÓN 
const casosNegativosPuntuacionPrograma = [
    
    {
        key: 'EL ID DEL PROGRAMA NO ES VÁLIDO',
        idPrograma: '1'
    }, 

    {
        key: 'EL ID DEL PROGRAMA NO EXISTE',
        idPrograma: '62ab0378fca44224c2b226c7'

    }

]

//PUNTUAR PROOGRAMA

const casosPositivosPuntuarPrograma = [
    {
        key: 'PUNTUACIÓN POR PRIMERA VEZ VALOR 1',
        puntuacion: 1,
    }, 

    {
        key: 'ACTUALIZACIÓN PUNTUACIÓN VALOR 5',
        puntuacion: 5,
    }
]

const casosNegativosPuntuarPrograma = [

    {
        key: 'EL ID DEL PROGRAMA NO ES VÁLIDO',
        idPrograma: '1',
        puntuacion: 5
    },

    {
        key: 'EL ID DEL PROGRAMA NO EXISTE',
        idPrograma: '62ab0378fca44224c2b226c7',
        puntuacion: 5
    },

    {
        key: 'EL PROGRAMA NO ESTÁ EN LA LISTA DE VISTOS',
        idPrograma: 'getFromDB',
        puntuacion: 5
    },

    {
        key: 'LA PUNTUACIÓN ES MENOR A 1',
        idPrograma: '5f1b9e1b9d6e0c2e2c6c8c6b',
        puntuacion: 0
    },

    {
        key: 'LA PUNTUACIÓN ES MAYOR A 5',
        idPrograma: '5f1b9e1b9d6e0c2e2c6c8c6b',
        puntuacion: 6
    },

    {
        key: 'LA PUNTUACIÓN NO ES UN NÚMERO ENTERO',
        idPrograma: '5f1b9e1b9d6e0c2e2c6c8c6b',
        puntuacion: 3.5
    },

    {
        key: 'LA PUNTUACIÓN NO ES UN NÚMERO',
        idPrograma: '5f1b9e1b9d6e0c2e2c6c8c6b',
        puntuacion: 'a'
    },

]

module.exports = {casosNegativosPuntuacionPrograma, casosPositivosPuntuarPrograma, casosNegativosPuntuarPrograma}