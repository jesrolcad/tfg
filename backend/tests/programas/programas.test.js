const supertest = require('supertest');
const { app, server } = require('../../index');
const request = supertest(app);
const { connectDB, disconnectDB, setupData } = require('../mock_database_configuration');
const Programa = require('../../models/Programa');
const { casosPositivosObtenerProgramaNombre, casosNegativosObtenerProgramaId, casosPositivosProgramasFiltrados} = require('./casos');


describe('TESTS PROGRAMAS', () => {

    let token;

    beforeAll(async () => {
        await connectDB();
        await setupData();

        let response_login = await request.post('/usuarios/login').send({
            nombreUsuario: 'anotherUserTester',
            password: '12345678'
        })

        token = response_login.body.token;
    });

    afterAll(async () => {
        disconnectDB();
        server.close();
    });

    describe('TESTS OBTENER TODOS LOS PROGRAMAS', () => {

        it('CASO ÚNICO: OBTENER TODOS LOS PROGRAMAS', async () => {

            const response = await request.get('/programas/all').set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body).not.toBeNull();
            expect(response.body.length).toBe(3);
        })
    })

    describe('TESTS OBTENER UN PROGRAMA POR NOMBRE', () => {

        describe('CASOS POSITIVOS', () => {

            for (const caso of casosPositivosObtenerProgramaNombre) {

                it(caso.key, async () => {

                    const response = await request.post('/programas/nombre/').set('Authorization', token).send({
                        titulo: caso.titulo
                    });
                    expect(response.status).toBe(200);
                    expect(response.body).not.toBeNull();

                    if (caso.envioTitulo) {
                        expect(response.body[0].titulo).toBe(caso.tituloEsperado);
                    } else {
                        expect(response.body.mensaje).not.toBeNull();
                    }
                })
            }
        })
    })

    describe('TESTS OBTENER PROGRAMA POR ID', () => {

        describe('CASOS POSITIVOS', () => {

            it('OBTENER PROGRAMA CON ID CORRECTO', async () => {

                let programa = await Programa.findOne();
                const response = await request.get('/programas/' + programa._id).set('Authorization', token);
                expect(response.status).toBe(200);
                expect(response.body).not.toBeNull();
            })
        })

        describe('CASOS NEGATIVOS', () => {

            for (const caso of casosNegativosObtenerProgramaId) {

                it(caso.key, async () => {

                    const response = await request.get('/programas/' + caso.idPrograma).set('Authorization', token);
                    expect(response.status).toBe(caso.statusEsperado);
                    expect(response.body.key).toBe(caso.keyEsperada);
                }
                )
            }
        })
    })

    describe('TESTS BUSCAR PROGRAMA POR GÉNERO', () => {

        describe('CASOS POSITIVOS', () => {

            it('BUSCAR PROGRAMA CON GÉNERO REGISTRADO EN BD', async () => {

                const response = await request.post('/programas/busquedagenero').set('Authorization', token).send({
                    genero: 'Ciencia ficción'
                });

                console.log(response.body);
                expect(response.status).toBe(200);
                expect(response.body).not.toHaveProperty('mensaje');
                expect(response.body.result.length).toBe(2);

            }
            )

        })

        describe('CASOS NEGATIVOS', () => {

            it('BUSCAR PROGRAMA CON GÉNERO NO REGISTRADO EN BD', async () => {

                const response = await request.post('/programas/busquedagenero').set('Authorization', token).send({
                    genero: 'EstoNoEsUnGenero'
                });

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('mensaje');
                expect(response.body).not.toHaveProperty('result');
            })
        })
    })


    describe('TESTS BUSCAR PROGRAMA POR PLATAFORMA', () => {

        describe('CASOS POSITIVOS', () => {

            it('BUSCAR PROGRAMA CON PLATAFORMA REGISTRADA EN BD', async () => {

                const response = await request.post('/programas/busquedaplataforma').set('Authorization', token).send({
                    plataforma: 'Netflix'
                });

                expect(response.status).toBe(200);
                expect(response.body).not.toHaveProperty('mensaje');
                expect(response.body.result.length).toBe(2);

            }
            )

        })

        describe('CASOS NEGATIVOS', () => {

            it('BUSCAR PROGRAMA CON PLATAFORMA NO REGISTRADA EN BD', async () => {

                const response = await request.post('/programas/busquedaplataforma').set('Authorization', token).send({
                    plataforma: 'EstoNoEsUnaPlataforma'
                });

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('mensaje');
                expect(response.body).not.toHaveProperty('result');
            })
        })
    })


    describe('TESTS BUSCAR PROGRAMA POR TIPO', () => {

        describe('CASOS POSITIVOS', () => {

            it('BUSCAR PROGRAMA CON TIPO REGISTRADO EN BD', async () => {

                const response = await request.post('/programas/busquedatipo').set('Authorization', token).send({
                    tipo: 'Serie'
                });

                expect(response.status).toBe(200);
                expect(response.body).not.toHaveProperty('mensaje');
                expect(response.body.result.length).toBe(2);

            }
            )

        })

        describe('CASOS NEGATIVOS', () => {

            it('BUSCAR PROGRAMA CON TIPO NO REGISTRADO EN BD', async () => {

                const response = await request.post('/programas/busquedatipo').set('Authorization', token).send({
                    tipo: 'EstoNoEsUnTipo'
                });

                expect(response.status).toBe(200);
                expect(response.body).toHaveProperty('mensaje');
                expect(response.body).not.toHaveProperty('result');
            }
            )
        })
    })

    describe('OBTENER GENEROS DE LA BASE DE DATOS', () => {

        it('CASO GENERAL: GÉNEROS DISPONIBLES', async () => {

            const response = await request.get('/programas/generos').set('Authorization', token);
            expect(response.status).toBe(200);
            expect(response.body).not.toBeNull();
            expect(response.body[0].generos.length).toBe(4);
        
        })
    })

    describe('OBTENER PROGRAMAS FILTRADOS POR TIPO, GÉNERO Y PLATAFORMA', () => {

        describe('CASOS POSITIVOS', () => {

            for(const caso of casosPositivosProgramasFiltrados){
                    
                    it(caso.key, async () => {
    
                        const response = await request.post('/programas/filtrados').set('Authorization', token).send({
                            tipo: caso.tipo,
                            generos: caso.genero,
                            plataformas: caso.plataforma
                        });
    
                        expect(response.status).toBe(200);
                        expect(response.body).not.toBeNull();
                        expect(response.body.length).toBe(caso.numProgramasEncontrados);
                    }
                    )
            }
        })

        describe('CASOS NEGATIVOS', () => {

            it('NO SE HAN ENCONTRADO PROGRAMAS', async () => {
                    
                    const response = await request.post('/programas/filtrados').set('Authorization', token).send({
                        tipo: 'EstoNoEsUnTipo',
                        generos: 'EstoNoEsUnGenero',
                        plataformas: 'EstoNoEsUnaPlataforma'
                    });
    
                    expect(response.status).toBe(200);
                    expect(response.body).toHaveProperty('mensaje');
            })
        })

    })
})