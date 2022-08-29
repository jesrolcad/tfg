import Perfil from 'Perfil.vue'
import { shallowMount } from '@vue/test-utils'
import flushPromises from 'flush-promises'


describe('TESTS PERFIL', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS MÉTODO GETPERFIL', () => {

        it('RESPUESTA 200', async () => {

            const mockResponse = {

                    usuario: {

                        nombre: "nombre",
                        fechaNacimiento: "2000-06-07",
                        nombreUsuario: "usuarioA",
                        email: "jesrolcad@alum.us.es"

                    }
            }

            fetch.mockResponse(JSON.stringify(mockResponse));

            const wrapper = shallowMount(Perfil, {
                data() {
                    return {
                        perfil: {

                            usuario: {

                                nombre: "",
                                fechaNacimiento: "",
                                nombreUsuario: "",
                                email: ""

                            }

                        }
                    }
                }
            });

            await flushPromises();
            wrapper.vm.getPerfil();
            let perfil = wrapper.vm.perfil;

            await flushPromises();

            expect(perfil.usuario.nombre).toBe("nombre");
            expect(perfil.usuario.fechaNacimiento).toBe("2000-06-07");
            expect(perfil.usuario.nombreUsuario).toBe("usuarioA");
            expect(perfil.usuario.email).toBe("jesrolcad@alum.us.es");
        })
    })

})




