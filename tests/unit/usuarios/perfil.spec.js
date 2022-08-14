import Perfil from 'Perfil.vue'
import { shallowMount } from '@vue/test-utils'


describe('TESTS PERFIL', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS MÉTODO GETPERFIL', () => {

        it('RESPUESTA 200', () => {

            const mockResponse = {
                status: 200,
                data: {
                    nombre: "nombre",
                    fechaNacimiento: "2000-06-07",
                    nombreUsuario: "usuarioA",
                    email: "jesrolcad@alum.us.es"
                }
            }

            fetch.mockResponse(JSON.stringify(mockResponse));

            const wrapper = shallowMount(Perfil);
            wrapper.vm.getPerfil();
            let perfil = wrapper.vm.perfil;

            expect(perfil.nombre).toBe("nombre");
            expect(perfil.fechaNacimiento).toBe("2000-06-07");
            expect(perfil.nombreUsuario).toBe("usuarioA");
            expect(perfil.email).toBe("jesrolcad@alum.us.es");
        })
    })

})


