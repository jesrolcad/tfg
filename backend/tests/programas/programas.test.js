const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const programaService = require('../../api/services/programas');

describe('TESTS PROGRAMAS', () => {

    let token;

    beforeAll(async () => {
        await connectDB();
        await setupData();

        let response_login = await request.post('/usuarios/login').send({
            nombreUsuario: 'anotherUserTester',
            password: '12345678'
        })

        token = response_login.body.token;

        

    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    describe('TESTS OBTENER TODOS LOS PROGRAMAS', () => {
        

        it('CASO ÚNICO: OBTENER TODOS LOS PROGRAMAS', async () => {
        
            const response = await request.get('/programas/all').set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body).not.toBeNull();
            expect(response.body.length).toBe(3);
        })
    })

    describe('TESTS OBTENER UN PROGRAMA POR NOMBRE', () => {

        describe('CASOS POSITIVOS', () => {

            it('BODY CON TITULO', async () => {

                const response = await request.post('/programas/nombre').set('Authorization', token).send({
                    titulo: 'Prueba'
                });
                expect(response.status).toBe(200);
                expect(response.body).not.toBeNull();
                expect(response.body[0].titulo).toBe('Prueba Lista');
            })


        })

    })

})