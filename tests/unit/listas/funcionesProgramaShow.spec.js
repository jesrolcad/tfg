import { shallowMount } from '@vue/test-utils';
import ProgramaShow from 'ProgramaShow.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"


describe('TESTS MÉTODOS DE LISTAS PROGRAMASHOW', () => {

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

    const mockPrograma = { "_id": "62ab0378fca44224c2b22610", "tipo": "Película", "titulo": "Les 2 papas et la maman", 
    "titulo_url": "https://www.themoviedb.org/movie/100075", "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/eA6gGjwq8W43SVabikKDLDIYhFS.jpg", 
    "fecha": "1996-04-24T00:00:00.000Z", "generos": ["Comedia"], "duracion": "1h 30m", "clasificacion_edad": "Todas las edades", 
    "descripcion": "...", "estado": "Estrenada", "idioma_original": "Francés", 
    "plataformas": ["Netflix"], "actoresIds": ["6278e2de4de5a9a89916b67a", "6278e2de4de5a9a89916b67b", 
    "6278e2de4de5a9a89916b67c", "6278e2de4de5a9a89916b67d", "6278e2de4de5a9a89916b67f"] }

    const mockActores = []

    const mockListas = [
            {

                lista: {
                    _id: 1,
                    nombre: 'Programas vistos',
                    programas: []
                },

                generos: ['a', 'b']

            },
            {

                lista: {
                    _id: 2,
                    nombre: 'En seguimiento',
                    programas: []
                },

                generos: ['a']

            }
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
    describe('MÉTODO GETLISTAS', () => {
        it('CASO GENERAL', async () => {

            fetch.once(JSON.stringify(mockPrograma)).once(JSON.stringify(mockListas)).once(JSON.stringify(mockPuntuacion))
            .once(JSON.stringify(mockPuntuacionMedia)).once(JSON.stringify(mockActores));
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
                        listas: mockListas
                    }
                }
            });
            await flushPromises();
            wrapper.vm.getListas();
            await flushPromises();

            expect(wrapper.vm.listas.length).toBe(2);
        })
    })

})