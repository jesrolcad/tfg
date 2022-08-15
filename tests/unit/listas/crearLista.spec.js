import { mount } from '@vue/test-utils';
import CrearLista from 'CrearLista.vue';
import flushPromises from 'flush-promises'
import { casosPositivosCrearLista, casosNegativosCrearLista } from './casos';

describe('TESTS DE CREAR LISTA', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('MÉTODO CREARLISTA', () => {

        describe('CASOS POSITIVOS', () => {

            const mockResponse = {
                status: 200,
                lista: {
                    nombre: 'Prueba',
                }
            }

                it('RESPUESTA 200', async () => {

                    fetch.mockResponse(JSON.stringify(mockResponse));

                    const wrapper = mount(CrearLista);
                    wrapper.vm.nombre = 'Prueba';
                    wrapper.vm.crearLista();
                    await flushPromises();
                    expect(wrapper.vm.lista.nombre).toBe('Prueba');
                }
                )

        })

        describe('CASOS NEGATIVOS', () => {

            const mockResponse = {
                status: 400
            }

                it('RESPUESTA 400', () => {

                    fetch.mockResponse(JSON.stringify(mockResponse));

                    const wrapper = mount(CrearLista);
                    wrapper.vm.nombre = 'Prueba';
                    wrapper.vm.crearLista();

                    expect(wrapper.vm.lista).toStrictEqual({});
                }
                )

        })
    })

    describe('TEST MÉTODO SUBMIT', () => {

        describe('CASOS POSITIVOS', () => {

            const mockResponse = {
                status: 200
            }

            for(const caso of casosPositivosCrearLista){
                it(caso.key, async () => {

                    const mockCrearLista = jest.spyOn(CrearLista.methods, 'crearLista');
                    fetch.mockResponse(JSON.stringify(mockResponse));

                    const wrapper = mount(CrearLista);
                    wrapper.vm.nombre = caso.nombreLista;
                    wrapper.vm.submit();
                    await flushPromises();

                    expect(mockCrearLista).toHaveBeenCalledTimes(1);
                }
                )
            }
        })

        describe('CASOS NEGATIVOS', () => {
                
                const mockResponse = {
                    status: 400
                }
    
                for(const caso of casosNegativosCrearLista){
                    it(caso.key, async () => {
    
                        const mockCrearLista = jest.spyOn(CrearLista.methods, 'crearLista');
                        fetch.mockResponse(JSON.stringify(mockResponse));
    
                        const wrapper = mount(CrearLista);
                        wrapper.vm.nombre = caso.nombreLista;
                        wrapper.vm.submit();
                        await flushPromises();
    
                        expect(mockCrearLista).toHaveBeenCalledTimes(0);
                    }
                    )
                }
        })

    })

})