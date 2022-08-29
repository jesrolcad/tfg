const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupDataActor } = require('../mock_database_configuration');
const {casosSugerencias, casosRecomendaciones} = require('./casos');

describe('TESTS RECOMENDACIONES', () => {

    beforeAll(async () => {
        await connectDB();
        await setupDataActor();
    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    describe('OBTENER SUGERENCIAS DE UN PROGRAMA', () => {
            for(const caso of casosSugerencias){
                it(caso.key, async () => {
                    let response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: caso.usuario,
                        password: '12345678'
                    })
                    token = response_login.body.token;

                    const response = await request.post('/recomendaciones/sugerencias').set('Authorization', token)
                        .send({idPrograma:caso.programa, generos:caso.generos});

                    if(caso.id=="user1"){
                        expect(response.status).toBe(200);
                        expect(response.body).not.toBeNull();
                        expect(response.body).not.toBe([]);
                    }else if(caso.id=="user3"){
                        expect(response.status).toBe(200);
                        expect(response.body).not.toBeNull();
                        expect(response.body).not.toBe([]);
                    }else if(caso.id=="sin genero"){
                        expect(response.status).toBe(200);
                        expect(response.body.mensaje).toBe("El programa no tiene generos registrados y no es posible realizar sugerencias");
                    }else if(caso.id=="sin votar"){
                        expect(response.status).toBe(200);
                        expect(response.body.mensaje).toBe("El programa no ha sido votado y no es posible realizar sugerencias");
                    }
                })
            }
    })

    describe('OBTENER RECOMENDACIONES DE UN USUARIO', () => {
        for(const caso of casosRecomendaciones){
            it(caso.key, async () => {
                let response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.usuario,
                    password: '12345678'
                })
                token = response_login.body.token;

                const response = await request.post('/recomendaciones/usuario').set('Authorization', token);

                if(caso.id=="user1"){
                    expect(response.status).toBe(200);
                    expect(response.body).not.toBeNull();
                    expect(response.body).not.toBe([]);
                    expect(response.body.mensaje).toBe(undefined);
                }else if(caso.id=="user2"){
                    expect(response.status).toBe(200);
                    expect(response.body).not.toBeNull();
                    expect(response.body).not.toBe([]);
                    expect(response.body.mensaje).toBe(undefined);
                }else{
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe("No se han podido realizar sugerencias, puntue más programas para tener su recomendación.");
                }
            })
        }
    })
});