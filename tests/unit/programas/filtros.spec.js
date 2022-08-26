import { shallowMount } from '@vue/test-utils';
import Filtros from 'Filtros.vue';
import flushPromises from 'flush-promises';

const mockGenerosInicial = ['Terror', 'Fantasía'];

const mockGenerosDefinitivo = ['Ciencia ficción', 'Thriller', 'Comedia'];

const programasFiltrados = ['programa1', 'programa2', 'programa3'];

describe('TESTS DE FILTROS', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS MÉTODO GETGENEROS', () => {

        it('CASO GENERAL', async () => {

            let spyGetGeneros = jest.spyOn(Filtros.methods, 'getGeneros');

            fetch.mockResponses([
                JSON.stringify(mockGenerosInicial),
            ], [
                JSON.stringify(mockGenerosDefinitivo)
            ])

            let wrapper = shallowMount(Filtros);

            await flushPromises();

            expect(spyGetGeneros).toHaveBeenCalledTimes(1);
            expect(wrapper.vm.allgeneros.length).toBe(2);
            wrapper.vm.getGeneros();
            await flushPromises();
            expect(wrapper.vm.allgeneros.length).toBe(3);

        });

    describe('TESTS MÉTODO FILTRARPROGRAMAS', () => {
            
            it('CASO GENERAL', async () => {
    
                fetch.mockResponses([
                    JSON.stringify(mockGenerosInicial),
                ], [
                    JSON.stringify(mockGenerosDefinitivo)
                ])
    
                let wrapper = shallowMount(Filtros);
    
                await flushPromises();
    
                await wrapper.vm.filtrarProgramas();
                expect(wrapper.vm.filtrados.length).toBe(3);
                expect(wrapper.emitted().escucharFiltros).toBeTruthy();
    
            });
    
    })


    })

})
