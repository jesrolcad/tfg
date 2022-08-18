import { shallowMount } from '@vue/test-utils';
import ProgramaShow from 'ProgramaShow.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const mockPrograma = {
    "_id": "62ab0378fca44224c2b22610", "tipo": "Película", "titulo": "Les 2 papas et la maman",
    "titulo_url": "https://www.themoviedb.org/movie/100075", "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/eA6gGjwq8W43SVabikKDLDIYhFS.jpg",
    "fecha": "1996-04-24T00:00:00.000Z", "generos": ["Comedia"], "duracion": "1h 30m", "clasificacion_edad": "Todas las edades",
    "descripcion": "...", "estado": "Estrenada", "idioma_original": "Francés",
    "plataformas": ["Netflix"], "actoresIds": ["6278e2de4de5a9a89916b67a", "6278e2de4de5a9a89916b67b",
        "6278e2de4de5a9a89916b67c", "6278e2de4de5a9a89916b67d", "6278e2de4de5a9a89916b67f"]
}

const mockActores = [1,2,3]

const mockListas = [
    {
        lista: {
            _id: "62fbbc80781c1e43c7498775",
            usuario: "62ae2b85cb5a83d76153b887",
            nombre: "Programas vistos",
            programas: [
                "62ab0378fca44224c2b246eb",
                "62ab0378fca44224c2b248f9",
                "62ab0378fca44224c2b24349"
            ],
        },
        generos: [
            "Terror",
            "Suspense",
            "Drama",
            "..."
        ]
    },
    {
        lista: {
            _id: "62fbbc80781c1e43c7498784",
            usuario: "62ae2b85cb5a83d76153b887",
            nombre: "En seguimiento",
            programas: [],
        },
        generos: [
            "Sin géneros"
        ]
    },
]

const mockPuntuacion = {
    status: 200,
    puntuacion: 5

}

const mockPuntuacionMedia = {
    status: 200,
    puntuacionMedia: {
        _id: 1,
        numPuntuaciones: 2,
        media: 3
    }
}

describe('TESTS PROGRAMASHOW', () => {


    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    })
    
    const mockRoute = {
        params: {
            id: 1
        }
    }
    
    const mockRouter = {
        push: jest.fn()
    }
    
    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    
    describe('MÉTODO GETPROGRAMA', () => {
        it('CASO GENERAL', async () => {
            
            fetch.once(JSON.stringify(mockPrograma)).once(JSON.stringify(mockListas)).once(JSON.stringify(mockPuntuacion))
                .once(JSON.stringify(mockPuntuacionMedia)).once(JSON.stringify(mockActores)).once(JSON.stringify(mockPrograma));


            const wrapper = shallowMount(ProgramaShow, {
                global: {
                    plugins: [router],
                    stubs: {
                        'font-awesome-icon': {
                            template: '<i />'
                        }
                    },

                    mocks: {
                        $route: mockRoute,
                        $router: mockRouter
                    },
                },

                data() {
                    return {
                        programa: mockPrograma,
                        listas: mockListas,
                        puntuacion: 5,
                        puntuacionMedia: {
                            _id: 1,
                            numPuntuaciones: 2,
                            media: 3
                        },
                    }
                }
            });


            await flushPromises()
            wrapper.vm.getPrograma()
            await flushPromises()
            expect(wrapper.vm.programa).toStrictEqual(mockPrograma)
            expect(wrapper.vm.actores).toStrictEqual(mockPrograma.actoresIds)
        })
    })

    describe('MÉTODO GETACTORES', () => {
        it('CASO GENERAL', async () => {
            
            fetch.once(JSON.stringify(mockPrograma)).once(JSON.stringify(mockListas)).once(JSON.stringify(mockPuntuacion))
                .once(JSON.stringify(mockPuntuacionMedia)).once(JSON.stringify(mockActores)).once(JSON.stringify(mockActores));

                const wrapper = shallowMount(ProgramaShow, {
                    global: {
                        plugins: [router],
                        stubs: {
                            'font-awesome-icon': {
                                template: '<i />'
                            }
                        },
    
                        mocks: {
                            $route: mockRoute,
                            $router: mockRouter
                        },
                    },
    
                    data() {
                        return {
                            programa: mockPrograma,
                            listas: mockListas,
                            puntuacion: 5,
                            puntuacionMedia: {
                                _id: 1,
                                numPuntuaciones: 2,
                                media: 3
                            },
                        }
                    }
                });

            await flushPromises()
            wrapper.vm.getActores()
            await flushPromises()
            expect(wrapper.vm.actoresR).toStrictEqual(mockActores)
    })
})
})