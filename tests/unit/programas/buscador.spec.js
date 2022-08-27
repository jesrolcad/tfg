import { shallowMount } from '@vue/test-utils';
import Buscador from 'Buscador.vue';
import flushPromises from 'flush-promises';

const mockProgramasBuscados = [{

    _id: 1,
    imagen: '',
    titulo: 'titulo 1'

}]
describe('TESTS DE BUSCADOR', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('MÉTODO BUSCARPROGRAMAS', () => {

        it('CASO GENERAL', async () => {

            let spyBuscarProgramas = jest.spyOn(Buscador.methods, 'buscarProgramas');
            fetch.mockResponse(JSON.stringify(mockProgramasBuscados))

            let wrapper = shallowMount(Buscador);

            wrapper.find('input').setValue('titulo 1');
            const button = wrapper.find('button');
            button.trigger('click');

            await flushPromises();

            expect(spyBuscarProgramas).toHaveBeenCalled();
            expect(wrapper.vm.buscados).toEqual(mockProgramasBuscados);
        })

    })
})