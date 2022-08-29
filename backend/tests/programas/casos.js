
//OBTENER PROGRAMA POR NOMBRE

const casosPositivosObtenerProgramaNombre = [
    {
        key: "BODY CON TÍTULO",
        titulo: 'Prueba',
        envioTitulo: true,
        tituloEsperado: 'Prueba Lista'
    },

    {
        key: "BODY CON TÍTULO VACÍO",
        titulo: "",
    }
]

const casosNegativosObtenerProgramaId = [

    {
        key: "PROGRAMA CON ID INEXISTENTE",
        idPrograma: "62ab0378fca44224c2b226c7",
        keyEsperada: "programaInexistente",
        statusEsperado: 400
    },
    
    {

        key: "PROGRAMA CON ID NO VÁLIDO",
        idPrograma: 1,
        keyEsperada: "idProgramaInvalido",
        statusEsperado: 400

    }
    
]

const casosPositivosProgramasFiltrados = [

    {
        key: "TIPO, GÉNERO Y PLATAFORMA VACÍOS",
        tipo: "",
        genero: "",
        plataforma: "",
        numProgramasEncontrados: 3
    }, 

    {
        key: "GÉNERO Y PLATAFORMAS VACÍOS",
        tipo: "Serie",
        genero: "",
        plataforma: "",
        numProgramasEncontrados: 2
    },

    {
        key: "TIPO Y PLATAFORMA VACÍOS",
        tipo: "",
        genero: "Terror",
        plataforma: "",
        numProgramasEncontrados: 1
    },

    {
        key: "TIPO Y GÉNERO VACÍOS",
        tipo: "",
        genero: "",
        plataforma: "HBO",
        numProgramasEncontrados: 1
    },

    {
        key:"PLATAFORMA VACÍA",
        tipo: "Serie",
        genero: "Ciencia ficción",
        plataforma: "",
        numProgramasEncontrados: 2
    }, 

    {
        key:"GÉNERO VACÍO",
        tipo: "Serie",
        genero: "",
        plataforma: "Netflix",
        numProgramasEncontrados: 2
    }, 

    {
        key:"TIPO VACÍO",
        tipo: "",
        genero: "Ciencia ficción",
        plataforma: "Netflix",
        numProgramasEncontrados: 2
    }
]

module.exports = {casosPositivosObtenerProgramaNombre, casosNegativosObtenerProgramaId, casosPositivosProgramasFiltrados}