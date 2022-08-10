import { mount } from '@vue/test-utils'
import Login from 'Login.vue'
import flushPromises from 'flush-promises'


describe('Login.vue', () => {

    const mockResponse = {
        status: 400,
        ok: false,
        err: {
            message: 'Usuario incorrecto'
        }
    }

    global.fetch = jest.fn(() => Promise.resolve({
        json: () => Promise.resolve(mockResponse)
    }));

    it('should render correct contents', async () => {

        const wrapper = mount(Login);

        wrapper.vm.login();

        await flushPromises();
        
        expect(wrapper.vm.usuarioIncorrecto).toBe(true);
        expect(wrapper.vm.mensaje).toBe('Usuario y/o contraseña incorrectos');

    })

})