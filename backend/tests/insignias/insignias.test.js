const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Lista = require('../../models/Lista');
const Insignia = require('../../models/Insignia');
const { casosPositivosGetInsigniasUsuario, casosPositivosGetInsigniasListasPropias,
    casosPositivosGetInsigniasProgramasLP, casosPositivosGetInsigniasActores,
    casosPositivosGetInsigniasProgramasV, casosPositivosGetInsigniasGeneros} = require('./casos');

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

                expect(response.status).toBe(200);
                expect(response.body.length).toBe(caso.insigniasEsperadas);
        })
    })

    describe('TESTS AÑADIR INSIGNIA LISTAS PROPIAS', () => {
        for (const caso of casosPositivosGetInsigniasListasPropias)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                if(caso.listaPropia){
                    const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                        return caso.listaPropia
                    });
                }else{
                    const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                        return []
                    });
                }
                const response = await request.put('/insignias/listas').set('Authorization', token);

                if(!caso.listaPropia){
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias. Listas propias: 0');
                }
                else if (caso.listaPropia.listasPropias == 1) {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('List Beginner');
                }
                else if (caso.listaPropia.listasPropias == 3) {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('List Expert');
                }
                else if (caso.listaPropia.listasPropias == 5) {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('List Freak');
                }
                else if (caso.listaPropia.listasPropias == 0) {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias. Listas propias: '+ caso.listaPropia.listasPropias);
                }
                else if (caso.listaPropia.listasPropias == 9) {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de listas propias.');
                }
            })
    })

    describe('TESTS AÑADIR INSIGNIA PROGRAMAS LISTAS PROPIAS', () => {
        for (const caso of casosPositivosGetInsigniasProgramasLP)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return caso.result
                });

                const response = await request.put('/insignias/listas-programas').set('Authorization', token);

                if (caso.insignia == "Bronce") {
                    expect(response.status).toBe(200);
                    expect(response.body.Bronce).toBe(true);
                }
                else if (caso.insignia == "Plata, Oro") {
                    expect(response.status).toBe(200);
                    expect(response.body.Bronce).toBe(false);
                    expect(response.body.Silver).toBe(true);
                    expect(response.body.Gold).toBe(true);
                }
                else if (caso.insignia == "Todas") {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de programas en listas propias.');
                }
                else{
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias.');
                }
            })
    })

    describe('TESTS AÑADIR INSIGNIA ACTORES', () => {
        for (const caso of casosPositivosGetInsigniasActores)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return caso.result
                });

                const response = await request.put('/insignias/actores').set('Authorization', token);

                if (caso.insignia == "Fan") {
                    expect(response.status).toBe(200);
                    expect(response.body.Fan).toBe(true);
                }
                else if (caso.insignia == "Lover, Addict") {
                    expect(response.status).toBe(200);
                    expect(response.body.Fan).toBe(false);
                    expect(response.body.Lover).toBe(true);
                    expect(response.body.Addict).toBe(true);
                }
                else if (caso.insignia == "Todas") {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de actores.');
                }
                else{
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias.');
                }
            })
    })

    describe('TESTS AÑADIR INSIGNIA PROGRAMAS VISTOS', () => {
        for (const caso of casosPositivosGetInsigniasProgramasV)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return caso.result
                });
                const response = await request.put('/insignias/programas').set('Authorization', token);

                if (caso.insignia == "Bronce") {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('Bronce Watcher');
                }
                else if (caso.insignia == "Silver") {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('Silver Watcher');
                }
                else if (caso.insignia == "Otro") {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias. Programas vistos: '+ caso.result[0].programa);
                }
                else if (caso.insignia == "Gold") {
                    expect(response.status).toBe(200);
                    expect(response.body.insignia).toBe('Gold Watcher');
                }
                else if (caso.insignia == "Todas") {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de programas vistos.');
                }else{
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias. Programas vistos: 0');
                }
            })
    })

    describe('TESTS AÑADIR INSIGNIA GENEROS', () => {
        for (const caso of casosPositivosGetInsigniasGeneros)

            it(caso.key, async () => {
                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: caso.nombreUsuario,
                    password: '12345678'
                })
                const token = response_login.body.token;
                const mock= jest.spyOn(Lista, 'aggregate').mockImplementation(()=>{
                    return caso.result
                });

                const response = await request.put('/insignias/generos').set('Authorization', token);

                if (caso.insignia == "Amateur") {
                    expect(response.status).toBe(200);
                    expect(response.body.Amateur).toBe(true);
                }
                else if (caso.insignia == "Intermediate, Professional") {
                    expect(response.status).toBe(200);
                    expect(response.body.Amateur).toBe(false);
                    expect(response.body.Intermediate).toBe(true);
                    expect(response.body.Professional).toBe(true);
                }
                else if (caso.insignia == "Todas") {
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('Este usuario ya posee todas las insignias de generos.');
                }
                else{
                    expect(response.status).toBe(200);
                    expect(response.body.mensaje).toBe('No hay insignias.');
                }
            })
    })

    describe('TESTS ALL INSIGNIAS', () => {

        it('CASO ÚNICO', async () => {
            const response_login =  await request.post('/usuarios/login').send({
                nombreUsuario: 'userTester',
                password: '12345678'
            })
            const token = response_login.body.token;
            const mock= jest.spyOn(Insignia, 'find').mockImplementation(()=>{
                return [
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"},
            {"_id": {"$oid": "62dd35dedc39231374227bdb"},"nombre": "List Beginner","insignia": "https://i.imgur.com/o7qifAw.png"}
                ]
            });

            const response = await request.get('/insignias/all').set('Authorization', token);

            expect(response.status).toBe(200);
            expect(response.body.length).toBe(15);
        })

    })

})