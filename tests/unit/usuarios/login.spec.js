import { mount } from '@vue/test-utils'
import Login from 'Login.vue'
import flushPromises from 'flush-promises'
const {casosDeleteValidationLogin, casosNegativosLoginSubmit} = require('./casos.js')

describe('TESTS DE LOGIN DE USUARIOS', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
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

        for(const caso of casosDeleteValidationLogin){
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


    describe('TESTS MÉTODO SUBMIT', () => {

        describe('CASOS POSITIVOS', () => {

            it('RESPUESTA CON STATUS 200', async () => {

                const mockResponse = {
                    status: 200,
                    token: 'randomToken',
                    role: 'randomRole'
                }
    
                const mockLogin = jest.spyOn(Login.methods, 'login');
    
                fetch.mockResponse(JSON.stringify(mockResponse));
                const wrapper = mount(Login);
                wrapper.vm.user.nombreUsuario = 'randomUser';
                wrapper.vm.user.password = 'randomPassword';
                wrapper.vm.submit();
                await flushPromises();
    
                expect(sessionStorage.getItem('token')).not.toBeNull();
                expect(sessionStorage.getItem('role')).not.toBeNull();
                expect(sessionStorage.getItem('token')).toBe(mockResponse.token);
                expect(sessionStorage.getItem('role')).toBe(mockResponse.role);
                expect(mockLogin).toHaveBeenCalledTimes(1);
            })
        })

        describe('CASOS NEGATIVOS', () => {

            const mockLogin = jest.spyOn(Login.methods, 'login');

            for(const caso of casosNegativosLoginSubmit){

                it(caso.key, async () => {
                    const wrapper = mount(Login);
                    wrapper.vm.user.nombreUsuario = caso.nombreUsuario;
                    wrapper.vm.user.password = caso.password;
                    wrapper.vm.submit();
                    await flushPromises();
                    const textDanger = wrapper.findAll('.text-danger');
            
                    expect(textDanger.length).toBe(caso.numMensajesValidacion);
                    expect(mockLogin).toHaveBeenCalledTimes(0);
                })

            }
        })
    })
})