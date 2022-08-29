const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Lista = require('../../models/Lista');
const Usuario = require('../../models/Usuario');
const Programa = require('../../models/Programa');
const listaService = require('../../api/services/listas');
const { casosPositivosGetGenerosLista, casosNegativosObtenerLista, casosPositivosCrearLista,
    casosNegativosCrearLista, casosNegativosEliminarLista, casosNegativosAgregarProgramaLista,
    casosPositivosEliminarProgramaLista, casosNegativosEliminarProgramaLista } = require('./casos');


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
            expect(response.body.length).toBe(3);
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

                const lista = await Lista.findOne({ nombre: "listaConUnPrograma" });

                const response = await request.get('/lista/' + lista._id).set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body.lista.nombre).toBe('listaConUnPrograma');
            });

        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosObtenerLista) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'anotherUserTester',
                        password: '12345678'
                    })

                    const token = response_login.body.token;
                    let idLista = 0;

                    if (caso.listaOtroUser) {
                        const lista = await Lista.findOne({ nombre: "listaConUnPrograma" }); //Esta lista no pertenece al usuario que ha iniciado sesión
                        idLista = lista._id;
                    }
                    else if (caso.listaInexistente) {
                        idLista = caso.idLista;
                    }
                    else if (caso.listaIdNoValido) {
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

            for (const caso of casosPositivosCrearLista) {

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

                    const lista = await Lista.findOne({ nombre: caso.nombreLista });
                    expect(lista).not.toBeNull();
                });
            }
        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosCrearLista) {

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

    describe('TESTS ELIMINAR LISTA', () => {

        describe('CASOS POSITIVOS', () => {

            it('USUARIO BORRA LISTA PERSONALIZADA', async () => {

                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'userTester',
                    password: '12345678'
                })

                const token = response_login.body.token;

                const lista = await Lista.findOne({ nombre: "listaVacía" });

                const response = await request.delete('/lista/' + lista._id).set('Authorization', token);
                expect(response.status).toBe(200);
                const listaBorrada = await Lista.findOne({ nombre: "listaVacía" });
                expect(listaBorrada).toBeNull();

            })
        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosEliminarLista) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'anotherUserTester',
                        password: '12345678'
                    })

                    const token = response_login.body.token;
                    let idLista = 0;

                    if (caso.idLista) {
                        idLista = caso.idLista;

                    } else if (caso.nombreLista == "Programas vistos") {
                        const usuarioId = await Usuario.findOne({ nombreUsuario: 'anotherUserTester' })._id;
                        idLista = await Lista.findOne({ nombre: "Programas vistos", usuario: usuarioId })._id;
                    }

                    else {
                        const lista = await Lista.findOne({ nombre: caso.nombreLista }); //Esta lista no pertenece al usuario que ha iniciado sesión
                        idLista = lista._id;
                    }

                    const response = await request.delete('/lista/' + idLista).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                });
            }
        })
    })

    describe('TESTS AÑADIR PROGRAMA A LISTA', () => {

        describe('CASOS POSITIVOS', () => {

            it('USUARIO AÑADE PROGRAMA A LISTA', async () => {

                const response_login = await request.post('/usuarios/login').send({
                    nombreUsuario: 'usuarioLista',
                    password: '12345678'
                })

                const token = response_login.body.token;
                const lista = await Lista.findOne({ nombre: "lista1Usuario3" });
                const programa = await Programa.findOne();

                const response = await request.put('/lista/' + lista._id + '/agregar/' + programa._id).set('Authorization', token);
                expect(response.body.status).toBe(204);

                const listaActualizada = await Lista.findOne({ nombre: "lista1Usuario3" });
                expect(listaActualizada.programas.length).toBe(1);
            }
            )

        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosAgregarProgramaLista) {

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'usuarioLista',
                        password: '12345678'
                    })

                    const token = response_login.body.token;

                    let idPrograma = 0
                    let idLista = 0

                    if (caso.otroUser) {

                        const programa = await Programa.findOne();
                        idPrograma = programa._id;
                        const lista = await Lista.findOne({ nombre: 'Programas vistos' });
                        idLista = lista._id;

                    }

                    if (caso.programaDuplicado) {

                        const programa = await Programa.findOne({ titulo: 'La maldición (Cursed)' });
                        idPrograma = programa._id;
                        const lista = await Lista.findOne({ nombre: 'lista2Usuario3' });
                        idLista = lista._id;

                    }
                    else if (caso.idLista) {
                        idLista = caso.idLista;
                        const programa = await Programa.findOne({ titulo: 'La maldición (Cursed)' });
                        idPrograma = programa._id;

                    } else if (caso.idPrograma) {
                        const lista = await Lista.findOne({ nombre: 'lista2Usuario3' });
                        idLista = lista._id;
                        idPrograma = caso.idPrograma;
                    }

                    const response = await request.put('/lista/' + idLista + '/agregar/' + idPrograma).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                })
            }
        })

    })

    describe('TESTS ELIMINAR PROGRAMA DE LISTA', () => {

        describe('CASOS POSITIVOS', () => {

            for (const caso of casosPositivosEliminarProgramaLista) {
                it(caso.key, async () => {

                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'usuarioLista',
                        password: '12345678'
                    })

                    const usuario = await Usuario.findOne({ nombreUsuario: 'usuarioLista' });

                    const token = response_login.body.token;
                    const lista = await Lista.findOne({ nombre: caso.nombreLista, usuario: usuario._id });
                    let tam = lista.programas.length;

                    const response = await request.put('/lista/' + lista._id + '/borrar/' + lista.programas[0]).set('Authorization', token);
                    expect(response.body.status).toBe(204);

                    const listaActualizada = await Lista.findOne({ nombre: caso.nombreLista, usuario: usuario._id });
                    if (caso.log) {
                        console.log("IMPRIMIENDO RESULTADOS");
                        console.log(lista);
                        console.log(listaActualizada);
                    }
                    expect(listaActualizada.programas.length).toBe(tam - 1);


                })
            }
        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosEliminarProgramaLista) {

                console.log(caso.key);

                it(caso.key, async () => {
                    const response_login = await request.post('/usuarios/login').send({
                        nombreUsuario: 'usuarioLista',
                        password: '12345678'
                    })

                    const token = response_login.body.token;

                    let idPrograma = 0
                    let idLista = 0

                    if (caso.otroUser) {

                        const programa = await Programa.findOne();
                        idPrograma = programa._id;
                        const lista = await Lista.findOne({ nombre: 'Programas vistos' });
                        idLista = lista._id;

                    }
                    else if (caso.idLista) {
                        idLista = caso.idLista;
                        const programa = await Programa.findOne({ titulo: 'La maldición (Cursed)' });
                        idPrograma = programa._id;

                    } else if (caso.idPrograma) {
                        const lista = await Lista.findOne({ nombre: 'lista2Usuario3' });
                        idLista = lista._id;
                        idPrograma = caso.idPrograma;

                    } else if (caso.programaNoEnLista) {
                        const lista = await Lista.findOne({ nombre: 'lista2Usuario3' });
                        idLista = lista._id;
                        const programa = await Programa.findOne({});
                        idPrograma = programa._id;

                    }

                    const response = await request.put('/lista/' + idLista + '/borrar/' + idPrograma).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                    console.log(response.body.msg);
                })
            }

        })
    })

})
