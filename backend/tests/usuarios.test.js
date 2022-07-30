const supertest = require('supertest');
const { app, server } = require('../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupUsuarios } = require('./mock_database_configuration');
const mongoose =  require('mongoose');

describe('LOGIN TESTS', () => {
    beforeAll(async () => {
        connectDB();
        await setupUsuarios();
    });
    
    afterAll(() => {
        disconnectDB();
        server.close();
    });

    describe("POSITIVE CASES", () => {

        it('SUCCESSFUL LOGIN', async () => {
            const response = await request.post('/usuarios/login').send({
            nombreUsuario: 'userTester',
            password: '12345678'
            })
            console.log(response.body);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('token');
        })
    });

    describe('NEGATIVE CASES', () => {

        const casos = [{key: 'EMPTY USERNAME AND PASSWORD', nombreUsuario:'', password:''},
        {key: 'EMPTY PASSWORD', nombreUsuario: 'userTest', password: ''},
        {key: 'EMPTY USERNAME', nombreUsuario: '', password: '12345678'},
        {key: 'WRONG PASSWORD', nombreUsuario: 'userTest', password: '123456789'},
        {key: 'WRONG USERNAME', nombreUsuario: 'usuarioIncorrecto', password: '12345678'}];

        //for case of cases
        for (const caso of casos) {
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

    





    // TEST REGISTRO
    // describe('REGISTRO', () => {
    //     test('Registro de usuario', async () => {
    //         const response = await request.post('/usuarios/registro')
    //             .send({
    //                 nombre: "Usuario Test",
    //                 nombreUsuario: 'usuario',
    //                 email: "usuario1@gmail.com",
    //                 password: '12345678',
    //             })

    //         get collections of db
    //         const collections = await mongoose.connection.db.collections();
    //         get the collection of users
    //         const collection = collections.find(collection => collection.collectionName === 'usuarios');
    //         get the number of documents in the collection
    //         const count = await collection.countDocuments();
    //         console.log(count);

    //         get documents of collection
    //         const documents = await collection.find().toArray();
    //         console.log(documents);

    //         expect(response.status).toBe(200);

    //     })
    // })

    

// })


    
