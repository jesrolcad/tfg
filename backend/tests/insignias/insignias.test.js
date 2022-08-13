const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Lista = require('../../models/Lista');
const Usuario = require('../../models/Usuario');
const Programa = require('../../models/Programa');
const insigniasService = require('../../api/services/insignias');
const { casosPositivosGetInsigniasUsuario, casosPositivosGetInsigniasListasPropias } = require('./casos');

describe('TESTS INSIGNIAS', () => {

    beforeAll(async () => {
        await connectDB();
        await setupData();

    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });


    describe('TESTS OBTENER INSIGNIAS DE UN USUARIO', () => {
        for (const caso of casosPositivosGetInsigniasUsuario)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/insignias/usuario').set('Authorization', token);

                if (caso.insigniasEsperadas == 0) {
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(0);
                }
                else if (caso.insigniasEsperadas == 1) {
                    expect(response.status).toBe(200);
                    expect(response.body.length).toBe(1);
                }
        })
    })

    describe('TESTS AÑADIR INSIGNIA LISTAS PROPIAS', () => {

        describe('CASOS POSITIVOS', () => {

            for (const caso of casosPositivosGetInsigniasListasPropias)

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: caso.nombreUsuario,
                        password: '12345678'
                    })
                    const token = response_login.body.token;
                    const response = await request.put('/insignias/listas').set('Authorization', token);

                    if (caso.listaPropia == 1) {
                        expect(response.status).toBe(200);
                        expect(response.body.insignia).toBe('List Beginner');
                    }
                    else if (caso.listaPropia == 3) {
                        expect(response.status).toBe(200);
                        expect(response.body.insignia).toBe('List Expert');
                    }
                    else if (caso.listaPropia == 5) {
                        expect(response.status).toBe(200);
                        expect(response.body.insignia).toBe('List Freak');
                    }
                    else if (caso.listaPropia == 0) {
                        expect(response.status).toBe(200);
                        expect(response.body.mensaje).toBe('No hay insignias. Listas propias: 1');
                    }
                    else if (caso.listaPropia == 9) {
                        expect(response.status).toBe(200);
                        expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de listas propias.');
                    }
                    else if (caso.listaPropia == -1) {
                        expect(response.status).toBe(200);
                        expect(response.body.mensaje).toBe('No hay insignias. Listas propias: 0');
                    }
                })
        })
    })
})