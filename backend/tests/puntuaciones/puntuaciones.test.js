const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const { casosPositivosObtenerPuntuacionPrograma, casosNegativosObtenerPuntuacionPrograma, casosPositivosPuntuarPrograma, casosNegativosPuntuarPrograma } = require('./casos');

describe('TESTS PUNTUACIONES', () => {

    beforeAll(async () => {
        await connectDB();
        await setupData();

    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    describe('TESTS OBTENER PUNTUACIÓN DADA POR UN USUARIO', () => {

        describe('CASOS POSITIVOS', () => {


            for(const caso of casosPositivosObtenerPuntuacionPrograma){
                
                it(caso.nombre, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'anotherUserTester',
                        password: '12345678'
                    })
        
                    const token = response_login.body.token;
        
                    let programas = await Programa.find();
                    const response = await request.get('/puntuaciones/' + programas[caso.posicionPrograma]._id).set('Authorization', token);
                    expect(response.status).toBe(200);
                    expect(response.body.puntuacion).toBe(caso.puntuacionEsperada);
                });
            }
        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosObtenerPuntuacionPrograma) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'anotherUserTester',
                        password: '12345678'
                    })
                    
                    let token = response_login.body.token;
                    const response = await  request.get('/puntuaciones/' + caso.idPrograma).set('Authorization', token);
                    expect(response.status).toBe(400);
                    expect(response.body).toHaveProperty('message');
                })
            }
        })

        describe('TESTS OBTENER PUNTUACIÓN MEDIA DE UN PROGRAMA', () => {

            describe('CASOS POSITIVOS', () => {

                for(const caso of casosPositivosObtenerPuntuacionPrograma){
                        
                        it(caso.nombre, async () => {
                            const response_login = await request.post('/usuarios/login').send({
                                nombreUsuario: 'anotherUserTester',
                                password: '12345678'
                            })
                
                            const token = response_login.body.token;
                
                            let programas = await Programa.find();
                            const response = await request.get('/puntuaciones/media/' + programas[caso.posicionPrograma]._id).set('Authorization', token);
                            expect(response.status).toBe(200);
                            expect(response.body.puntuacionMedia.media).toBe(caso.puntuacionEsperada);
                            expect(response.body.puntuacionMedia.numPuntuaciones).toBe(caso.numPuntuacionesEsperadas);
                        });
                }
            })

            describe('CASOS NEGATIVOS', () => {

                for (const caso of casosNegativosObtenerPuntuacionPrograma) {

                    it(caso.key, async () => {
                        const response_login = await request.post('/usuarios/login').send({
                            nombreUsuario: 'anotherUserTester',
                            password: '12345678'
                        })
            
                        const token = response_login.body.token;
                        const response = await request.get('/puntuaciones/media/' + caso.idPrograma).set('Authorization', token);
                        expect(response.status).toBe(400);
                        expect(response.body).toHaveProperty('message');
                    })
                }
            })
        })


        describe('TESTS PUNTUAR PROGRAMA', () => {

            describe('CASOS POSITIVOS', () => {

                for (const caso of casosPositivosPuntuarPrograma) {

                    it(caso.key, async () => {
                        const response_login = await request.post('/usuarios/login').send({
                            nombreUsuario: 'userTester',
                            password: '12345678'
                        })

                        let token = response_login.body.token;

                        let usuario = await Usuario.findOne({ nombreUsuario: 'userTester' });
                        let lista = await Lista.findOne({ usuario: usuario._id });
                        let idPrograma = lista.programas[0];


                        const response = await request.post('/puntuaciones/' + idPrograma).set('Authorization', token).send({ puntuacion: caso.puntuacion });
                        expect(response.status).toBe(201);
                    })
                }
            })

            describe('CASOS NEGATIVOS', () => {

                for (const caso of casosNegativosPuntuarPrograma) {

                    it(caso.key, async () => {
                        const response_login = await request.post('/usuarios/login').send({
                            nombreUsuario: 'userTester',
                            password: '12345678'
                        })

                        let token = response_login.body.token;

                        let usuario = await Usuario.findOne({ nombreUsuario: 'userTester' });
                        let lista = await Lista.findOne({ usuario: usuario._id });

                        let idPrograma = caso.idPrograma;

                        if (caso.idPrograma === 'getFromDB') {

                            let lista = await Lista.findOne({ usuario: usuario._id });
                            let programaNoVisto = await Programa.findOne({ _id: { $nin: lista.programas } });
                            idPrograma = programaNoVisto._id;
                        }

                        const response_puntuar = await request.post('/puntuaciones/' + idPrograma).set('Authorization', token).send({ puntuacion: caso.puntuacion });
                        expect(response_puntuar.status).toBe(400);

                    })
                }
            })
        })
    })

})
