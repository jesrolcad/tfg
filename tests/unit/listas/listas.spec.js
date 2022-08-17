import {shallowMount } from '@vue/test-utils';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"
import Listas from 'Listas.vue';
import flushPromises from 'flush-promises';

const mockResponse =  [
    {
        lista: {
            nombre: 'Prueba',
            programas: []
        },
        generos: ['PruebaGenero']
    }
]


describe('TESTS DE LISTAS', () => {

    const router = createRouter({
        history: createWebHistory(),
        routes: routes,
    })

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })



    describe('MÉTODO GETLISTAS', () => {

        describe('CASOS POSITIVOS', () => {

            
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

                expect(wrapper.vm.listas.length).toBe(1);

            }
            )
        }
        )
    })

    describe('MÉTODO BORRARLISTA', () => {

        const mockResponseGetListas = [
            {
                lista: {
                    nombre: 'Prueba',
                    programas: []
                },
                generos: ['PruebaGenero']
            }
        ]
        describe('CASOS POSITIVOS', () => {
            it('RESPUESTA STATUS 200', async () => {

                const mockResponseBorrarLista = {
                    status: 200,
                    message: 'Lista borrada con éxito'

                }

                fetch.once(JSON.stringify(mockResponseGetListas)).once(JSON.stringify(mockResponseBorrarLista)).once(JSON.stringify(mockResponseGetListas));

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

                let mockGetListas = jest.spyOn(wrapper.vm, 'getListas');
                await flushPromises();
                wrapper.vm.borrarLista(1);
                await flushPromises();
                expect(mockGetListas).toHaveBeenCalledTimes(1);


            })
        })

        describe('CASOS NEGATIVOS', () => {
            it('RESPUESTA STATUS 400', async () => {
                    const mockResponseBorrarLista = {
                        status: 400,
                        message: 'Error al borrar la lista'
                    }

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
                    
                    fetch.once(JSON.stringify(mockResponseGetListas)).once(JSON.stringify(mockResponseBorrarLista)).once(JSON.stringify(mockResponseGetListas));
                    let mockGetListas = jest.spyOn(wrapper.vm, 'getListas');
                    await flushPromises();
                    wrapper.vm.borrarLista(1);
                    await flushPromises();
                    expect(mockGetListas).toHaveBeenCalledTimes(0);
    
            })
        })
    })

    
    describe('MÉTODO ADDLISTAPERFIL', () => {

        it('CASO GENERAL', () => {

            fetch.once(JSON.stringify(mockResponse))
            
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

            let mockGetListas = jest.spyOn(wrapper.vm, 'getListas');

            wrapper.vm.addListaPerfil();

            expect(mockGetListas).toHaveBeenCalledTimes(1);
            expect(wrapper.vm.showModal).toBe(false);
        }) 
    })


    describe('MÉTODO GETLISTA', () => {
        describe('CASOS POSITIVOS', () => {

            it('RESPUESTA STATUS 200', async () => {

                const mockResponseGetLista = {
                    status: 200,
                    lista: {
                        nombre: 'Prueba',
                        programas: [1,2,3,4,5]
                    }
                }

                    fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseGetLista));

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

                    await flushPromises();
                    wrapper.vm.getLista(1);
                    await flushPromises();


                    expect(wrapper.vm.lista.nombre).toBe('Prueba');
                    expect(wrapper.vm.showModalProgramas).toBe(true);
                    expect(wrapper.vm.datosPaginados.length).toBe(5);
            })
        })

        describe('CASOS NEGATIVOS', () => {

            it('RESPUESTA STATUS 400', async () => {
                    
                    const mockResponseGetLista = {
                        status: 400,
                        msg: 'Error al obtener la lista'
                    }
    
                    fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseGetLista));
    
                    const wrapper = shallowMount(Listas, {
                        global: {
                            plugins: [router],
                            stubs: {
                                'font-awesome-icon': {
                                    template: '<i />'
                                }
                            }
                        },

                        data () {
                            return {
                                lista: {
                                    nombre: '',
                                    programas: []

                                }
                            }
                        }
                    });

                    await flushPromises();
                    wrapper.vm.getLista(1);
                    await flushPromises();

                    expect(wrapper.vm.datosPaginados.length).toBe(0);
            })
        })

        describe('MÉTODO BORRARPROGRAMALISTA', () => {
            describe('CASOS POSITIVOS', () => {

                it('RESPUESTA STATUS 204', async () => {

                    const mockResponseBorrarPrograma = {
                        status: 204,
                        msg: 'Programa borrado con éxito'
                    }

                    fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseBorrarPrograma)).once(JSON.stringify(mockResponse));

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

                    const mockGetListas = jest.spyOn(wrapper.vm, 'getListas');

                    await flushPromises();
                    wrapper.vm.borrarProgramaLista(1,1);
                    await flushPromises();

                    expect(mockGetListas).toHaveBeenCalledTimes(1);
                    expect(wrapper.vm.showModalProgramas).toBe(false);
                })

            })

            describe('CASOS NEGATIVOS', () => {

                it('RESPUESTA STATUS 400', async () => {

                    const mockResponseBorrarPrograma = {
                        status: 400,
                        msg: 'Error al borrar el programa'
                    }

                    fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseBorrarPrograma));

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

                    const mockGetListas = jest.spyOn(wrapper.vm, 'getListas');

                    await flushPromises();
                    wrapper.vm.borrarProgramaLista(1,1);
                    await flushPromises();

                    expect(mockGetListas).toHaveBeenCalledTimes(0);
                })
            })

        })
    })


})