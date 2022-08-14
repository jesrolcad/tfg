import {shallowMount} from '@vue/test-utils';
import ProgramaShow from 'ProgramaShow.vue';


describe('TESTS DE PUNTUACIONES', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS OBTENER PUNTUACION DADA POR EL USUARIO', () =>{

        const mockResponse = {
            status: 200,
            puntuacion: 3
        }

        it('CASO GENERAL', () => {
            const wrapper = shallowMount(ProgramaShow, {
                propsData: {
                    generos: [],
                    id: 1

                }
            });
            console.log(wrapper);
            // wrapper.vm.getPuntuacionPrograma();
            // expect(wrapper.vm.puntuacion).toEqual(mockResponse.puntuacion);


        })
    })
})
