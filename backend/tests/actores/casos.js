//CASOS POSITIVOS POST ACTORES PROGRAMA
const casosPositivosActoresId= [
    {
        key: 'ACTORES DE UN PROGRAMA',
        listaActoresIds: ["6278e2f74de5a9a89916d003","6278e2f74de5a9a89916d006",
        "6278e2f74de5a9a89916d007","6278e2f74de5a9a89916d00b","6278e2f74de5a9a89916d00d"]
    }
]

//CASOS NEGATIVOS POST ACTORES PROGRAMA
const casosNegativosActoresId= [
    {
        key: 'ARRAY IDs ERRONEOS',
        listaActoresIds: ["4","3","2"],
        id: "idErroneo"
    },
    {
        key: 'ARRAY VACIO',
        listaActoresIds: [],
        id: "idsVacio"
    },
    {
        key: 'IDs String',
        listaActoresIds: "6278e2f94de5a9a8991707f8, 6278e2f94de5a9a8991707f9",
        id: "bodyErroneo"
    }
]

//CASOS POSITIVOS GET ACTORES NOMBRE
const casosPositivosActoresNombre= [
    {
        key: 'PERSONAJES DE UN ACTOR CON SERIES Y PELIS',
        nombre: "Mario Casas",
        id: "Todo"
    },
    {
        key: 'PERSONAJES DE UNA ACTRIZ CON SERIES',
        nombre: "Madelyn Cline",
        id: "Serie"
    },
    {
        key: 'PERSONAJES DE UN ACTOR CON PELIS',
        nombre: "Ryan Reynolds",
        id: "Peli"
    },
    {
        key: 'ACTOR INEXISTENTE',
        nombre: "Menganito",
        id: "Inexistente"
    }
]


module.exports = {casosPositivosActoresId,casosNegativosActoresId,casosPositivosActoresNombre}
