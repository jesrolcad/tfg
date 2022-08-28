import { shallowMount } from '@vue/test-utils';
import Estadisticas from 'Estadisticas.vue';
import flushPromises from 'flush-promises';

const mockTipoProgramaEdad = {
    "result": {
        "22": [
            16,
            5
        ],
        "23": [
            1,
            0
        ],
        "24": [
            2,
            8
        ]
    },
    "peliculas": 19,
    "series": 13
}

const mockProgramas = {
    "Programas": "12.5k"
}

const mockGenerosProgramas = {
    "generos": [
        "News",
        "Bélica",
        "Action & Adventure",
        "Comedia",
        "Fantasía",
        "Aventura",
        "Sci-Fi & Fantasy",
        "Película de TV",
        "Drama",
        "Crimen",
        "Familia",
        "Ciencia ficción",
        "Romance",
        "Documental",
        "Música",
        "Animación",
        "Kids",
        "Reality",
        "Soap",
        "Historia",
        "Misterio",
        "Talk",
        "Suspense",
        "Terror",
        "Acción",
        "Western",
        "War & Politics"
    ],
    "count": [
        3,
        277,
        500,
        3899,
        656,
        1090,
        499,
        370,
        4930,
        1353,
        1407,
        646,
        1124,
        1519,
        342,
        1454,
        293,
        242,
        21,
        396,
        869,
        34,
        1558,
        707,
        1343,
        112,
        71
    ]
}

const mockUsuariosMes = {
    "meses": [
        "May",
        "Jun",
        "Jul",
        "Aug"
    ],
    "count": [
        1,
        3,
        8,
        5
    ],
    "total": 17
}

const mockPuntuaciones = {
    "puntuados": 30,
    "puntuaciones": 38
}

const mockListasUsuarios = {
    "listasUsuarios": [
        {
            "_id": 3,
            "nUsuarios": 7
        },
        {
            "_id": 1,
            "nUsuarios": 1
        },
        {
            "_id": 2,
            "nUsuarios": 6
        },
        {
            "_id": 4,
            "nUsuarios": 1
        }
    ],
    "media": 2.53,
    "listas": 38
}

const mockPieInsignias = {
    "insignias": [
        "Bronce List",
        "Intermediate Genre Watcher",
        "List Freak",
        "Silver Watcher",
        "Bronce Watcher",
        "Actor/Actress Lover",
        "Amateur Genre Watcher",
        "List Expert",
        "Actor/Actress Addict",
        "List Beginner"
    ],
    "count": [
        2,
        1,
        2,
        1,
        1,
        1,
        1,
        2,
        1,
        2
    ]
}

const mockProgramasLP = {
    "listasProgramas": [
        {
            "_id": 0,
            "numListas": 34
        },
        {
            "_id": 1,
            "numListas": 1
        },
        {
            "_id": 2,
            "numListas": 1
        },
        {
            "_id": 3,
            "numListas": 1
        },
        {
            "_id": 7,
            "numListas": 1
        }
    ],
    "media": 0.34,
    "listas": 38
}

const mockEdadMediaGenero = [
    {
        "_id": "Action & Adventure",
        "edadMedia": 23.5
    },
    {
        "_id": "Fantasía",
        "edadMedia": 22.5
    },
    {
        "_id": "Comedia",
        "edadMedia": 22.571428571428573
    },
    {
        "_id": "Aventura",
        "edadMedia": 22.23076923076923
    },
    {
        "_id": "Sci-Fi & Fantasy",
        "edadMedia": 23.333333333333332
    },
    {
        "_id": "Película de TV",
        "edadMedia": 24
    },
    {
        "_id": "Drama",
        "edadMedia": 23.142857142857142
    },
    {
        "_id": "Crimen",
        "edadMedia": 22
    },
    {
        "_id": "Familia",
        "edadMedia": 22.09090909090909
    },
    {
        "_id": "Reality",
        "edadMedia": 22
    },
    {
        "_id": "Ciencia ficción",
        "edadMedia": 22
    },
    {
        "_id": "Romance",
        "edadMedia": 23
    },
    {
        "_id": "Kids",
        "edadMedia": 24
    },
    {
        "_id": "Animación",
        "edadMedia": 22.416666666666668
    },
    {
        "_id": "Misterio",
        "edadMedia": 23.2
    },
    {
        "_id": "Acción",
        "edadMedia": 22.285714285714285
    }
]

const mockPieActores = {
    "Actores": 125801,
    "Personajes": 228952
}

describe('TESTS ESTADISTICAS', () => {
    describe('TESTS ESTADISTICAS CREADAS TRAS CREATED', () => {

        it('CASO GENERAL', async () => {

            fetch.mockResponses([JSON.stringify(mockTipoProgramaEdad)], [JSON.stringify(mockPieActores)], [JSON.stringify(mockProgramas)],
            [JSON.stringify(mockUsuariosMes)], [JSON.stringify(mockGenerosProgramas)], [JSON.stringify(mockPuntuaciones)], [JSON.stringify(mockPieInsignias)],
            [JSON.stringify(mockListasUsuarios)], [JSON.stringify(mockProgramasLP)], [JSON.stringify(mockEdadMediaGenero)]);

            const spyGetPieActores = jest.spyOn(Estadisticas.methods, 'getPieActores');
            const spyGetTipoProgramaEdad = jest.spyOn(Estadisticas.methods, 'getTipoProgramaEdad');
            const spyGetProgramas = jest.spyOn(Estadisticas.methods, 'getProgramas');
            const spyGetUsuariosMes = jest.spyOn(Estadisticas.methods, 'getUsuariosMes');
            const spyGetGenerosProgramas = jest.spyOn(Estadisticas.methods, 'getGenerosPrograma');
            const spyGetPuntuaciones = jest.spyOn(Estadisticas.methods, 'getPuntuaciones');
            const spyGetPieInsignias = jest.spyOn(Estadisticas.methods, 'getPieInsignias');
            const spyGetListasUsuarios = jest.spyOn(Estadisticas.methods, 'getListasUsuarios');
            const spyGetProgramasLP = jest.spyOn(Estadisticas.methods, 'getProgramasLP');
            const spyGetEdadMediaGenero = jest.spyOn(Estadisticas.methods, 'getEdadMediaGenero');

            const wrapper = shallowMount(Estadisticas);

            await flushPromises();

            expect(spyGetPieActores).toHaveBeenCalled();
            expect(spyGetTipoProgramaEdad).toHaveBeenCalled();
            expect(spyGetProgramas).toHaveBeenCalled();
            expect(spyGetUsuariosMes).toHaveBeenCalled();
            expect(spyGetGenerosProgramas).toHaveBeenCalled();
            expect(spyGetPuntuaciones).toHaveBeenCalled();
            expect(spyGetPieInsignias).toHaveBeenCalled();
            expect(spyGetListasUsuarios).toHaveBeenCalled();
            expect(spyGetProgramasLP).toHaveBeenCalled();
            expect(spyGetEdadMediaGenero).toHaveBeenCalled();




        })
        
    })
})