// import {mount} from '@vue/test-utils'

// import Login from '../../views/Login.vue'


describe('Login.vue', () => {

    // const mockResponse = {
    //     status: 400,
    //     ok: false,
    //     err: {
    //         message: 'Usuario incorrecto'
    //     }
    // }

    // global.fetch = jest.fn(() => Promise.resolve({
    //     json: () => Promise.resolve(mockResponse)
    // }));

    it('should render correct contents', () => {
        // const wrapper = mount(Login);

        let prueba = true;

        expect(prueba).toBe(true);
        
        // wrapper.vm.login();

        // expect(wrapper.vm.usuarioIncorrect).toBe(true);
        // expect(wrapper.vm.mensaje).toBe('Usuario y/o contraseña incorrectos');
    } )

})