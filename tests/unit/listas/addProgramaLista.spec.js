import { shallowMount } from '@vue/test-utils';
import AddProgramaLista from 'AddProgramaLista.vue';
import flushPromises from 'flush-promises';

describe('TESTS ADDPROGRAMALISTA', () => {

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

    const mockResponseGetListasPersonalizadas = [
        {
            lista: {
                nombre: 'Programas vistos',
                programas: []
            },

            lista: {
                nombre: 'En seguimiento',
                programas: [1, 2, 3]
            },

            lista: {
                nombre: 'Programas pendientes',
                programas: [4, 5, 6]
            }

        },
    ]

    describe('MÉTODO GETLISTASPERSONALIZADAS', () => {

        it('CASO GENERAL', async () => {

            fetch.once(JSON.stringify(mockResponseGetListasPersonalizadas));

            const wrapper = shallowMount(AddProgramaLista, {
                global: {
                    stubs: {
                        'font-awesome-icon': {
                            template: '<i />'
                        }
                    },

                    mocks: {
                        $route: mockRoute,
                        $router: mockRouter
                    }
                },
            });

            wrapper.vm.getListasPersonalizadas();
            await flushPromises();
            expect(wrapper.vm.listasPersonalizadas.length).toBe(1);
        })
    })

    describe('MÉTODO ADDPROGRAMATOLISTA', () => {

        describe('CASOS POSITIVOS', () => {
            it('RESPUESTA STATUS 204', async () => {

                const mockResponse = {
                    status: 204
                }

                fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseGetListasPersonalizadas));
                const wrapper = shallowMount(AddProgramaLista, {
                    global: {
                        stubs: {
                            'font-awesome-icon': {
                                template: '<i />'
                            }
                        },

                        mocks: {
                            $route: mockRoute,
                            $router: mockRouter
                        }
                    },
                });

                let mockGetListasPersonalizadas = jest.spyOn(wrapper.vm, 'getListasPersonalizadas');
                wrapper.vm.addProgramaToLista(1);
                await flushPromises();
                expect(wrapper.emitted().escucharAdd).toBeTruthy();
                expect(mockGetListasPersonalizadas).toHaveBeenCalledTimes(1);

            })
        })

        describe('CASOS NEGATIVOS', () => {

            it('RESPUESTA STATUS 400', async () => {

                const mockResponse = {
                    status: 400,
                    msg: 'Error al añadir el programa a la lista'
                }

                fetch.once(JSON.stringify(mockResponse));
                const wrapper = shallowMount(AddProgramaLista, {
                    global: {
                        stubs: {
                            'font-awesome-icon': {
                                template: '<i />'
                            }
                        },

                        mocks: {
                            $route: mockRoute,
                            $router: mockRouter
                        }
                    },
                });
                wrapper.vm.addProgramaToLista(1);
                await flushPromises();
                expect(wrapper.emitted().escucharAdd).toBeFalsy();
            })
        })

        describe('MÉTODO DELETEPROGRAMAFROMLISTA', () => {

            describe('CASOS POSITIVOS', () => {
                it('RESPUESTA STATUS 204', async () => {

                    const mockResponse = {
                        status: 204
                    }

                    fetch.once(JSON.stringify(mockResponse)).once(JSON.stringify(mockResponseGetListasPersonalizadas));
                    const wrapper = shallowMount(AddProgramaLista, {
                        global: {
                            stubs: {
                                'font-awesome-icon': {
                                    template: '<i />'
                                }
                            },

                            mocks: {
                                $route: mockRoute,
                                $router: mockRouter
                            }
                        },
                    });
                    let mockGetListasPersonalizadas = jest.spyOn(wrapper.vm, 'getListasPersonalizadas');
                    wrapper.vm.deleteProgramaFromLista(1);
                    await flushPromises();
                    expect(mockGetListasPersonalizadas).toHaveBeenCalledTimes(1);
                })
            })

            describe('CASOS NEGATIVOS', () => {

                it('RESPUESTA STATUS 400', async () => {

                    const mockResponse = {
                        status: 400,
                        msg: 'Error al eliminar el programa de la lista'
                    }

                    fetch.once(JSON.stringify(mockResponse));
                    const wrapper = shallowMount(AddProgramaLista, {
                        global: {
                            stubs: {
                                'font-awesome-icon': {
                                    template: '<i />'
                                }
                            },

                            mocks: {
                                $route: mockRoute,
                                $router: mockRouter
                            }
                        },
                    });
                    let mockGetListasPersonalizadas = jest.spyOn(wrapper.vm, 'getListasPersonalizadas');
                    wrapper.vm.deleteProgramaFromLista(1);
                    await flushPromises();
                    expect(mockGetListasPersonalizadas).toHaveBeenCalledTimes(0);
                })
            })
        })

        describe('MÉTODO ADDLISTA', () => {
            it('CASO GENERAL', () => {
                const wrapper = shallowMount(AddProgramaLista, {
                    global: {
                        stubs: {
                            'font-awesome-icon': {
                                template: '<i />'
                            }
                        },

                        mocks: {
                            $route: mockRoute,
                            $router: mockRouter
                        }
                    },
                });
                wrapper.vm.addLista("a");
                expect(wrapper.vm.showModal).toBe(false);
                expect(wrapper.emitted().escucharAdd).toBeTruthy();
                expect(wrapper.vm.listasPersonalizadas).toContain("a");
            })
        })
    })
})