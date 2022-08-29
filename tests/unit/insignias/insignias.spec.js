import { shallowMount } from '@vue/test-utils';
import Insignias from 'Insignias.vue';
import flushPromises from 'flush-promises';

describe('TESTS INSIGNIAS', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS MÉTODO GETPROGRAMASVISTOS', () => {
        it('SE OBTIENE INSIGNIA', async () => {

            fetch.mockResponse(JSON.stringify({ insignia: "aaa" }));


            const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
            const wrapper = shallowMount(Insignias);
            wrapper.vm.getProgramasVistos();
            await flushPromises();
            expect(spyShowNotification).toHaveBeenCalled();
            expect(spyShowNotification).toHaveBeenCalledWith('Ha obtenido la insignia: aaa');
        })


        it('NO SE OBTIENE INSIGNIA', async () => {

            fetch.mockResponse(JSON.stringify([]));

            const toast = jest.fn()
            const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');

            const wrapper = shallowMount(Insignias);
            wrapper.vm.getProgramasVistos();

            await flushPromises();
            expect(spyShowNotification).not.toHaveBeenCalled();
            
        })
    })

    describe('TESTS MÉTODO GETGENEROSPROGRAMASVISTOS', () => {

        it('SE OBTIENEN INSIGNIAS AMATEUR, INTERMEDIATE Y PROFESSIONAL', async () => {

            fetch.mockResponse(JSON.stringify({ Amateur: true, Intermediate: true, Professional: true }));

            const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
            const wrapper = shallowMount(Insignias);
            wrapper.vm.getGenerosProgramasVistos();

            await flushPromises();
            expect(spyShowNotification).toHaveBeenCalledTimes(3);
            expect(spyShowNotification.mock.calls).toEqual([['Ha obtenido la insignia: Amateur Genre Watcher'],
            ['Ha obtenido la insignia: Intermediate Genre Watcher'], ['Ha obtenido la insignia: Professional Genre Watcher']]);
        })


        it('NO SE OBTIENEN INSIGNIAS', async () => {
                
                fetch.mockResponse(JSON.stringify({}));
    
                const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
                const wrapper = shallowMount(Insignias);
                wrapper.vm.getGenerosProgramasVistos();

                await flushPromises();
    
                expect(spyShowNotification).not.toHaveBeenCalled();
        })
    })

    describe('TESTS MÉTODO GETACTORESPROGRAMASVISTOS', () => {
        it('SE OBTIENEN INSIGNIAS ACTOR/ACTRESS FAN, LOVER Y ADDICT', async () => {
                
                fetch.mockResponse(JSON.stringify({ Fan: true, Lover: true, Addict: true }));
    
                const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
                const wrapper = shallowMount(Insignias);
                wrapper.vm.getActoresProgramasVistos();

                await flushPromises();
    
                expect(spyShowNotification).toHaveBeenCalledTimes(3);
                expect(spyShowNotification.mock.calls).toEqual([['Ha obtenido la insignia: Actor/Actress Fan'],
                ['Ha obtenido la insignia: Actor/Actress Lover'], ['Ha obtenido la insignia: Actor/Actress Addict']]);
        })

        it('NO SE OBTIENEN INSIGNIAS', async () => {

                fetch.mockResponse(JSON.stringify({}));

                const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
                const wrapper = shallowMount(Insignias);
                wrapper.vm.getActoresProgramasVistos();

                await flushPromises();

                expect(spyShowNotification).not.toHaveBeenCalled();
        })
    })

    describe('TESTS MÉTODO GETLISTASPROPIAS', () => {
        it('SE OBTIENE INSIGNIA', async () => {
                
                    fetch.mockResponse(JSON.stringify({ insignia: "aaa" }));
    
                    const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
                    const wrapper = shallowMount(Insignias);
                    wrapper.vm.getListasPropias();

                    await flushPromises();
    
                    expect(spyShowNotification).toHaveBeenCalled();
                    expect(spyShowNotification).toHaveBeenCalledWith('Ha obtenido la insignia: aaa');
        })

        it('NO SE OBTIENE INSIGNIA', async () => {

                fetch.mockResponse(JSON.stringify([]));

                const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');

                const wrapper = shallowMount(Insignias);
                wrapper.vm.getListasPropias();

                await flushPromises();

                expect(spyShowNotification).not.toHaveBeenCalled();
        })
    })

    describe('TESTS MÉTODO GETPROGRAMASLISTASPROPIAS', () => {

        it('SE OBTIENEN INSIGNIAS BRONCE, SILVER Y GOLD LIST', async () => {

            fetch.mockResponse(JSON.stringify({ Bronce: true, Silver: true, Gold: true }));

            const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
            const wrapper = shallowMount(Insignias);
            wrapper.vm.getProgramasListasPropias();

            await flushPromises();

            expect(spyShowNotification).toHaveBeenCalledTimes(3);
            expect(spyShowNotification.mock.calls).toEqual([['Ha obtenido la insignia: Bronce List'],
            ['Ha obtenido la insignia: Silver List'], ['Ha obtenido la insignia: Gold List']]);
        })

        it('NO SE OBTIENEN INSIGNIAS', async () => {

            fetch.mockResponse(JSON.stringify({}));

            const spyShowNotification = jest.spyOn(Insignias.methods, 'showNotification');
            const wrapper = shallowMount(Insignias);
            wrapper.vm.getProgramasListasPropias();

            await flushPromises();

            expect(spyShowNotification).not.toHaveBeenCalled();
        })
    })
})