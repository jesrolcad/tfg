const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Programa = require('../../models/Programa');
const { casosPositivosObtenerProgramaNombre, casosNegativosObtenerProgramaId } = require('./casos');


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

            for (const caso of casosPositivosObtenerProgramaNombre) {

                it(caso.key, async () => {

                    const response = await request.post('/programas/nombre/').set('Authorization', token).send({
                        titulo: caso.titulo
                    });
                    expect(response.status).toBe(200);
                    expect(response.body).not.toBeNull();

                    if(caso.envioTitulo) {
                    expect(response.body[0].titulo).toBe(caso.tituloEsperado);
                    } else {
                        expect(response.body.mensaje).not.toBeNull();
                    }
                })
            }
        })
    })

    describe('TESTS OBTENER PROGRAMA POR ID', () => {

        describe('CASOS POSITIVOS', () => {

            it('OBTENER PROGRAMA CON ID CORRECTO', async () => {

                let programa = await Programa.findOne();
                const response = await request.get('/programas/' + programa._id).set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body).not.toBeNull();
            })
        })

        describe('CASOS NEGATIVOS', () => {

            for(const caso of casosNegativosObtenerProgramaId){

                it(caso.key, async () => {

                    const response = await request.get('/programas/' + caso.idPrograma).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                    expect(response.body.key).toBe(caso.keyEsperada);
                }
                )
            }

        })
    })

})