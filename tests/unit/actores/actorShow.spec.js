import { shallowMount } from '@vue/test-utils';
import ActorShow from 'ActorShow.vue';
import flushPromises from 'flush-promises';
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from "@/router"

const mockActor =
    {
        personajes: [
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "personaje": "Teja Kremke",
                "titulo": "El bailarín",
                "titulo_url": "https://www.themoviedb.org/movie/477887",
                "programas_actores": [
                    {
                        "_id": "62ab0378fca44224c2b23a30",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/zjHwBb1DFkz0OhAK6mbLDG8NFRa.jpg",
                        "fecha": "2018-08-31T00:00:00.000Z"
                    }
                ]
            },
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "personaje": "Bank Assistant",
                "titulo": "Gorrión rojo",
                "titulo_url": "https://www.themoviedb.org/movie/401981",
                "programas_actores": [
                    {
                        "_id": "62ab0378fca44224c2b23581",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/jwztj1bUvAJDmO7mArASmkbPPKd.jpg",
                        "fecha": "2018-02-28T00:00:00.000Z"
                    }
                ]
            },
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "titulo": "Dark",
                "titulo_url": "https://www.themoviedb.org/tv/70523",
                "personaje": "Jonas Kahnwald",
                "num_episodios": 26,
                "programas_actores": [
                    {
                        "_id": "62ab039dfca44224c2b251af",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/5LoHuHWA4H8jElFlZDvsmU2n63b.jpg",
                        "fecha": "2017-12-01T00:00:00.000Z"
                    }
                ]
            },
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "personaje": "Jonathan",
                "titulo": "Lommbock",
                "titulo_url": "https://www.themoviedb.org/movie/409520",
                "programas_actores": [
                    {
                        "_id": "62ab0378fca44224c2b235da",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/HQGFr3PKsiQNCUifwecc3NrksO.jpg",
                        "fecha": "2017-03-23T00:00:00.000Z"
                    }
                ]
            },
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "personaje": "Hans Quangel",
                "titulo": "Cartas de Berlín",
                "titulo_url": "https://www.themoviedb.org/movie/334522",
                "programas_actores": [
                    {
                        "_id": "62ab0378fca44224c2b231dc",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/qBmLJfqDOVuPu46z3QyfaiPXfxq.jpg",
                        "fecha": "2016-02-15T00:00:00.000Z"
                    }
                ]
            },
            {
                "nombre": "Louis Hofmann",
                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                "personaje": "Sebastian Schumann",
                "titulo": "Land of Mine (Bajo la arena)",
                "titulo_url": "https://www.themoviedb.org/movie/335578",
                "programas_actores": [
                    {
                        "_id": "62ab0378fca44224c2b231eb",
                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/bEEpw6oASGhWd8omUsG02dQLuHn.jpg",
                        "fecha": "2015-12-03T00:00:00.000Z"
                    }
                ]
            }
        ],

        movie: true,
        serie: true
    }

const mockActorDefinitivo = {
    personajes: [
        {
            "nombre": "Louis Hofmann",
            "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
            "personaje": "Teja Kremke",
            "titulo": "El bailarín",
            "titulo_url": "https://www.themoviedb.org/movie/477887",
            "programas_actores": [
                {
                    "_id": "62ab0378fca44224c2b23a30",
                    "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/zjHwBb1DFkz0OhAK6mbLDG8NFRa.jpg",
                    "fecha": "2018-08-31T00:00:00.000Z"
                }
            ]
        }],

        movie: false,
        serie: false
}


describe('TESTS DE ACTORSHOW', () => {

    beforeEach(() => {
        fetch.resetMocks();
        jest.restoreAllMocks();
    })

    describe('TESTS MÉTODO GETPERSONAJE', () => {

        const router = createRouter({
            history: createWebHistory(),
            routes: routes,
        })
        
        const mockRoute = {
            params: {
                id: 1
            }
        }
        
        const mockRouter = {
            push: jest.fn()
        }

        it('CASO GENERAL', async () => {

            fetch.mockResponses([JSON.stringify(mockActor)], [JSON.stringify(mockActorDefinitivo)]);

            const spyGetPersonaje = jest.spyOn(ActorShow.methods, 'getPersonaje');

            
            const wrapper = shallowMount(ActorShow, {

                global: {
                    plugins: [router],

                    mocks: {
                        $route: mockRoute,
                        $router: mockRouter
                    },
                },

                data() {
                    return {
                        personajes: [
                            {
                                "nombre": "Louis Hofmann",
                                "imagen_actor": "https://www.themoviedb.org/t/p/w300_and_h450_bestv2/m3Mo38afbKmy9EOsfmUagvTFM9q.jpg",
                                "personaje": "Teja Kremke",
                                "titulo": "El bailarín",
                                "titulo_url": "https://www.themoviedb.org/movie/477887",
                                "programas_actores": [
                                    {
                                        "_id": "62ab0378fca44224c2b23a30",
                                        "imagen": "https://www.themoviedb.org/t/p/w220_and_h330_face/zjHwBb1DFkz0OhAK6mbLDG8NFRa.jpg",
                                        "fecha": "2018-08-31T00:00:00.000Z"
                                    }
                                ]
                            }]
                    }
                }
                
            });

            await flushPromises();
            wrapper.vm.getPersonaje();
            await flushPromises();
            
            expect(wrapper.vm.personajes.length).toBe(1);
            expect(wrapper.vm.movie).toBe(false);
            expect(wrapper.vm.serie).toBe(false);
            expect(spyGetPersonaje).toHaveBeenCalledTimes(2);
        })


    })
})