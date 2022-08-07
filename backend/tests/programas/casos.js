
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

module.exports = {casosPositivosObtenerProgramaNombre, casosNegativosObtenerProgramaId}