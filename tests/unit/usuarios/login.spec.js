import { mount } from '@vue/test-utils'
import Login from 'Login.vue'
import flushPromises from 'flush-promises'
const {casosDeleteValidation} = require('./casos.js')

describe('TESTS DE LOGIN DE USUARIOS', () => {

    beforeEach(() => {
        fetch.resetMocks();
    })

    describe('TESTS MÉTODO LOGIN', () => {

        describe('CASOS POSITIVOS', () => {

            const mockResponse = {
                status: 200,
                token: 'randomToken',
                role: 'randomRole'
            }

            it('RESPUESTA CON STATUS 200', async () => {

                const mockRouter = {
                    push: jest.fn()
                }

                fetch.mockResponse(JSON.stringify(mockResponse));
                const wrapper = mount(Login, {
                    global: {
                        mocks: {
                            $router: mockRouter
                        }
                    }

                });
                wrapper.vm.login();
                await flushPromises();

                expect(sessionStorage.getItem('token')).not.toBeNull();
                expect(sessionStorage.getItem('role')).not.toBeNull();
                expect(sessionStorage.getItem('token')).toBe(mockResponse.token);
                expect(sessionStorage.getItem('role')).toBe(mockResponse.role);
                expect(mockRouter.push).toHaveBeenCalledTimes(1);
                expect(mockRouter.push).toHaveBeenCalledWith({ name: 'Programas' });

            })
        })

        describe('CASOS NEGATIVOS', () => {

            const mockResponse = {
                status: 400,
                ok: false,
                err: {
                    message: 'Usuario incorrecto'
                }
            }

            it('RESPUESTA CON STATUS 400', async () => {

                fetch.mockResponse(JSON.stringify(mockResponse));
                const wrapper = mount(Login);
                wrapper.vm.login();
                await flushPromises();

                expect(wrapper.vm.usuarioIncorrecto).toBe(true);
                expect(wrapper.vm.mensaje).toBe('Usuario y/o contraseña incorrectos');
            })
        })
    })


    describe('TESTS MÉTODO DELETEVALIDATION', () => {

        for(const caso of casosDeleteValidation){
            it(caso.key, async () => {

                const wrapper = mount(Login);
                wrapper.vm.usuarioIncorrecto = caso.usuarioIncorrecto;
                wrapper.vm.mensaje = caso.mensaje;
                await flushPromises();

                expect(wrapper.vm.usuarioIncorrecto).toBe(caso.usuarioIncorrecto);
                expect(wrapper.vm.mensaje).toBe(caso.mensaje);
            })
        }
    })
})