import { shallowMount } from '@vue/test-utils';
import Programas from 'Programas.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const mockPrograma = [{
    "_id": "62ab0378fca44224c2b22610", "tipo": "Película", "titulo": "Les 2 papas et la maman",
    "titulo_url": "https://www.themoviedb.org/movie/100075", "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/eA6gGjwq8W43SVabikKDLDIYhFS.jpg",
    "fecha": "1996-04-24T00:00:00.000Z", "generos": ["Comedia"], "duracion": "1h 30m", "clasificacion_edad": "Todas las edades",
    "descripcion": "...", "estado": "Estrenada", "idioma_original": "Francés",
    "plataformas": ["Netflix"], "actoresIds": ["6278e2de4de5a9a89916b67a", "6278e2de4de5a9a89916b67b",
        "6278e2de4de5a9a89916b67c", "6278e2de4de5a9a89916b67d", "6278e2de4de5a9a89916b67f"]
}];

const mockProgramaModificado = [{
    "_id": "62ab0378fca44224c2b22610", "tipo": "Película", "titulo": "Les 2 papas et la maman",
    "titulo_url": "https://www.themoviedb.org/movie/100075", "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/eA6gGjwq8W43SVabikKDLDIYhFS.jpg",
    "fecha": "1996-04-24T00:00:00.000Z", "generos": ["Comedia"], "duracion": "1h 30m", "clasificacion_edad": "Todas las edades",
    "descripcion": "...", "estado": "Estrenada", "idioma_original": "Francés",
    "plataformas": ["Netflix"], "actoresIds": ["6278e2de4de5a9a89916b67a", "6278e2de4de5a9a89916b67b",
        "6278e2de4de5a9a89916b67c", "6278e2de4de5a9a89916b67d", "6278e2de4de5a9a89916b67f"]
},

{
    "_id": "62ab0378fca44224c2b22610", "tipo": "Película", "titulo": "Les 2 papas et la maman",
    "titulo_url": "https://www.themoviedb.org/movie/100075", "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/eA6gGjwq8W43SVabikKDLDIYhFS.jpg",
    "fecha": "1996-04-24T00:00:00.000Z", "generos": ["Comedia"], "duracion": "1h 30m", "clasificacion_edad": "Todas las edades",
    "descripcion": "...", "estado": "Estrenada", "idioma_original": "Francés",
    "plataformas": ["Netflix"], "actoresIds": ["6278e2de4de5a9a89916b67a", "6278e2de4de5a9a89916b67b",
        "6278e2de4de5a9a89916b67c", "6278e2de4de5a9a89916b67d", "6278e2de4de5a9a89916b67f"]
}];

describe('TESTS DE PROGRAMAS', () => {

    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    })


    const mockRouter = {
        push: jest.fn()
    }

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('MÉTODO GETPROGRAMAS', () => {

        it('CASO GENERAL', async () => {

            fetch.once(JSON.stringify(mockPrograma)).once(JSON.stringify(mockProgramaModificado));

            const wrapper = shallowMount(Programas, {
                global: {
                    plugins: [router],

                    mocks: {
                        $router: mockRouter
                    },
                },
            })

            await flushPromises();
            wrapper.vm.getProgramas();
            await flushPromises();


            expect(wrapper.vm.programas.length).toBe(2);
        })

    })

})










