import { mount, shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"
import Listas from 'Listas.vue';
import flushPromises from 'flush-promises';


describe('TESTS DE LISTAS', () => {

    fetch.resetMocks();

    describe('MÉTODO GETLISTAS', () => {

        describe('CASOS POSITIVOS', () => {

            const mockResponse = [
                {
                    lista: {
                        nombre: 'Prueba',
                        programas: []
                    },
                    generos: ['PruebaGenero']
                }
            ]

            const router = createRouter({
                history: createWebHistory(),
                routes: routes,
            })

            it('CASO GENERAL', async () => {

                fetch.mockResponse(JSON.stringify(mockResponse));
                const wrapper = shallowMount(Listas, {
                    global: {
                        plugins: [router],
                        stubs: {
                            'font-awesome-icon': {
                                template: '<i />'
                            }
                        }
                    }
                });
                wrapper.vm.getListas();
                await flushPromises();

                console.log(wrapper.vm.listas);

            }
            )
        }
        )
    })
})