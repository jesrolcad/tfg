const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const mongoose =  require('mongoose');
const Usuario = require('../../models/Usuario');
const {casosNegativosLogin, casosPositivosRegistro, casosNegativosRegistro} = require('./casos');

describe('TESTS USUARIOS', () => {
    beforeAll(async () => {
        connectDB();
        await setupData();
    });
    
    afterAll(() => {
        disconnectDB();
        server.close();
    });

    describe("TESTS LOGIN", () => {

        describe("CASOS POSITIVOS", () => {

            it('SUCCESSFUL LOGIN', async () => {
                const response = await request.post('/usuarios/login').send({
                nombreUsuario: 'userTester',
                password: '12345678'
                })
                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('token');
            })

        })

        describe('CASOS NEGATIVOS', () => {

        
            for (const caso of casosNegativosLogin) {
                it(caso.key, async () => {
                    const response = await request.post('/usuarios/login').send({
                        nombreUsuario: caso.nombreUsuario,
                        password: caso.password
                    })
                    expect(response.status).toBe(400);
                })
            }
        })
    })

    describe('TESTS REGISTRO', () => {
        
        describe('CASOS POSITIVOS', () => {

            for(const caso of casosPositivosRegistro){

                it(caso.key, async () => {
                    const response = await request.post('/usuarios/registro').send({
                        nombre: caso.nombre,
                        nombreUsuario: caso.nombreUsuario,
                        email: caso.email,
                        password: caso.password
                    })

                    expect(response.status).toBe(200);

                    const usuario = await Usuario.findOne({nombreUsuario: caso.nombreUsuario});
                    expect(usuario).not.toBeNull();

                    expect(usuario.nombre).toBe(caso.nombre);
                    expect(usuario.nombreUsuario).toBe(caso.nombreUsuario);
                    expect(usuario.email).toBe(caso.email);
                    expect(usuario.password).not.toBe(caso.password);
                })
            }

            })

        describe('CASOS NEGATIVOS', () => {

            for(const caso of casosNegativosRegistro){
                    
                    it(caso.key, async () => {
                        const response = await request.post('/usuarios/registro').send({
                            nombre: caso.nombre,
                            nombreUsuario: caso.nombreUsuario,
                            email: caso.email,
                            password: caso.password
                        })
                        expect(response.status).toBe(400);
                    })
                }

        })
        
    
    })

    describe('TESTS DEL PERFIL', () => {

        describe('CASOS POSITIVOS', () => {

            it('PERFIL CON TOKEN', async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                let token = response_login.body.token;

                const response_perfil = await request.get('/usuarios/perfil').set('Authorization', token);

                expect(response_perfil.status).toBe(200);
                expect(response_perfil.body).toHaveProperty('usuario');

            })
        })

        describe('CASOS NEGATIVOS', () => {
                
                it('PERFIL SIN TOKEN', async () => {
                    const response_perfil = await request.get('/usuarios/perfil');
                    expect(response_perfil.status).toBe(401);
                })
            })


    })

    })



    //casos negativos:
        /* --------------------------------
        Formulario vacío
        Nombre vacío
        Nombre de usuario vacío
        Email vacío
        Contraseña vacía
        Nombre de usuario ya existente
        Email ya existente
        ---------------------------------
        */

    //     describe('CASOS NEGATIVOS', () => {
    //         const casos = [{key: 'FORMULARIO VACIO', nombre:'', nombreUsuario:'', email:'', password:''},
    //         {key: 'NOMBRE VACIO', nombre:'', nombreUsuario:'newUser', email:'prueba@gmaill.com', password:'12345678'},
    //         {key: 'NOMBRE DE USUARIO VACIO', nombre:'Usuario Test', nombreUsuario:'', email:'prueba@gmail.com'},
    //         {key: 'EMAIL VACIO', nombre:'Usuario Test', nombreUsuario:'newUser', email:'', password:'12345678'},
    //         {key: 'CONTRASEÑA VACIA', nombre:'Usuario Test', nombreUsuario:'newUser', email:'prueba@gmail.com'

    //     ]


    // })






    // //check that the user was created: THIS DOES NOT WORK -> USUARIO VARIABLE IS NULL 

                // const usuario = await Usuario.findOne({nombreUsuario: 'newUser'});
                // expect(usuario).not.toBeNull();

                // //get collection usuarios with mongoose collection name
                // const collections = await mongoose.connection.db.collections();

                // //get mongoose models
                // const models = mongoose.modelNames();
                // console.log(models);


                // //get 5 usuarios with mongoose
                // const usuarios = await mongoose.model('Usuario').find().limit(5);
                // const usuarios2 = await Usuario.find().limit(5);
                // console.log(usuarios);
                // console.log(usuarios2);

                

            // // get the collection of users
            //     const collection = collections.find(collection => collection.collectionName === 'usuarios');

            // // get the number of documents in the collection
            //     const count = await collection.countDocuments();
            //     console.log(count);

            // // get documents of collection
            //     const documents = await collection.find().toArray();
            //     console.log(documents);

    
