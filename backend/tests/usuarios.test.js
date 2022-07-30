const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);
const { connectDB, disconnectDB } = require('./mock_database_configuration');


describe('API test', () => {
    beforeAll(() => {
        connectDB();
    });

    afterAll(() => {
        disconnectDB();
        server.close();
    });

    describe('TESTS DE LOGIN ', () => {

        it('Test de login correcto', async () => {
            const response = await request.post('/usuarios/login').send({
                nombreUsuario: '',
                password: ''

            })
            console.log('RESPUESTA: ');
            console.log(response.body);
            expect(response.status).toBe(400);
        })
    })
})
