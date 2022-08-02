const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Lista = require('../../models/Lista');
const listaService = require('../../api/services/listas');
const { casosPositivosGetGenerosLista, casosNegativosObtenerLista, casosPositivosCrearLista, casosNegativosCrearLista} = require('./casos');


describe('TESTS LISTAS', () => {

    beforeAll(async () => {
        await connectDB();
        await setupData();

    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });


    describe('TESTS OBTENER LISTAS DE UN USUARIO', () => {

        it('OBTENER LISTAS DE UN USUARIO', async () => {
            const response_login = await request.post('/usuarios/login').send({
                nombreUsuario: 'anotherUserTester',
                password: '12345678'
            })

            const token = response_login.body.token;

            const response = await request.get('/listas').set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
    })

    describe('TESTS DE CÁLCULO DE GÉNEROS DE UNA LISTA', () => {

        for (const caso of casosPositivosGetGenerosLista)

            it(caso.key, async () => {
                const lista = await Lista.findOne({ nombre: caso.nombreLista });
                const generos = await listaService.getGenerosLista(lista);

                if (caso.generosEsperados == 0) {
                    expect(generos[0]).toBe('Sin géneros');
                }
                else if (caso.generosEsperados == 1) {
                    expect(generos).not.toBeInstanceOf(Array);
                }
                else if (caso.generosEsperados >= 4) {
                    expect(generos[3]).toBe('...');
                    expect(generos).toBeInstanceOf(Array);
                }
                else {
                    expect(generos.length).toBe(caso.generosEsperados);
                    expect(generos).toBeInstanceOf(Array);
                }
            })
    })


    describe('TESTS OBTENER LISTA CONCRETA DE UN USUARIO', () => {

        describe('CASOS POSITIVOS', () => {
                
                it('OBTENER LISTA CONCRETA DE UN USUARIO', async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })
    
                    const token = response_login.body.token;

                    const lista = await Lista.findOne({nombre: "listaConUnPrograma"});
    
                    const response = await request.get('/lista/' + lista._id).set('Authorization', token);
                    expect(response.status).toBe(200);
                    expect(response.body.lista.nombre).toBe('listaConUnPrograma');
                });

        })

        describe('CASOS NEGATIVOS', () => {

            for(const caso of casosNegativosObtenerLista){

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'anotherUserTester',
                        password: '12345678'
                    })

                    const token = response_login.body.token;
                    let idLista = 0;
                
                    if(caso.listaOtroUser){
                        const lista = await Lista.findOne({nombre: "listaConUnPrograma"}); //Esta lista no pertenece al usuario que ha iniciado sesión
                        idLista = lista._id;
                    }
                    else if(caso.listaInexistente){
                        idLista = caso.idLista;
                    }
                    else if(caso.listaIdNoValido){
                        idLista = caso.idLista;
                    }
                    const response = await request.get('/lista/' + idLista).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                });
            }
        })
    })

    describe('TESTS CREAR LISTA', () => {

        describe('CASOS POSITIVOS', () => {

            for(const caso of casosPositivosCrearLista){

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })

                    const token = response_login.body.token;
                    const response = await request.post('/lista/crear').set('Authorization', token).send({
                        nombre: caso.nombreLista,
                    });
                    expect(response.status).toBe(200);
                    expect(response.body.lista.nombre).toBe(caso.nombreLista);

                    const lista = await Lista.findOne({nombre: caso.nombreLista});
                    expect(lista).not.toBeNull();
                });
            }
        })

        describe('CASOS NEGATIVOS', () => {

            for(const caso of casosNegativosCrearLista){

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })

                    const token = response_login.body.token;
                    const response = await request.post('/lista/crear').set('Authorization', token).send({
                        nombre: caso.nombreLista,
                    });
                    expect(response.status).toBe(400);
                });
            }




        })
    })
})