import { mount } from '@vue/test-utils'
import Registro from 'Registro.vue'
import flushPromises from 'flush-promises'
import {casosDeleteValidationRegistro, casosPositivosSubmitRegistro} from './casos'

describe('TESTS DE REGISTRO DE USUARIOS', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })


    describe('TESTS MÉTODO REGISTER',  () => {

        describe('CASOS POSITIVOS', () => {

            it('RESPUESTA CON STATUS 200', async () => {

                const mockResponse = {
                    status: 200
                }

                const mockRouter = {
                    push: jest.fn()
                }

                fetch.mockResponse(JSON.stringify(mockResponse));

                const wrapper = mount(Registro, {
                    global: {
                        mocks: {
                            $router: mockRouter
                        }}})

                wrapper.vm.register();
                await flushPromises();

                expect(mockRouter.push).toHaveBeenCalledTimes(1);
                expect(mockRouter.push).toHaveBeenCalledWith({name: 'Home'});
            })

        })

        describe('CASOS NEGATIVOS', () => {

            it('RESPUESTA CON STATUS 400', async () => {

                const mockResponse = {
                    status: 400,
                    errors: ["message1", "message2"]
                }

                const mockRouter = {
                    push: jest.fn()
                }

                fetch.mockResponse(JSON.stringify(mockResponse));

                const wrapper = mount(Registro, {
                    global: {
                        mocks: {
                            $router: mockRouter
                        }}})

                wrapper.vm.register();
                await flushPromises();

                expect(mockRouter.push).toHaveBeenCalledTimes(0);
                expect(wrapper.vm.errors.length).toBe(2);
            })

        })



    })

    describe('TESTS MÉTODO SUBMIT', () => {

        describe('CASOS POSITIVOS', () => {

            const mockResponse = {
                status: 200
            }

            for(const caso of casosPositivosSubmitRegistro){
                it(caso.key, async () => {
        
                    const mockRegister = jest.spyOn(Registro.methods, 'register');
                    
                    fetch.mockResponse(JSON.stringify(mockResponse));

                    const wrapper = mount(Registro);

                    wrapper.vm.user.nombre = caso.nombre;
                    wrapper.vm.user.fechaNacimiento = caso.fechaNacimiento;
                    wrapper.vm.user.email = caso.email;
                    wrapper.vm.user.nombreUsuario = caso.nombreUsuario;
                    wrapper.vm.user.password = caso.password;
                    wrapper.vm.submit();
                    await flushPromises();

                    expect(mockRegister).toHaveBeenCalledTimes(1);
                    


                })
            }
        })


    })

    describe('TESTS MÉTODO DELETEVALIDATION', () =>  {

        for(const caso of casosDeleteValidationRegistro){

            it(caso.key, () => {

                const wrapper = mount(Registro)

                wrapper.vm.errors = caso.errors;
                wrapper.vm.deleteValidation('nombreUsuario');

                expect(wrapper.vm.errors.length).toBe(0);
            })
        }




    })
})