const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, dropCollections, setupData } = require('../mock_database_configuration');
const mongoose =  require('mongoose');
const Usuario = require('../../models/Usuario');
const Lista = require('../../models/Lista');
const Programa = require('../../models/Programa');
const {casosNegativosPuntuacionPrograma, casosPositivosPuntuarPrograma, casosNegativosPuntuarPrograma} = require('./casos');

describe('TESTS PUNTUACIONES', () => {

    beforeAll(async () => {
        await connectDB();
        await setupData();
        
    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    // describe('TESTS OBTENER PUNTUACIÓN DADA POR UN USUARIO', () => {

    //     describe('CASOS POSITIVOS', () => {

    //         it('USUARIO HA DADO PUNTUACIÓN AL PROGRAMA', async () => {
    //             const response = await request.get('/puntuaciones/usuario/5f1b9e1b9d6e0c2e2c6c8c6b');
    //             expect(response.status).toBe(200);
    //             expect(response.body.puntuacion).not.toBe(0);
    //         })

    //         it('USUARIO NO HA DADO PUNTUACIÓN AL PROGRAMA', async () => {

    //             const response = await request.get('/puntuaciones/usuario/5f1b9e1b9d6e0c2e2c6c8c6c');
    //             expect(response.status).toBe(200);
    //             expect(response.body.puntuacion).toBe(0);
    //         })
    //     })

    //     describe('CASOS NEGATIVOS', () => {

    //         for(const caso of casosNegativosPuntuacionPrograma) {

    //         it(caso.key, async () => {
    //             const response = await request.get('/puntuaciones/' + caso.idPrograma);
    //             expect(response.status).toBe(400);
    //             expect(response.body).toHaveProperty('message');
    //         })
    //     }
    // })

    // describe('TESTS OBTENER PUNTUACIÓN MEDIA DE UN PROGRAMA', () => {

    //     describe('CASOS POSITIVOS', () => {

    //         it('PUNTUACION MEDIA DISTINTA DE 0', async () => {
    //             const response = await request.get('/puntuaciones/5f1b9e1b9d6e0c2e2c6c8c6b');
    //             expect(response.status).toBe(200);
    //             expect(response.body).toHaveProperty('puntuacionMedia');
    //         })
    //     })

    //     describe('CASOS NEGATIVOS', () => {

    //         for(const caso of casosNegativosPuntuacionPrograma) {

    //             it(caso.key, async () => {
    //                 const response = await request.get('/puntuaciones/media/' + caso.idPrograma);
    //                 expect(response.status).toBe(400);
    //                 expect(response.body).toHaveProperty('message');
    //             })
    //         }
    //     })
    // })


    describe('TESTS PUNTUAR PROGRAMA', () => {

        describe('CASOS POSITIVOS', () => {

            for(const caso of casosPositivosPuntuarPrograma) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })

                    let token = response_login.body.token;
                    
                    let usuario = await Usuario.findOne({nombreUsuario: 'userTester'});
                    let lista = await Lista.findOne({usuario: usuario._id});
                    let idPrograma = lista.programas[0];


                    const response = await request.post('/puntuaciones/' + idPrograma).set('Authorization', token).send({puntuacion: caso.puntuacion});
                    expect(response.status).toBe(201);
                })
            }

            

        })

        describe('CASOS NEGATIVOS', () => {

            for(const caso of casosNegativosPuntuarPrograma) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })

                    let token = response_login.body.token;
                    
                    let usuario = await Usuario.findOne({nombreUsuario: 'userTester'});
                    let lista = await Lista.findOne({usuario: usuario._id});

                    let idPrograma = caso.idPrograma;
                    
                    if(caso.idPrograma === 'getFromDB') {

                        let lista = await Lista.findOne({usuario: usuario._id});
                        let programaNoVisto = await Programa.findOne({_id: {$nin: lista.programas}});
                        idPrograma = programaNoVisto._id;
                    } 
                    
                    const response_puntuar = await request.post('/puntuaciones/' + idPrograma).set('Authorization', token).send({puntuacion: caso.puntuacion});

                })

            }
        })

    })

})