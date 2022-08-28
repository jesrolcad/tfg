import { shallowMount } from '@vue/test-utils';
import RecomendacionesUsuario from 'RecomendacionesUsuario.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const mockRecomendados = [
    {
        "_id": "62ab0378fca44224c2b22641",
        "tipo": "Película",
        "titulo": "Toy Story 3",
        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/AbbXspMOwdvwWZgVN0nabZq03Ec.jpg",
        "fecha": "2010-06-16T00:00:00.000Z",
        "puntuacion": [
            4,
            4
        ],
        "numPuntuaciones": 2,
        "puntuacionMedia": 4
    }
]

describe('TESTS RECOMENDACIONESUSUARIO', () => {

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

    describe('MÉTODO GETRECOMENDADO', () => {

        it('CASO GENERAL', async () => {

            fetch.mockResponse(JSON.stringify(mockRecomendados));

            const wrapper = shallowMount(RecomendacionesUsuario, {

                global: {
                    plugins: [router],

                    mocks: {
                        $router: mockRouter
                    },
                }

            })

            wrapper.vm.getRecomendado();
            await flushPromises();

            expect(wrapper.vm.recomendados).toStrictEqual(mockRecomendados);

            const recomendaciones = wrapper.findAll('.col-8');
            expect(recomendaciones.length).toBe(1);
        })
    })

})

