const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const Actor = require('../../models/Actor');
const { connectDB, disconnectDB, setupDataActor } = require('../mock_database_configuration');
const {casosPositivosActoresId,casosNegativosActoresId,casosPositivosActoresNombre,casosNegativosActoresNombre} = require('./casos');

describe('TESTS ACTORES', () => {

    beforeAll(async () => {
        await connectDB();
        await setupDataActor();

        let response_login = await request.post('/usuarios/login').send({
            nombreUsuario: 'userTester',
            password: '12345678'
        })

        token = response_login.body.token;

    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    describe('OBTENER ACTORES DE UN PROGRAMA POR SUS IDs', () => {

        describe('CASOS POSITIVOS', () => {
            for(const caso of casosPositivosActoresId){
                    it(caso.key, async () => {
                        const response = await request.post('/actores/programa').set('Authorization', token)
                            .send(caso.listaActoresIds);

                        expect(response.status).toBe(200);
                        expect(response.body).not.toBeNull();
                        expect(response.body.length).toBe(caso.listaActoresIds.length);
                    })
            }
        })

        describe('CASOS NEGATIVOS', () => {
            for(const caso of casosNegativosActoresId){
                it(caso.key, async () => {
                    const response = await request.post('/actores/programa').set('Authorization', token)
                        .send(caso.listaActoresIds);
                if(caso.id=="idErroneo"){
                    expect(response.status).toBe(400);
                    expect(response.body.msg).toBe("El id de actor no es válido");
                }
                else if(caso.id=="idsVacio"){
                    expect(response.status).toBe(400);
                    expect(response.body.msg).toBe("No se han enviado ids de actores");
                }
                else{
                    expect(response.status).toBe(400);
                    expect(response.body.msg).toBe("El body no es válido, debe ser un Array");
                }
                });
            }
        })
    })

    describe('OBTENER ACTORES DE UN PROGRAMA POR SUS NOMBRES', () => {

        describe('CASOS POSITIVOS', () => {
            for(const caso of casosPositivosActoresNombre){
                it(caso.key, async () => {
                    const response = await request.get('/actores/'+ caso.nombre).set('Authorization', token);
                    if(caso.id=="Serie"){
                        expect(response.status).toBe(200);
                        expect(response.body.personajes).not.toBeNull();
                        expect(response.body.movie).toBe(false);
                        expect(response.body.serie).toBe(true);
                    }else if(caso.id=="Peli"){
                        expect(response.status).toBe(200);
                        expect(response.body.personajes).not.toBeNull();
                        expect(response.body.movie).toBe(true);
                        expect(response.body.serie).toBe(false);
                    }else if(caso.id=="Todo"){
                        expect(response.status).toBe(200);
                        expect(response.body.personajes).not.toBeNull();
                        expect(response.body.movie).toBe(true);
                        expect(response.body.serie).toBe(true);
                    }else{
                        expect(response.status).toBe(400);
                        expect(response.body.mensaje).toBe("No se encontraron personajes del actor.");
                    }
                })
            }
        })

    })

});
