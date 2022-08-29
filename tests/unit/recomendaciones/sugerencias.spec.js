import { shallowMount } from '@vue/test-utils';
import Sugerencias from 'Sugerencias.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const mockSugeridos = [
    {
        "_id": "62ab0378fca44224c2b22641",
        "tipo": "Película",
        "titulo": "Toy Story 3",
        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/AbbXspMOwdvwWZgVN0nabZq03Ec.jpg",
        "fecha": "2010-06-16T00:00:00.000Z",
        "puntuacion": 4,
        "numPuntuaciones": 2,
        "distance": 0.5
    },
]

describe('TESTS SUGERENCIAS', () => {

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

    describe('MÉTODO GETSUGERENCIAS', () => {

        it('CASO GENERAL', async () => {

            fetch.mockResponse(JSON.stringify(mockSugeridos));

            const wrapper = shallowMount(Sugerencias, {

                global: {
                    plugins: [router],

                    mocks: {
                        $router: mockRouter
                    },
                }


            });

            wrapper.vm.getSugerencias();
            await flushPromises();

            expect(wrapper.vm.sugeridos).toStrictEqual(mockSugeridos);


        })



    })

    
})
