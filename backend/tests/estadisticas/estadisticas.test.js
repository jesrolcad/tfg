const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupDataActor } = require('../mock_database_configuration');
const Actor = require('../../models/Actor');
const Programa = require('../../models/Programa');
const Puntuacion = require('../../models/Puntuacion');
const Usuario= require('../../models/Usuario');
const Lista= require('../../models/Lista');
const { casosPositivosGetProgramas} = require('./casos');


    describe('TESTS ESTADISTICAS', () => {

        beforeAll(async () => {
            await connectDB();
            await setupDataActor();

        });

        afterAll(async () => {
            disconnectDB();
            server.close();
        });

        describe('TESTS PIE ACTORES', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/estadisticas/pie-actores').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.Actores).toBe(8);
                expect(response.body.Personajes).toBe(9);
            });
            it('CASO NEGATIVO ACTORES 0', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Actor, 'distinct').mockImplementation(()=>{
                    return 0;
                });

                const mock2= jest.spyOn(Actor, 'countDocuments').mockImplementation(()=>{
                    return 0;
                });

                const response = await request.get('/estadisticas/pie-actores').set('Authorization', token);
            
                expect(response.status).toBe(200);
                expect(response.body.Actores).toBeUndefined();
                expect(response.body.Personajes).toBe(0);
            });
            it('CASO NEGATIVO USER NO ADMIN', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'anotherUserTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Actor, 'distinct').mockImplementation(()=>{
                    return 0;
                });

                const response = await request.get('/estadisticas/pie-actores').set('Authorization', token);

                expect(response.status).toBe(401);
                expect(response.body).toEqual({});
            });
        })

        describe('TESTS GET PROGRAMAS K', () => {
            for (const caso of casosPositivosGetProgramas){
                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'userTester',
                        password: '12345678'
                    })
                    const token = response_login.body.token;

                    const mock= jest.spyOn(Programa, 'countDocuments').mockImplementation(()=>{
                        return caso.programas;
                    })

                    const response = await request.get('/estadisticas/programas').set('Authorization', token);

                    expect(response.status).toBe(200);
                    expect(response.body.Programas).toBe(caso.expected);
                })
            }
        })

        describe('TESTS PROGRAMAS PUNTUADOS', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/estadisticas/puntuaciones').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.puntuados).toBe(4);
                expect(response.body.puntuaciones).toBe(6);
            });
            it('CASO NEGATIVO PUNTUACIONES 0', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Puntuacion, 'distinct').mockImplementation(()=>{
                    return 0;
                });

                const mock2= jest.spyOn(Puntuacion, 'countDocuments').mockImplementation(()=>{
                    return 0;
                });

                const response = await request.get('/estadisticas/puntuaciones').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.puntuados).toBeUndefined();
                expect(response.body.puntuaciones).toBe(0);
            });
        })

        describe('TESTS USUARIOS POR MES', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/estadisticas/usuarios-mes').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.meses.length).toBe(3);
                expect(response.body.count[0]).toBe(2);
                expect(response.body.count[1]).toBe(2);
                expect(response.body.count[2]).toBe(1);
                expect(response.body.total).toBe(5);
            });
        })

        describe('TESTS GENEROS PROGRAMAS', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/estadisticas/generos').set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body.generos.length).toBe(5);
                expect(response.body.count.length).toBe(5);
            });
        })

        describe('TESTS USUARIOS INSIGNIAS', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })
                const token = response_login.body.token;
                const response = await request.get('/estadisticas/insignias').set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body.insignias.length).toBe(7);
                expect(response.body.count.length).toBe(7);
            });
            it('CASO NEGATIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Usuario, 'aggregate').mockImplementation(()=>{
                    return [];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/insignias').set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body.insignias.length).toBe(0);
                expect(response.body.count.length).toBe(0);
            });
        })

        describe('TESTS LISTAS USUARIOS', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [{"_id":2,"nUsuarios":6},{"_id":4,"nUsuarios":2},{"_id":3,"nUsuarios":7}];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/listas').set('Authorization', token);
                
                expect(response.status).toBe(200);
                expect(response.body.listasUsuarios.length).toBe(3);
                expect(response.body.media).toBeGreaterThan(2);
                expect(response.body.listas).toBe(41);
            });
            it('CASO NEGATIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/listas').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.mensaje).toBe('No existen usuarios con listas personalizadas.');
            });
        })

        describe('TESTS PROGRAMAS LISTAS PERSONALIZADAS', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [{"_id":6,"numListas":1},{"_id":3,"numListas":1},{"_id":1,"numListas":5},{"_id":0,"numListas":33},{"_id":2,"numListas":1}];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/listas-programas').set('Authorization', token);
                
                expect(response.status).toBe(200);
                expect(response.body.listasProgramas.length).toBe(5);
                expect(response.body.media).toBeLessThan(1);
                expect(response.body.listas).toBe(41);
            });
            it('CASO NEGATIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/listas-programas').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.mensaje).toBe('No existen usuarios con listas personalizadas.');
                jest.clearAllMocks();
            });
        })

        describe('TESTS TIPO PROGRAMAS EDAD', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [{'programas':'Película','edad':22},{'programas':'Película','edad':22},{'programas':'Película','edad':20},
                    {'programas':'Serie','edad':22},{'programas':'Serie','edad':22},{'programas':'Serie','edad':20}];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/edad-programa').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.peliculas).toBe(3);
                expect(response.body.series).toBe(3);
            });
            it('CASO NEGATIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/edad-programa').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body.mensaje).toBe('No hay estadisticas de la edad y los tipos de programa.');
                jest.clearAllMocks();
            });
        })

        describe('TESTS GENEROS PROGRAMAS EDAD', () => {
            it('CASO POSITIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [{'_id':"Comedia",'edadMedia':22.8},{'_id':"Romance",'edadMedia':24},{'_id':"Acción",'edadMedia':21}];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/edad-genero').set('Authorization', token);

                expect(response.status).toBe(200);
                expect(response.body[0]['_id']).not.toBeNull();
                expect(response.body[0]['edadMedia']).toBeGreaterThan(20);
            });
            it('CASO NEGATIVO', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return [];
                })

                const token = response_login.body.token;
                const response = await request.get('/estadisticas/edad-genero').set('Authorization', token);
                
                expect(response.status).toBe(200);
                expect(response.body.mensaje).toBe('No hay estadisticas de la edad y los géneros.');
            });
        })
    });